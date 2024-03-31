const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review')
const { validateReview } = require('../middleware')

router.post('/products/:id/review', validateReview, async (req, res) => {
    try {
        let { id } = req.params;
        let { rating, comment } = req.body;
        let review = new Review({ rating, comment });
        let product = await Product.findById(id);
        product.reviews.push(review);
        await product.save();
        await review.save();
        req.flash('success', 'Review Added Successfully')
        res.redirect(`/products/${id}`);
    }

    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

module.exports = router;