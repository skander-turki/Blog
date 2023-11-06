const express= require('express');
const router = express.Router();
const {GetTrendingPosts , getPostById} = require('../controllers/MediaController');

router.get('/gettrending', GetTrendingPosts );
router.get('/getPostById/:id', getPostById)

module.exports = router;