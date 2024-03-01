const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  // Note: To be added later
  // images: {
  //   url: String,
  //   filename: String,
  // },
  candidateIdNumber: {
    type: String,
    required: true,
    unique: true,
  },
  party: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  yearLevel: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    default: 2,
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

module.exports = mongoose.model("Candidate", CandidateSchema);
