const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

exports.IsAuth = async (req,res) => {
    try {
        //    import token
        // headers=> authorization
        const token = req.headers.authorization; 
        if (!token) 
        {
            res.status(401).send({errors : [{msg: 'you are not authorized'}]})
        } else 
        {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            // test if the user exist with that id
            const user = await User.findOne({ _id: decoded.id });
            if(!user)
            {
                res.status(402).send({ errors: [{ msg: 'User doesnt exist' }] });
            } 
            else 
            {
                req.user = user; 
                res.status(200).send({ msg: 'authorized', user: req.user });
                
            }
        
        }
    }catch (error)
    {
        res.status(403).send({ errors: [{ msg: 'you are not authorized' }] });
    }
};

