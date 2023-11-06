const {video} = require ('../models/videoSchema');
const tagsSchema = require("../models/tagsSchema");
const { cloudinary } = require('../config/cloudinary');

exports.UploadImage = async (req, res) => {
    const fileStr = req.body;
    cloudinary.uploader.upload(
        fileStr.url ,{ resource_type: "image", 
        public_id: "Internship/VideoImages/"+ fileStr.name  }
        ).then((result) => {
            const r = {
                id : result.asset_id,
                link : result.secure_url
            }
            res.status(200).send({r})
        }).catch((error) => {
            res.status(401).send({error})
        } )
}

exports.Upload = async (req, res) => {
        const fileStr = req.body;
            var newVideoPost =  new video ({
                LinkVideo :fileStr.link,
                LinkImage : fileStr.ImageLink, 
                Titre : fileStr.Titre , 
                Description : fileStr.Description, 
                Category : fileStr.Category,
                DatePost : Date.now(), 
                ViewNumber : 0,
                LikesNumber : 0,
            });
                Promise.all(
                        fileStr.tags.map((tag) => {
                            return new Promise((resolve, reject)  => {
                                console.log("aa")
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
                }).catch((error) => {res.status(401).send({ errors: [{  error }] }); console.log(error)})
            
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
        res.status(200).send({ data : Video });
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