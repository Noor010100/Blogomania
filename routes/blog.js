const imageKit = require("../utils/imageKit");
var express = require('express');
const Blog = require('../models/blogModel')
const {isLoggedIn} = require('../utils/middleware');
const blog = require("../models/blogModel");
var router = express.Router();

router.get('/',async (req,res)=>{
    try{
        const allBlogs = await Blog.find()
        res.render('allBlogs',{allBlogs})
    }catch(err){
        res.send(err)
    }
})


router.get('/create',isLoggedIn, (req,res)=>{
    res.render('create')
})

router.post('/create', async (req,res)=>{
    try{
        const {title,description,details} = req.body
        const blogData =await new Blog({title,description,details,createdBy:req.user._id})
        if(req.files){
            const{url,fileId} = await imageKit.upload({
                file:req.files.blogImage.data,
                fileName:req.files.blogImage.name
            })
            blogData.blogImage = url
        }
        req.user.blogs.push(blogData._id)
        blogData.save()
        req.user.save()
        res.redirect('/users/profile')

    }catch(err){
        res.send(err)
    }
});

router.get('/blogDetail/:id', async (req,res) => {
    try{
        const {id} = req.params
        const blog =await Blog.findById(id)
        res.render('blogDetail',{blog})
    }catch(err){
        res.send(err)
    }
})




module.exports = router;