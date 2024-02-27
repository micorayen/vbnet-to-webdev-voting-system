const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartySchema = new Schema({
  party: {
    type: String,
    required: true,
    unique: true,
  },
});
const CourseSchema = new Schema({
  course: {
    type: String,
    required: true,
    unique: true,
  },
});
const TitleSchema = new Schema({
  mainTitle: {
    type: String,
    required: true,
  },
  // subTitle: {
  //   type: String,
  //   required: true,
  // },
});

// CREATE TABLE IF NOT EXISTS `parties` (
//     `ID` int(11) NOT NULL AUTO_INCREMENT,
//     `Party` varchar(100) NOT NULL,
//     PRIMARY KEY (`ID`)
//   ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

// CREATE TABLE IF NOT EXISTS `courses` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `courses` varchar(100) NOT NULL,
//     PRIMARY KEY (`id`)
//   ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

// CREATE TABLE IF NOT EXISTS `titles` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `main_title` varchar(100) NOT NULL,
//     `mini_title` varchar(100) NOT NULL,
//     PRIMARY KEY (`id`)
//   ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

module.exports.Party = mongoose.model("Party", PartySchema);
module.exports.Course = mongoose.model("Course", CourseSchema);
module.exports.Title = mongoose.model("Title", TitleSchema);
