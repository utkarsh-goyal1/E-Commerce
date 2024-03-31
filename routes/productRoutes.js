const express = require('express');
const Product = require('../models/Product');
const router = express.Router(); //mini instance/application;
const Review = require('../models/Review');
const { validateProduct } = require('../middleware')
const { isLoggedIn, isSeller, isProductAuthor } = require('../middleware')
// READ
router.get('/products', isLoggedIn, async (req, res) => {
    try {
        let allProducts = await Product.find();
        res.render('products/index', { allProducts })//it is used to render a view template.
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })//error is a ejs file
    }
})

// SHOW A NEW FORM
router.get('/products/new', isLoggedIn, isSeller, (req, res) => {
    try {
        res.render('products/new');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

// ACTUALLY ADDING IN THE DATABASE
router.post('/products', validateProduct, isLoggedIn, async (req, res) => {//Here validateProduct is our server side validation .When it validates the product then it will call next() function which we have defined followed by validateProduct
    try {
        let { name, img, price, desc } = req.body;
        await Product.create({ name, img, price, desc, author: req.user._id });
        req.flash('success', 'Product Added successfully')
        // req.flash('success', 'Product Added successfully') is used to create a flash message. Flash messages are a way to display temporary messages to users
        // req.flash() is a function provided by connect-flash middleware in Express.js.
        // It's used to store a flash message in the session. Here, you're creating a flash message with the key 'success' and the message 'Product Added successfully'
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

// TO SHOW A PARTICULAR PRODUCT
router.get('/products/:id', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');// Populate helps in linking documents in different collections and retrieving related data in a more convenient manner.
        res.render('products/show', { foundProduct })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }

})

// FORM TO EDIT A PARTIICULAR PRODUCT
router.get('/products/:id/edit', isLoggedIn, isSeller, isProductAuthor, async (req, res) => {
    try {
        // console.log(req.params);
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        // console.log("message", foundProduct)
        res.render('products/edit', { foundProduct })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})


// TO ACTUALLY CHANGE IN db
router.patch('/products/:id', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc });
        req.flash('success', 'Product edited successfully')
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

// DELETE THE EXISTING PRODUCT
router.delete('/products/:id', isLoggedIn, isSeller, isProductAuthor, async (req, res) => {
    try {
        let { id } = req.params;
        let product = await Product.findById(id)
        // for(let Id of product.reviews)
        // {
        //     await Review.findByIdAndDelete(Id);
        // }
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted successfully')
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})


// export so that you can use it in app.js
module.exports = router;