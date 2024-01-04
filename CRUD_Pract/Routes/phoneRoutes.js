const express=require('express');

const router=express.Router();//acts as mini express app.

const Phone=require('../Modals/Phones');//require product collection to display all the products.



router.get('/phones',async(req,res)=>{
    const phones=await Phone.find({});
    res.render('index',{phones});
})


router.get('/phones/new',(req,res)=>{
    res.render('new');
})

router.post('/phones',async(req,res)=>{
    const {img,name,price,desc}=req.body;
    await Phone.create({img,name,price,desc});
    res.redirect('/phones');
})

router.get('/phones/:phoneid',async(req,res)=>{
    const {phoneid}=req.params;
    const phone=await Phone.findById(phoneid);
    res.render('show',{phone});
})

router.get('/phones/:phoneid/edit',async(req,res)=>{
    const {phoneid}=req.params;
    const phone=await Phone.findById(phoneid);
    res.render('edit',{phone});
})
router.patch('/phones/:phoneId',async(req,res)=>{
    const {phoneId}=req.params;
    const {name,price,desc}=req.body;
    await Phone.findByIdAndUpdate(phoneId,{name,price,desc});
    res.redirect('/phones');
})
router.delete("/phones/:phoneid",async(req,res)=>{
    const {phoneid}=req.params;
    await Phone.findByIdAndDelete(phoneid);
    res.redirect('/phones');
})


module.exports=router;