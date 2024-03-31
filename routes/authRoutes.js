const express = require('express')
const router = express.Router();
const User = require('../models/User')
const passport = require('passport')

router.get('/register', (req, res) => {
    res.render('auth/signup');
})

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/register', async (req, res) => {
    try {
        let { username, email, password, Role } = req.body;
        let newUser = new User({ username, email, Role });
        let createdUser = await User.register(newUser, password)//register a user in the database with unique hashed password including salt.
        // res.render('auth/login');
        req.login(newUser, function (err) {//req.login is a function which directly login the user when he/she register .
            if (err) return next(err)
            req.flash('success', 'Welcome')
            return res.redirect('/products')
        })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

router.post('/login',
    // The passport.authenticate() function is a middleware provided by Passport
    passport.authenticate('local',//Here local explains that we are using local strategy.
        {
            failureRedirect: '/login'
        }),
    function (req, res) {
        // console.log(req.user ,"new")//req.user give all the information of user.
        req.flash('success', 'Welcome back')
        res.redirect('/products')
    }
)

//logout
// router.get('/logout', (req, res) => {
//     () => {
//         console.log(req.user);
//         req.logout();//req.logout() is a function provided by Passport.js that removes the authenticated user's session and effectively logs them out.
//     }
//     console.log("Without logout");
//     res.redirect('/login')
// })
router.get('/logout', (req, res) => {
    // console.log(req.user);
    req.logout((err) => { // Add the callback function
        if (err) {
            console.error(err);
            // Handle any errors during logout
        } else {
            req.flash('success', 'Good Bye');
            // console.log("Hello",req.user);when the user logout then req.user also get null.
            res.redirect('/login'); // Safe to redirect after successful logout
        }
    });
});

module.exports = router;

