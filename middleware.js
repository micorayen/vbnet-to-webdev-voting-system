const {
  accountSchema,
  voterSchema,
  partySchema,
  courseSchema,
  candidateSchema,
} = require("./schemas");
const ExpressError = require("./utils/ExpressError");

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

module.exports.validateCandidate = (req, res, next) => {
  const { error } = candidateSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// LOGIN
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
