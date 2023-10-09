const express = require('express'); 
const router = express.Router();
const {AddArticle , UploadImage, DeleteImage, GetAllArticles, DeleteArticle} = require ('../controllers/articleController');

router.post('/addArticle', AddArticle);
router.post('/uploadImage', UploadImage);
router.delete('/DeleteImage/:name',DeleteImage);
router.get('/getAllArticles', GetAllArticles);
router.delete('/deleteArticle/:id', DeleteArticle);


module.exports = router;