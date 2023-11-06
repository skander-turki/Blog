const express = require('express'); 
const router = express.Router();
const {Upload, GetAll, getOneById, GetByTags, GetAllVideos, DeleteVideo, UploadImage} = require ('../controllers/videoController');

router.post('/upload', Upload);
router.post('/uploadImage', UploadImage);
router.get('/getAll', GetAll);
router.get('/getOneById/:id', getOneById);
router.get('/getbytags',GetByTags );
router.get('/getAllVideos', GetAllVideos);
router.delete('/deleteVideo/:id', DeleteVideo);


module.exports = router;