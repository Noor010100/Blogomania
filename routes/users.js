var express = require('express');
const User = require('../models/userModel')
const {isLoggedIn} = require('../utils/middleware')
const passport = require('passport')
const localStrategy = require('passport-local');
const imagekit = require('../utils/imageKit');
passport.use(new localStrategy(User.authenticate()))

var router = express.Router();

/* GET users listing. */
router.get('/register', (req,res)=>{
  res.render('register')
});
router.get('/login', (req,res)=>{
  res.render('login')
});

router.post('/register', async (req, res) => {
  try {
    const {name, username, email, password } = req.body
    const newuser = new User ({name, username, email})
    await User.register(newuser,password)
    res.redirect('/users/login')
  } catch (error) {
    res.send(error)
  }
});

router.post('/login', passport.authenticate('local',{
  successRedirect: `/users/profile`,
  failureRedirect: '/users/login'
})),(req,res) =>{}

router.get('/logout', (req,res)=>{
  req.logout(()=>{
    res.redirect('/users/login')
  })
})

router.get('/profile',isLoggedIn, async (req,res)=>{
 try {
  const user = await req.user.populate('blogs')
  res.render('profile', {user})
 } catch (error) {
  res.send(error)
 }

});

router.get('/edit-profile/:id',isLoggedIn,(req,res)=>{
  res.render('edit-profile',{user:req.user})
})


router.post('/edit-profile/:id', async (req,res)=>{
  try{
      const {name,username,email,bio}= req.body
      const updatedData = {
        name,
        username,
        email,
        bio,
      }
  
      if(req.files){
        if(req.files.profilepic){
          const profilepicData = await imagekit.upload({
            file:req.files.profilepic.data,
            fileName:req.files.profilepic.name
          })
  
          updatedData.profilepic = profilepicData.url
        }
  
        if(req.files.backgroundImage){
          const backgroundImageData = await imagekit.upload({
            file:req.files.backgroundImage.data,
            fileName:req.files.backgroundImage.name
          })
           updatedData.backgroundImage = backgroundImageData.url
          }
      }


        const user = await User.findByIdAndUpdate(req.params.id,updatedData)
        await user.save()

      res.redirect('/users/profile')
  }catch(err){
      res.send(err)
  }
})

module.exports = router;
