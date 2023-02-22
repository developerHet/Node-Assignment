const User = require("../models/User");
const Resource = require('../models/Resource');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.createResource = asyncHandler(async (req, res, next) => {
   req.body.user = req.user.id;
   req.body.ownerRole=req.user.role;
   const resource = await Resource.create(req.body);
   res.status(201).json({ success: true, data: resource });
});

exports.getResources = asyncHandler(async (req, res, next) => {
    const resources = await Resource.find();
    res.status(201).json({
      success: true,
      data: resources,
    });
 });

 exports.getResource = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    const resource = await Resource.findById(id);
    if (!resource) {
        return next(new ErrorResponse(`Resource not found with id of ${id}`, 401));
    }
  
  
    res.status(201).json({
      success: true,
      data: resource,
    });
});

exports.updateResource = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    var resource = await Resource.findById(id);
    if (!resource) {
      return next(new ErrorResponse(`Resource not found with id of ${id}`, 401));
    }

    if (resource.user.toString() === req.user.id || req.user.role === 'admin' || (req.user.role==='manager' && resource.ownerRole==='employee')) {
        resource = await Resource.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
      
        res.status(201).json({
          success: true,
          data: resource,
        });
      }

    return next(
        new ErrorResponse(
          `User is not authorized to update this bootcamp`,
          401
        )
      );
});


exports.deleteResource = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    var resource = await Resource.findById(id);
    if (!resource) {
      return next(new ErrorResponse(`Resource not found with id of ${id}`, 401));
    }

    if (resource.user.toString() === req.user.id || req.user.role === 'admin' || (req.user.role==='manager' && resource.ownerRole==='employee')) {
        resource = await Resource.findByIdAndDelete(id);
        res.status(201).json({
          success: true,
          data: {},
        });
      }

    return next(
        new ErrorResponse(
          `User is not authorized to delete this bootcamp`,
          401
        )
      );
});