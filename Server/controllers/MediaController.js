const {article} = require("../models/articleSchema");
const {podcast} = require("../models/podcastSchema");
const {video} = require ('../models/videoSchema');
const Post= require ('../models/postSchema')

exports.GetMostViewedPosts = async (req, res) => {
    const podcasts = podcast.find()
    const videos = video.find()
    const articles = article.find()
    Promise.all([podcasts, videos, articles]).then(
        (values) => {
            const allPosts = [].concat(...values);
            allPosts.sort((a, b) => b.ViewNumber - a.ViewNumber);
            res.status(200).send(allPosts);
        }
    ).catch(
        (error) =>
        {
            res.status(400).send(error);
        }
    )
}
exports.getPostById = async (req, res) => {
    Post.findOne({_id : req.params.id}).then((p) => 
    {
        res.status(200).send({post: p})
    }).catch((error) => res.status(400).send(error))
}
