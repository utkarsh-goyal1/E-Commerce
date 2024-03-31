const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cartRoutes = require('./routes/cartRoutes');
const methodOverride = require('method-override')
const authRoutes = require('./routes/authRoutes')
const productapi = require('./routes/api/productapi');
const passport = require('passport')
const LocalStrategy = require('passport-local');
const User = require('./models/User')
const session = require('express-session')//used for sessions 
const flash = require('connect-flash')
// database connection
mongoose.set('strictQuery', true); //version 7 ki vajah se
mongoose.connect('mongodb://127.0.0.1:27017/Amazon') //returns a promise
    .then(() => { console.log("DB CONNECTED") })
    .catch((err) => { console.log("error in DB", err) })

//setting templates
// app.engine('ejs' , ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));


// setting static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })) //body parsing middleware
app.use(methodOverride('_method'))//method override

let configSession = {
    secret: 'keyboard cat',
    // When a session is created or modified during a request, the express-session middleware typically saves the session data back to the session store at
    // the end of the request-response cycle. This process ensures that any changes made to the session (such as adding or modifying session variables) are persisted.
    // the resave option determines whether the session should be saved back to the session store, even if the session data hasn't been modified during the request.
    resave: false,
    saveUninitialized: true, // This property indicates whether to save new, uninitialized sessions. Setting it to true means that the session will be saved even if it is new .
    cookie: {
        httpOnly: true,
        expires: Date.now() + 24 * 7 * 60 * 60 * 1000,//used to create sessions of a user
        maxAge: 24 * 7 * 60 * 60 * 1000//maximum time of a session
    }
};
app.use(session(configSession));
app.use(flash())

//5 things that we need to use before using passport
app.use(passport.initialize())//we require to initialize the passport before its using.
app.use(passport.session())//to store the user locally 

app.use((req, res, next) => {
    res.locals.currentUser = req.user;//Store the current user details in locals object so that we can access the user anywhere.
    res.locals.success = req.flash('success')//req.flash() function, allowing you to create and retrieve flash messages.
    res.locals.error = req.flash('error');
    next();
})

passport.serializeUser(User.serializeUser());//when a user loged in then he remains loged in throughout the session.
passport.deserializeUser(User.deserializeUser());//when a user loged out then he remains loged out.
//passport
passport.use(new LocalStrategy(User.authenticate()));//defining the strategy i.e local strategy.



// using all the routes in order to verify the path an run the function
app.use(productapi);
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);

// adding dummy data to the collection
// seedDB()


// running on port
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server connected at port: ${PORT}`);
})


//In the context of frameworks like Express.js or Mongoose (which interfaces with MongoDB), middleware functions are functions that have access to the request object (req),
// the response object (res), and the next function in the application’s request-response cycle.