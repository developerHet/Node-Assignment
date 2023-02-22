const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
    },
    description: {
      type: String,
      maxlength: 25,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    ownerRole: {
      type: String,
      required: true,
      enum: ["employee", "manager","admin"],
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Resource", ResourceSchema);
