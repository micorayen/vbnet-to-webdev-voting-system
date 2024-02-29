const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// // Section Common Security Issues:
// const mongoSanitize = require("express-mongo-sanitize");

const Account = require("./models/accounts");
const Voter = require("./models/voters");

const { Party, Course, Title } = require("./models/additionals");
const Candidate = require("./models/candidates");

// Import routes for campgrounds and reviews
const userRoutes = require("./routes/users");
const accountRoutes = require("./routes/accounts");
const voterRoutes = require("./routes/voters");
const partyRoutes = require("./routes/parties");
const courseRoutes = require("./routes/courses");
const candidateRoutes = require("./routes/candidates");
const voteStandingRoutes = require("./routes/vote-standings");

// MongoDB Connection:
mongoose.connect("mongodb://127.0.0.1:27017/voting-app", {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected.");
});

// View Engine Setup: Configuration
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware Setup:
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

const sessionConfig = {
  secret: "imbatman",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

// Passport:
app.use(passport.initialize());
app.use(passport.session());

// // Mongo Sanitize:
// app.use(mongoSanitize());

// Passport Configuration
passport.use("account-local", new LocalStrategy(Account.authenticate()));
passport.use("voter-local", new LocalStrategy(Voter.authenticate()));

// Serialization
passport.serializeUser(function (user, done) {
  done(null, { id: user._id, type: user.constructor.modelName });
});

passport.deserializeUser(function (obj, done) {
  const Model = obj.type === "Account" ? Account : Voter;
  Model.findById(obj.id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

// Debugging and Error Handling
passport.serializeUser(function (user, done) {
  console.log("Serializing user:", user);
  done(null, { id: user._id, type: user.constructor.modelName });
});
passport.deserializeUser(function (obj, done) {
  console.log("Deserializing object:", obj);

  const Model = obj.type === "Account" ? Account : Voter;

  console.log("Querying database for user with ID:", obj.id);
  Model.findById(obj.id)
    .then((user) => {
      console.log("Deserialized user:", user);
      done(null, user);
    })
    .catch((err) => {
      console.error("Error deserializing user:", err);
      done(err, null);
    });
});

// Locals - have access for all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.currentURL = req;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Set up middleware for handling routes
app.use("/", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/voters", voterRoutes);
app.use("/parties", partyRoutes);
app.use("/courses", courseRoutes);
app.use("/candidates", candidateRoutes);
app.use("/vote-standings", voteStandingRoutes);

const {
  isLoggedIn,
  isAccountLoggedIn,
  isVoterLoggedIn,
} = require("./middleware");

// Route accessible only to users logged in as "account"
app.get("/", isLoggedIn, isAccountLoggedIn, (req, res) => {
  const loggedInAccount = req.user;
  res.render("main/main", { loggedInAccount });
});

// Route accessible only to users logged in as "voter"
app.get("/votes", isLoggedIn, isVoterLoggedIn, (req, res) => {
  const loggedInVoter = req.user;
  res.render("votes/vote", { loggedInVoter });
});

/// COURSES ROUTES:
// --------------------

// Error Handling
// --------------------
// Page Not Found Route
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Generic Error Handling Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Listening 3000!!");
});
