const express= require('express');
const router = express.Router();
const {AddTags , GetTags, GetTag, DeleteTag, AddPostToTags} = require('../controllers/tagsController')


router.post('/addtag', AddTags);
router.get('/getAllTags', GetTags);
router.get('/gettag/:name', GetTag);
router.delete('/delete/:name', DeleteTag);
router.put('/addTagToPost/:_id', AddPostToTags)


module.exports = router;