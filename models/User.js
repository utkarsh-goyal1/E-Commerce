const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

// creating User schema
let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    Role:{
        type:String,
        required:true
    },
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
});

userSchema.plugin(passportLocalMongoose)//we have to use the plugin to use the passportLocalMongoose. This plugin simplifies the process 
                                        //of setting up user authentication with Passport by automatically adding functionality for hashing 
                                        //and salting passwords, handling user serialization, and managing authentication.

// creating model
let User = mongoose.model('User', userSchema)

module.exports = User;

// Plugins are a tool for reusing logic in multiple schemas.
// Suppose you have several models in your database and want to add a loadedAt property to each one. Just create a plugin once and apply it to each Schema