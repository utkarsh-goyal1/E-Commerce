const mongoose = require('mongoose');

// creating product schema
let reviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5 
    },
    comment:{
        type:String,
        trim:true
    }
    
},{timestamps:true});

// creating model
let Review = mongoose.model('Review' , reviewSchema )

module.exports = Review; //sending the model to be used anywhere when required

// In Mongoose, when you set timestamps: true in the schema options, it automatically adds createdAt and updatedAt fields to the schema.
// These fields are of type Date and are used to track the creation and modification times of the document.