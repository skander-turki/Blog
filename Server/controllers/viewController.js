const viewsSchema = require("../models/viewsSchema");
const postSchema =require("../models/postSchema");
const userSchema = require("../models/userSchema");

exports.CheckView = async(req , res) => {
    viewsSchema.findOne({user : req.body.IdUser , post :req.body.IdPost})
    .then((result) => {
        if(result === null)
        {
            var View =  new viewsSchema ({
                user : req.body.IdUser,
                post : req.body.IdPost,
                isLiked : false
            })
            View.save().then((result) => {
                postSchema.findOne({_id : req.body.IdPost}).then((r) => {
                    r.Views.push(result._id);
                    r.save()
                }).catch((err) => {res.status(400).send({error : err});});
                userSchema.findOne({_id : req.body.IdUser}).then((r) => {
                    r.Views.push(result._id);
                    r.save()
                }).catch((err) => {res.status(400).send({error : err});});
                res.status(201).send({data : result});
            }).catch((err) => {
                res.status(400).send({error : err});
            })
        }else 
        {
            res.status(200).send({data : result})
        }
        
    }).catch((err) => {
        res.status(400).send({error : err});
    })
}
exports.toggleLike = async(req , res) => {
    viewsSchema.findOne({user : req.body.IdUser , post :req.body.IdPost}) 
    .then((result) => {
        result.isLiked = !result.isLiked;
        result.save();
        res.status(200).send({status : 200})
    }).catch((err) => {
         res.status(400).send({error : err});
    })
}