const tagsSchema = require("../models/tagsSchema");
const post = require("../models/postSchema")

exports.AddTags = async (req,res) => {
    var newTag = new tagsSchema ({
        name : req.body.name,
    })
    try
    {
        newTag.save();
        res.status(200).send({msg:'tag added', newTag});
    }
    catch(error)
    {
        res.status(400).send({errors: [{error}]});
    }
}
exports.GetTags = async (req, res) => {
    try{
        const allTags = await tagsSchema.find();
        res.status(200).send({msg : 'Success', allTags });
    } catch (error)
    {
        console.log(error)
        res.status(400).send({msg : error});
    }
}
exports.GetTag = async (req, res) => {
    try {
        const tag = await tagsSchema.find({ name : req.params.name });
        res.status(200).send({msg : 'tag', tag});
    } catch 
    {
        res.status(400).send({msg : error})
    }
}
exports.DeleteTag = async (req, res) => {
    try {
        await tagsSchema.deleteOne({ name : req.params.name });
        res.status(200).send({msg : 'tag deleted'});
    } catch 
    {
        res.status(400).send({msg : error});
    }
}
exports.AddPostToTags = async (req , res) => {
    try {
        const tag = req.body ;
        const pos = post.find({ _id : req.params.id });
        //await post.updateOne({ _id: pos._id }, { $push: { tags: tag._id } });
        await tagsSchema.updateOne({ _id: tag._id }, {$push: {posts: pos._id}});
        res.status(200).send({msg : 'post added to tag'});
    }catch (error)
    {
        console.log(error)
        res.status(400).send({msg : error});
    }
}