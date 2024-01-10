const express = require('express'); 
const router = express.Router();
const {CreatePost , getall, getOne} = require ('../controllers/postController');

router.post('/CreatePost', CreatePost);
router.get('/GetAll' , getall);
router.get('/getOne/:id', getOne)

module.exports = router;