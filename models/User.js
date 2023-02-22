const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true,'Please add username'],
        match: [/^[A-Za-z][A-Za-z0-9_]{4,29}$/,'Please add a valid username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 8,
        select: false,
      },
      role: {
        type: String,
        enum: ["employee", "manager","admin"],
        default: "user",
      },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({id: this._id},process.env.JWT_SECRET);
}

module.exports = mongoose.model("User",UserSchema);