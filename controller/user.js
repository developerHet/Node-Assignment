const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({
    success: true,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse("Invalid user ID", 401));
  }


  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  var user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse("Invalid user ID", 401));
  }

  user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  var user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse("Invalid user ID", 401));
  }

  await User.findByIdAndDelete(id);

  res.status(201).json({
    success: true,
    data: {},
  });
});

exports.signInUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(newErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = user.getSignedJwtToken();
  res.status(200).json({success: true, token});
});
