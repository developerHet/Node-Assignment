const express = require('express');
const { createUser, getUsers,getUser, updateUser, deleteUser, signInUser } = require('../controller/user');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/',protect,authorize('admin'),createUser);
router.get('/',protect,authorize('admin'),getUsers);
router.put('/:id',protect,authorize('admin'),updateUser);
router.get('/:id',protect,authorize('admin'),getUser);
router.delete('/:id',protect,authorize('admin'),deleteUser);
router.post('/signin',signInUser);

module.exports = router;