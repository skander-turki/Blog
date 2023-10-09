const express = require('express'); 
const router = express.Router();
const {Upload, GetAll, getOneById, GetByTags, GetAllVideos, DeleteVideo} = require ('../controllers/videoController');

router.post('/upload', Upload);
router.get('/getAll', GetAll);
router.get('/getOneById/:id', getOneById);
router.get('/getbytags',GetByTags );
router.get('/getAllVideos', GetAllVideos);
router.delete('/deleteVideo/:id', DeleteVideo);


module.exports = router;