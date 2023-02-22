const express = require('express');
const { createResource, getResources, getResource, updateResource, deleteResource } = require('../controller/resource');
const { protect } = require('../middleware/auth');

const  router = express.Router();

router.post('/',protect,createResource);
router.get('/',protect,getResources);
router.get('/:id',protect,getResource);
router.put('/:id',protect,updateResource);
router.delete('/:id',protect,deleteResource);


module.exports = router;