const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require("express-validator");
const Post = require('../../models/Post')
const User = require('../../models/User')


// POST api/post
router.post('/',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
   const errors = validationResult(req)
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
   }
try {
    const user = await  User.findById(req.user.id).select('-password')
    const newPost =new Post({
        text : req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    })
    const post = await newPost.save()
    res.json(post)
} catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
}
  
})


// GET all post api/post
router.get('/',auth,async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1})  ///sort most recent first
        res.json(posts)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// GET single post api/post/:id
router.get('/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
           return res.status(404).json({msg:"Post not found"})
        }
        res.json(post)
        
    } catch (err) {
        console.error(err.message);
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:"Post not found"})
         }
         res.json(posts)
        res.status(500).send("Server Error");
    }
})

// Delete post
// DELETE api/posts/:id
router.delete('/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        // Check user
        if(post.user.toString()!==req.user.id){
            return res.status(401).json({msg:'user not authorize'})
        }
        if(!post){
            return res.status(404).json({msg:"Post not found"})
         }

        await post.remove()
        res.json({msg:'post removed'})
        
    } catch (err) {
        console.error(err.message);
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:"Post not found"})
         }
         res.json(posts)
        res.status(500).send("Server Error");
    }
})

// add like
// PUT api/posts/like/:id

router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        // Check if the post is already been liked
        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length>0){
            return res.status(400).json({msg:'post already liked'})
        }
        post.likes.unshift({user:req.user.id})
        await post.save()
        res.json(post.likes)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})
// remove like
// PUT api/posts/unlike/:id

router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        // Check if the post is already been liked
        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length === 0){
            return res.status(400).json({msg:'Post is not liked'})
        }
        // get remove index
        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
    
        post.likes.splice(removeIndex,1)


        await post.save()
        res.json(post.likes)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//  Add comment
//  POST api/post/comment/:id
router.post('/comment/:id',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
   const errors = validationResult(req)
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
   }
try {
    const user = await  User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id)
    const newComment ={
        text : req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    }
    post.comments.unshift(newComment)
    await post.save()
    res.json(post.comments)
} catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
}
  
})

// Delete comment
// DELETE api/posts/comment/:id/:comment_id
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
    try {
        // :id is post id
        const post = await Post.findById(req.params.id)
        // pullout comment
        const comment = post.comments.find(comment=>comment.id === req.params.comment_id)
        // make sure comment exists 
        if(!comment){
           return res.status(404).json({msg:'Comment does not exist'})
        }
        // check user 
        if(comment.user.toString()!==req.user.id){
            return res.status(401).json({msg:'user not authorized'})
        }
        // remove index
        const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex,1)

        
        await post.save()
        return res.json(post.comments)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})



module.exports = router