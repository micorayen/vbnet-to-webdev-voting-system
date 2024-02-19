const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  role: {
    type: String,
    enum: ["Administrator", "Facilitator"],
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
});

// CREATE TABLE IF NOT EXISTS `user` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `role` varchar(50) NOT NULL,
//   `fullname` varchar(100) NOT NULL,
//   `uname` varchar(100) NOT NULL,
//   `password` varchar(100) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
