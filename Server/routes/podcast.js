const express = require('express');
const router = express.Router();
const {AddPodcasts, UploadImage, DeleteImage, UploadAudio, GetAllPodcasts, DeletePodcast} = require("../controllers/podcastController")

router.post('/addPodcast', AddPodcasts);
router.post('/uploadImages', UploadImage);
router.delete('/deleteImage',DeleteImage);
router.post('/uploadAudio',UploadAudio);
router.get('/getAllPodcasts', GetAllPodcasts);
router.delete('/deletePodcast/:id', DeletePodcast);


module.exports = router;