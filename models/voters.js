const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const VoterSchema = new Schema({
  // studentIdNumber as username
  // pasword
  voteStatus: {
    type: String,
    enum: ["Voted", "Not Voted"],
    default: "Not Voted",
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
});

// CREATE TABLE IF NOT EXISTS `voters` (
//     `ID` int(11) NOT NULL AUTO_INCREMENT,
//     `Student_No` varchar(50) NOT NULL,
//     `Status` varchar(50) NOT NULL,
//     `First_Name` varchar(100) NOT NULL,
//     `Last_Name` varchar(100) NOT NULL,
//     `Full_Name` varchar(100) NOT NULL,
//     `Course` varchar(50) NOT NULL,
//     `Year_Level` varchar(50) NOT NULL,
//     `Password` varchar(100) NOT NULL,
//     PRIMARY KEY (`ID`)
//   ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12

VoterSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Voter", VoterSchema);
