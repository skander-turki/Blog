const {video} = require ('../models/videoSchema');
const tagsSchema = require("../models/tagsSchema");
const { cloudinary } = require('../config/cloudinary');

exports.Upload = async (req, res) => {
    
        const fileStr = req.body;
        await cloudinary.uploader.upload(fileStr.link ,{ resource_type: "video", 
        public_id: "Internship/Videos/"+ fileStr.Titre,
        chunk_size: 6000000,
        eager: [
            { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
            { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
        eager_async: true,
        eager_notification_url: "https://mysite.example.com/notify_endpoint" } ).then(async (result) => {
            var newVideoPost =  new video ({
                asset_id : result.asset_id, 
                LinkVideo : result.secure_url,
                Titre : fileStr.Titre , 
                Description : fileStr.Description, 
                DatePost : result.created_at, 
                ViewNumber : 0,
                LikesNumber : 0,
                Duration: result.Duration,
            });
                Promise.all(
                        fileStr.tags.map((tag) => {
                            return new Promise((resolve, reject)  => {
                                tagsSchema.findOne({name : tag}).then(async (t)  => {
                                    if( t == null) 
                                    {
                                        var newTag = new tagsSchema({
                                            name : tag
                                        });
                                        newTag.posts.push(newVideoPost._id);
                                        newTag.save().then( (res) =>{
                                            resolve(newVideoPost.tags.push(newTag._id));
                                        })
                                    }
                                    else {
                                        t.posts.push(newVideoPost._id);
                                        t.save().then(() => {
                                            resolve(newVideoPost.tags.push(t._id));
                                         })
                                        
                                    }
                                })
                            })
                        }) 
                ).then( async ()  => {
                    await newVideoPost.save();
                    res.status(200).send({msg: 'Uploaded successfully', video : newVideoPost});
                })
            }).catch((error) => {
                res.status(400).send({ errors: [{  error }] });
            });
}
exports.GetAll = async (req, res) => {
    try {
        const allVideos = await video.find();
        res.status(200).send({msg : 'Success', allVideos });
    }catch (error)
    {
        res.status(400).send({msg : error});
    }
}
exports.getOneById = async (req, res) => {
    try {
        const Video = await video.find({_id : req.params.id});
        res.status(200).send({ Post : Video });
    }catch (error)
    {
        res.status(400).send({msg : error});
    }
}
exports.GetByTags = async (req,res) => {
        
        const tags = [];
        tags.push(...req.body.tags);
        let result = [];
        let test = [] 
        Promise.all(
            tags.map((tag) => {
                return new Promise((resolve, reject)  =>{
                    tag.posts.map((p) => {
                        video.findById(p).then((v) => {
                            if( !test.includes(v._id.toString())){
                                test.push(v._id.toString())
                                resolve(result.push(v));
                            }else {
                                resolve(null)
                            }   
                        })  
                    })
                })
            })
        ).then(() => {
            res.status(200).send({ AllVideo : result});
        }).catch((error) => {
            res.status(401).send(error)
        } )
}
exports.GetAllVideos = async (req,res) => {
    video.find().then(
        (videos) => {
            res.status(200).send({data : videos});
        }
    ).catch(
        (error) => {
            res.status(401).send(error);
        }
    )
}
exports.DeleteVideo = async (req,res) => {
    video.findByIdAndDelete(req.params.id).then(
        (result) => {res.status(200).send(result); console.log("test")}
    ).catch(
        (error) => {res.status(400).send(error); console.log(error)}
    )
}