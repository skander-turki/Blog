const { article } = require("../models/articleSchema");
const { cloudinary } = require('../config/cloudinary');
const tagsSchema = require("../models/tagsSchema");
const { Result } = require("express-validator");

exports.UploadImage = async (req, res) => {
    const fileStr = req.body;
    cloudinary.uploader.upload(
        fileStr.url ,{ resource_type: "image", 
        public_id: "Internship/ArticleImages/"+ fileStr.name  }
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
exports.AddArticle = async (req,res) => {
    const fileStr = req.body;
    var newArticle = new article ({
        Titre : fileStr.Titre ,
        Description : fileStr.Description, 
        ViewNumber : 0,
        LikesNumber : 0,
        DatePost : Date.now()
    })
    fileStr.links.map((obj) => {
        newArticle.LinkImages.push(obj.r.link)
    })
    Promise.all(
        fileStr.tags.map((tag) => {
            return new Promise((resolve, reject) => {
                tagsSchema.findOne({name : tag}).then(
                    async (t) => {
                        if( t == null)
                        {
                            var newTag = new tagsSchema({
                                name : tag
                            });
                            newTag.posts.push(newArticle._id);
                            newTag.save().then((res) => {
                                resolve(newArticle.tags.push(newTag._id));
                            })
                        }
                        else 
                        {
                            t.posts.push(newArticle._id);
                            t.save().then(() => {
                                resolve(newArticle.tags.push(t._id));
                            })
                        }
                    }
                )
            })
        })
    ).then(async () => {
        newArticle.save().then((result) => {
            res.status(200).send(result)
        }).catch(error => {
            res.status(401).send(error)
        })
    }).catch(error => {
        res.status(402).send(error);
    })
}
exports.GetAllArticles = async (req,res) => {
    article.find().then(
        (articles) => {
            res.status(200).send({data : articles});
        }
    ).catch(
        (error) => {
            res.status(401).send(error);
        }
    )
}
exports.DeleteArticle = async (req,res) => {
    article.findByIdAndDelete(req.params.id).then(
        (result) => res.status(200).send(result)
    ).catch(
        (error) => res.status(400).send(error)
        
    )
}

