const express = require('express');
const router = express.Router();
const {CreateTheme , UpdateTheme , GetTheme} = require('../controllers/themeController');

router.post('/createTheme', CreateTheme);
router.put('/updateTheme/:id', UpdateTheme);
router.get('/getTheme', GetTheme);

module.exports = router;