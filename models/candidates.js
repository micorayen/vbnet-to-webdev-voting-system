const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const CandidateSchema = new Schema({
  // studentIdNumber as username
  // pasword
  voteCount: {
    type: Number,
    required: true,
    default: 0,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
});

// CREATE TABLE IF NOT EXISTS `candidates` (
//     `ID` int(11) NOT NULL AUTO_INCREMENT,
//     `Student_No` varchar(100) NOT NULL,
//     `Vote_Count` int(11) NOT NULL,
//     `Full_Name` varchar(100) NOT NULL,
//     `Position` varchar(100) NOT NULL,
//     `Party` varchar(100) NOT NULL,
//     PRIMARY KEY (`ID`)
//   ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

CandidateSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Candidate", CandidateSchema);
