const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    details:{
        type:String
    },
    blogImage:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
})


const blog = mongoose.model('blog',blogSchema)

module.exports = blog