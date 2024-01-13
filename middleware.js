const { productSchema } = require('./schema')
const { reviewSchema } = require('./schema')
const Product = require('./models/Product');

const validateProduct = (req, res, next) => {
    let { name, img, price, desc } = req.body;
    // console.log("Inside Validate Product", req.body);
    const { error } = productSchema.validate({ name, img, price, desc })//it returns two things error and value but we donot require value that's why we are not catching it 
    if (error) {
        return res.render('error')
    }
    next()
}

const validateReview = (req, res, next) => {
    let { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment })//it returns two things error and value but we donot require value that's why we are not catching it 
    if (error) {
        return res.render('error')
    }
    next();
}
const isLoggedIn = (req, res, next) => {
    if (!(req.isAuthenticated())) {
        req.flash('error', 'please login first')
        return res.redirect('/login');
    }
    next();
}
const isSeller = (req, res, next) => {
    if (!req.user.Role) {
        req.flash('error', 'You need permission to access the content')
        return res.redirect('/products');
    }
    else if (req.user.Role !== 'seller') {
        req.flash('error', 'You need permission to access the content')
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor = async (req, res, next) => {
    let { id } = req.params;
    let product = await Product.findById(id);
    if (!(product.author.equals(req.user._id))) {
        req.flash('error', 'You do not have access to make changes')
        return res.redirect('/products');
    }
    next()
}
module.exports = { isSeller, validateProduct, validateReview, isLoggedIn, isProductAuthor };