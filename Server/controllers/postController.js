const postSchema =require("../models/postSchema");
const userSchema = require("../models/userSchema");
const { article } = require("../models/articleSchema");
const {video} = require ('../models/videoSchema');
const {podcast} = require("../models/podcastSchema");
const tagsSchema = require("../models/tagsSchema");
const viewsSchema = require("../models/viewsSchema");




exports.CreatePost = async (req , res) => {
    const data = req.body;
    const Author = await userSchema.findById(data.IdUser);
    if(data.Type === "Article")
    {
       var newPost =  new article ({
        Title : data.Title ,
        Description : data.Description, 
        LinkImage : data.ImageLink,
        DatePost : Date.now(),
        User : Author._id ,
        IsValid : false
    })
    }
    else if (data.Type === "Video")
    {
        var newPost =  new video ({
            Title : data.Title ,
            Description : data.Description, 
            LinkImage : data.ImageLink,
            LinkVideo : data.VideoLink,
            DatePost : Date.now(),
            User : Author._id ,
            IsValid : false
        })
    }else 
    {
        var newPost =  new podcast ({
            Title : data.Title ,
            Description : data.Description, 
            LinkImage : data.ImageLink,
            LinkAudio : data.PodcastLink,
            DatePost : Date.now(),
            User : Author._id ,
            IsValid : false
        })
    }
    Promise.all(
        data.tags.map((tag) => {
            return new Promise((resolve, reject)  => {
                tagsSchema.findOne({name : tag}).then(async (t)  => {
                    if( t == null) 
                    {
                        var newTag = new tagsSchema({
                            name : tag
                        });
                        newTag.posts.push(newPost._id);
                        newTag.save().then( () =>{
                            resolve(newPost.tags.push(newTag));
                        })
                    }
                    else {
                        t.posts.push(newPost._id);
                        t.save().then(() => {
                            resolve(newPost.tags.push(t));
                         })
                        
                    }
                })
            })
        }) 
        ).then( async ()  => {
            newPost.save();
            Author.Posts.push(newPost._id);
            Author.save();
            res.status(200).send({msg: 'Uploaded successfully', post : newPost});
        }).catch((error) => {res.status(401).send({ errors:  error  }); console.log(error)})
}
exports.getall = async(req , res) => { 
    postSchema.find().then(async(posts) => {
        const updatedPosts = await Promise.all(
            posts.map(async (post) => {
                const updatedTags = await Promise.all(
                    post.tags.map(async (tagId) => {
                    const tag = await tagsSchema.findById(tagId).lean();
                    return tag;
                    })
                ); 
                const user = await userSchema.findById(post.User).lean();
            return { ...post.toObject(), tags: updatedTags, User : user };
            })
          );
      
          res.status(200).send({ msg: "success", data: updatedPosts });
    }).catch((err) => {
        res.status(400).send({error : err})
    })
}
exports.getOne = async(req , res) => {
    postSchema.findOne({_id : req.params.id})
    .then( async (result) => {
        const ViewsNumber =await viewsSchema.find({post : result._id}).count();
        const LikeNumber = await viewsSchema.find({post : result._id , isLiked : true}).count();
        const obj = {
            post : result,
            ViewsNumber :ViewsNumber,
            LikeNumber : LikeNumber
        }
        res.status(200).send({status : 200 , data : obj})
    }).catch((err) => {
        res.status(400).send({error : err})
        console.log(err)
    })
} 