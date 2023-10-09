const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
exports.AddUser = async(req, res) => {
  const {   Mail, HashedPassword, Birthdate } = req.body;
      // test email
      const findUser = await User.findOne({ Mail });
      // email should be unique
      if (findUser) {
        return res.status(400).send({ errors: [{ msg: 'email should be unique' }] });
      }
      else {
        const newUser = await new User({ ...req.body });
      // hashage password
        const hashedpassword = await bcrypt.hash(HashedPassword, saltRounds);
        newUser.HashedPassword = hashedpassword;
        newUser.IsMailConfirmed = false;
        newUser.LastConnexion = Date.now();
        newUser.isGoogleAuth = false;
      // then we save user in DB
        newUser.save().then(() => {
          res.status(200).send({status : "200"});
        }).catch((error) => {
          console.log(error)
          res.status(401).send({ status : "401", errors: [{ msg: error }] });
        })
      }
}

exports.Register = async (req, res) => {
  
    try {
      const {   Mail, HashedPassword, Birthdate } = req.body;
      // test email
      const findUser = await User.findOne({ Mail });
      // email should be unique
      if (findUser) {
        return res.status(400).send({ errors: [{ msg: 'email should be unique' }] });
      }
      // new user
      const newUser = await new User({ ...req.body });
      // hashage password
      const hashedpassword = await bcrypt.hash(HashedPassword, saltRounds);
      newUser.HashedPassword = hashedpassword;
      newUser.IsMailConfirmed = false;
      newUser.LastConnexion = Date.now();
      newUser.isAdmin = false;
      newUser.isGoogleAuth = false;
      // then we save user in DB
      await newUser.save();
  
      // CRRE UN TOKEN
      const Token = jwt.sign(
        {
          id: newUser._id
        },
        process.env.SECRET_KEY,
        { expiresIn: '3h' }
      );
      // response
      res.status(200).send({ status : "200", token: Token});
    } catch (error) {
      res.status(401).send({ errors: [{ msg: error }] });
    }
  };
exports.GetUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).send({ status : "200", Users});
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.GetUser =  async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).send({ msg : 'user' , user});
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.DeleteUser = async (req,res) => {
  console.log("7chineh")
  try {
    await User.deleteOne({_id: req.params.id });
    res.status(200).send({status : "200", msg : 'User deleted'});
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.UpdateUser = async (req,res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { $set: { ...req.body } }); 
    
      res.status(200).send({msg : 'User updated'});
    
  }catch(error)
  {
    res.status(400).send({ errors: [{ msg: error }] });
  }
}

exports.Login = async(req,res) => {
  
  if (req.body.LoginByGoogle == false)
   {  //Saisie email et password 
      const {Mail , HashedPassword} = req.body;
      //recherche user 
      User.findOne({Mail}).then((findUser) => {
        if(!findUser) 
            {
              res.status(401).send({errors: [{msg : 'User not found', status:"401"}]});
            }else
            {
              bcrypt.compare(HashedPassword, findUser.HashedPassword).then((comparepassword) => 
              {
                if(!comparepassword) 
                {
                  res.status(402).send({errors: [{status: "402", msg : 'Bad password'}]});
                }else 
                {
                  const token = jwt.sign(
                    {id: findUser._id},
                    process.env.SECRET_KEY, 
                    {expiresIn : '3h'}
                  );
                  res.status(200).send(
                  {
                    status:"200",
                    user: findUser,
                    token
                  });
                }
              })
            }
      }).catch((error) => {
        res.status(400).send({ errors: [{ msg: error }] });
      })} 
  else 
  {
    const Mail  = req.body.Mail;
    User.findOne({Mail}).then((findUser) => {
      if (!findUser)
      {
        const newUser =  new User({ ...req.body });
        console.log(newUser)
    
        // hashage password
        newUser.IsMailConfirmed = false;
        newUser.LastConnexion = Date.now();
        newUser.isAdmin = false;
        newUser.isGoogleAuth = true;
        // then we save user in DB
        newUser.save().then(() => {
            // CRRE UN TOKEN
          const Token = jwt.sign(
            {
              id: newUser._id
            },
            process.env.SECRET_KEY,
            { expiresIn: '3h' }
          );
          // response
          res.status(200).send({ status : "200", token: Token});
        }).catch((error) => {
          res.status(402).send({ status : "402", msg: error });
        })

      }else {
        const token = jwt.sign(
          {id: findUser._id},
          process.env.SECRET_KEY, 
          {expiresIn : '3h'}
        );
        res.status(200).send(
        {
          status:"200",
          user: findUser,
          token
        });
      }
    })

  }
  
}
