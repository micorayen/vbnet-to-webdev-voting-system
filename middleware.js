const {
  accountSchema,
  voterSchema,
  partySchema,
  courseSchema,
  candidateSchema,
  titleSchema,
} = require("./schemas");

const Voter = require("./models/voters");
const ExpressError = require("./utils/ExpressError");

const Candidate = require("./models/candidates");
const { trimData } = require("./services/allService");

// VALIDATION MIDDLEWARE
module.exports.validateAccount = (req, res, next) => {
  const { error } = accountSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateVoter = (req, res, next) => {
  const { error } = voterSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateParty = (req, res, next) => {
  const { error } = partySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateCourse = (req, res, next) => {
  const { error } = courseSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateTitle = (req, res, next) => {
  const { error } = titleSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateCandidate = (req, res, next) => {
  const { error } = candidateSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// LOGIN AND USER MIDDLEWARE
module.exports.isLoggedIn = (req, res, next) => {
  // console.log("user is:", req.user.fullName);

  if (!req.isAuthenticated()) {
    // console.log(req.path, req.originalUrl); // we want the original
    req.session.returnTo = req.originalUrl;
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};

module.exports.isVoterLoggedIn = (req, res, next) => {
  if (req.user.constructor.modelName !== "Voter") {
    req.flash(
      "error",
      "Access denied: Please log in with the correct account type."
    );
    return res.redirect("/");
  }
  next();
};

module.exports.checkVoteStatus = (req, res, next) => {
  if (req.user.voteStatus === "Voted") {
    req.flash("error", "You Already Voted!");
    return res.redirect("/login");
  }

  next();
};

module.exports.isAccountLoggedIn = (req, res, next) => {
  if (req.user.constructor.modelName !== "Account") {
    req.flash(
      "error",
      "Access denied: Please log in with the correct account type."
    );
    return res.redirect("/votes");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

// VOTER's MIDDLEWARE
module.exports.checkDuplicateForNewVoter = async (req, res, next) => {
  const { username, fullName } = req.body.voter;
  // console.log(username, fullName);
  const existingUsername = await Voter.findOne({ username });
  if (existingUsername) {
    req.flash("error", "Username already exists");
    // return res.redirect("/signup");
  }

  const existingFullName = await Voter.findOne({ fullName });
  if (existingFullName) {
    req.flash("error", "Full name already exists");
    // return res.redirect("/signup");
  }

  next();
};

module.exports.checkDuplicateForUpdateVoter = async (req, res, next) => {
  const { username, fullName } = req.body.voter;
  const { id } = req.params;

  const existingUsername = await Voter.findOne({ username, _id: { $ne: id } });
  if (existingUsername) {
    req.flash("error", "Username already exists");
    // return res.redirect("/signup");
  }

  const existingFullName = await Voter.findOne({ fullName, _id: { $ne: id } });
  if (existingFullName) {
    req.flash("error", "Full name already exists");
    // return res.redirect("/signup");
  }

  next();
};

// =======================================
