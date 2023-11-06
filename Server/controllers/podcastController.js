
const {podcast} = require("../models/podcastSchema");
const {cloudinary} = require('../config/cloudinary');
const tagsSchema = require("../models/tagsSchema");


exports.UploadAudio = async (req, res) => { 
    const fileStr = req.body;
    cloudinary.uploader.upload(
        fileStr.LinkAudio,
        {
            resource_type: "video",
            public_id: "Internship/Podcast/"+fileStr.name,
        }
    ).then(
        result => {
            res.status(200).send(result.secure_url);
        }
    ).catch(
        error => {
            res.status(401).send(error);
        }
    )
}
exports.UploadImage = async (req, res) => {
    const fileStr = req.body;
    cloudinary.uploader.upload(
        fileStr.url ,{ resource_type: "image", 
        public_id: "Internship/PodcastImages/"+ fileStr.name  }
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

exports.DeleteImage = async (req , res) => {
    console.log("wselna")
    const name = req.params.name; 
    
    console.log("Internship/ArticleImages/"+ name.substring(0,name.indexOf('.')))
    cloudinary.uploader.destroy("Internship/ArticleImages/"+ name.substring(0,name.indexOf('.')) , {
        resource_type : "image"
    }).then((result) => {
        console.log(result)
        res.status(200).send(result)
    }).catch((error) => {
        res.status(400).send(error);
    })

}

exports.AddPodcasts = async (req, res) => {
    const fileStr = req.body;
    console.log(fileStr.LinkAudio)
            const newPodcast = new podcast({
                LinkAudio : fileStr.LinkAudio,
                Titre : fileStr.Titre,
                Description : fileStr.Description,
                Category : fileStr.Category ,
                DatePost :  Date.now(), 
                ViewNumber : 0,
                LikesNumber : 0,
            })
            
            fileStr.links.map((obj) => {
                
                newPodcast.LinkImages.push(obj.r.link)
            })
            Promise.all(
                fileStr.tags.map((tag) => {
                    return new Promise((resolve, reject) => {
                        console.log(tag)
                        tagsSchema.findOne({name : tag}).then(
                            async (t) => { 
                                t.posts.push(newPodcast._id);
                                t.save().then(() => {
                                resolve(newPodcast.tags.push(t._id));
                                    })
                            }
                        ).catch(
                            () => {
                                var newTag = new tagsSchema({
                                    name : tag
                                });
                                newTag.posts.push(newPodcast._id);
                                newTag.save().then(
                                    (res) => {
                                        resolve(newPodcast.tags.push(newTag._id));
                                    }
                                )
                            }
                        )
                    })
                })
            ).then(() => {
                newPodcast.save().then((result) => {
                    res.status(200).send(result);
                }).catch(error => {
                    res.status(402).send(error);
                })
            }).catch((error) => {
                res.status(401).send(error);
                console.log(error)
            })
}
exports.GetAllPodcasts = async (req,res) => {
    podcast.find().then(
        (podcasts) => {
            res.status(200).send({data : podcasts});
        }
    ).catch(
        (error) => {
            res.status(401).send(error);
        }
    )
}
exports.DeletePodcast = async (req,res) => {
    console.log(req.params.id)
    podcast.findByIdAndDelete(req.params.id).then(
        (result) => {res.status(200).send(result)}
    ).catch(
        (error) => {res.status(400).send(error)}
    )
}