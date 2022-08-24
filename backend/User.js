const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLenght: 100,
    unique: true,
  },
});
module.exports = mongoose.model("User", UserSchema);
