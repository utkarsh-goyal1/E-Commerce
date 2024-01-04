const express = require('express')
const router = express.Router();
const User = require('../models/User')
const passport=require('passport')

router.get('/register', (req, res) => {
    res.render('auth/signup');
})

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/register',async(req,res)=>{
    let {username,email,password}=req.body;
    let newUser=new User ({username,email});
    let createdUser=await User.register(newUser,password)//register a user in the database with unique hashed password including salt.
    res.render('auth/login');
})

router.post('/login',

    passport.authenticate('local',//Here local explains that we are using local strategy.
    {  
        failureRedirect:'/login'
    }),
    function(req,res){
        console.log(req.user ,"new")//req.user give all the information of user.
        res.redirect('/products')
    }
)

//logout
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout()
    }
    res.redirect('/login')
})
module.exports = router;

