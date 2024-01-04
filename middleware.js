const {productSchema}=require('./schema')
const {reviewSchema}=require('./schema')

const validateProduct=(req,res,next)=>{
    let{name,img,price,desc}=req.body;
    console.log("Inside Validate Product",req.body);
    const {error}=productSchema.validate({name,img,price,desc})//it returns two things error and value but we donot require value that's why we are not catching it 
    if(error)
    {
        return res.render('error')
    }
    next()
}

const validateReview=(req,res,next)=>{
    let{rating,comment}=req.body;
    const {error}=reviewSchema.validate({rating,comment})//it returns two things error and value but we donot require value that's why we are not catching it 
    if(error)
    {
        return res.render('error')
    }
    next()
}
module.exports={validateProduct,validateReview};