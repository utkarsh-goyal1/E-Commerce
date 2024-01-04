const express=require('express');
const app=express();
const path=require("path");
const mongoose=require('mongoose');
const seedDB=require('./seed');
const productRoutes=require('./Routes/phoneRoutes')
const methodOverride=require('method-override')


app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb://127.0.0.1:27017/Dukan')
.then(()=>{
    console.log("Connected to database")
})
.catch((e)=>{
    console.log(e);
})
app.use(methodOverride('_method'));


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
//seedDB();
app.use(productRoutes);


app.get('/',(req,res)=>{
    res.send("Connected");
})

app.listen(3000,()=>{
    console.log("Connected");
})