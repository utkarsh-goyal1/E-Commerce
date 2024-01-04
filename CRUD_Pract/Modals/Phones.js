const mongoose=require('mongoose');
const phoneSchema=new mongoose.Schema({
    img: {
        type :String,
        trim :true
    },
    name:{
        type:String,
        trim:true,
        required:true 
    },
    price:{
        type:Number,
        min:0
    },
    desc:{
        type:String,
        trim:true,
        required:true
    }
})
const phone=mongoose.model("Phone",phoneSchema);
module.exports=phone;