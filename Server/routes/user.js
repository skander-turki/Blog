const express= require('express');
const router = express.Router();
const {Register, GetUsers, GetUser, DeleteUser, UpdateUser, Login, AddUser} = require('../controllers/userController'); 
const {validation, registerValidate} = require('../middleware/validateUser');
const {IsAuth} = require('../middleware/auth')
const { cloudinary, signUpload } = require('../config/cloudinary');
const sig = signUpload();
/*
@method: POST
@ path:http:localhost:5000/api/user/register
@ parameter: req.body  
public
*/
router.post('/AddUser', registerValidate(), validation, AddUser);
router.post('/register', registerValidate(), validation, Register);
router.get('/getUsers', GetUsers);
router.get('/getUser/:id', GetUser);
router.delete('/deleteUser/:id', DeleteUser);
router.put('/UpdateUser/:id', UpdateUser );
router.post('/login', Login);
router.get('/current', IsAuth);

router.post('/upload', async (req, res) => {
      const fileStr = req.body ; 
      cloudinary.uploader.upload(
        fileStr.url , 
        { 
          resource_type : "image",
          public_id: "Internship/UserImages/"+ fileStr.name }
      ).then((result) => {
          const r = {
              id : result.asset_id,
              link : result.secure_url
          }
          res.status(200).send({r})
      }).catch((error) => {
          res.status(401).send({error})
      })
  });
router.get('/images', async (req, res) => {
    try {
      const { resources } = await cloudinary.search
        .expression('folder:Internship')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
   
      const publicIds = resources.map(file => file.public_id);
      res.send(publicIds);
    } catch (err) {
      res.status(500).json({ err: 'Something went wrong2' });
    }
  });
  // get one image
router.get('/image', async (req, res) => {
    try {
      const { resources } = await cloudinary.search
        .expression('folder:Internship')
        .sort_by('version', 'desc')
        .max_results(1)
        .execute();
      const Url = resources[0].url;
  
      res.status(200).send(Url);
    } catch (err) {
      res.status(500).json({ err: 'Something went wronggggg' });
    }
  });

module.exports = router;