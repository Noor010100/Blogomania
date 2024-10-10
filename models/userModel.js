const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        RegExp:['/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',"provide a valid email"]
    },
    password:{
        type:String
    },
    profilepic:{
        type:String,
        default:'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D'
    },
    backgroundImage:{
        type:String,
        default:'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D'
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog"
    }],
   
})

userSchema.plugin(plm)

const user = mongoose.model('user',userSchema)

module.exports = user