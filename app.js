const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");

const { Party, Course, Title } = require("./models/additionals");
const Candidate = require("./models/candidates");

// Import routes for campgrounds and reviews
const userRoutes = require("./routes/users");
const voterRoutes = require("./routes/voters");
const partyRoutes = require("./routes/parties");
const courseRoutes = require("./routes/courses");
const candidateRoutes = require("./routes/candidates");

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

// =====================================
// Set up middleware for handling routes
app.use("/users", userRoutes);
app.use("/voters", voterRoutes);
app.use("/parties", partyRoutes);
app.use("/courses", courseRoutes);
app.use("/candidates", candidateRoutes);

/// Main Page:
// --------------------
app.get("/", (req, res) => {
  res.render("home");
});

/// VOTE FORM:
// --------------------
app.get("/vote-candidate", (req, res) => {
  res.render("votes/vote");
});

/// COURSES ROUTES:
// --------------------

/// VOTE STANDING:
const {
  candidatePositions,
} = require("./public/javascripts/tangentSelections");
// --------------------
// render Index Form
app.get("/standing", async (req, res) => {
  const candidates = await Candidate.find();
  res.render("voteStanding", { candidatePositions, candidates });
});

// Filter by party or position
app.get("/standing/position/:position", async (req, res) => {
  if (req.params.position === "0") {
    const candidates = await Candidate.find();
    res.json(candidates);
  } else {
    const filterByPosition = await Candidate.find({
      position: req.params.position,
    });
    res.json(filterByPosition);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

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
