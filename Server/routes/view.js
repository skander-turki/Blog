const express = require('express'); 
const router = express.Router();
const {CheckView , toggleLike} = require("../controllers/viewController");

router.post('/check_view', CheckView);
router.post('/toggleLike' , toggleLike);

module.exports = router;