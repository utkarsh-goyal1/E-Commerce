const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware');
const User = require('../../models/User');

router.post('/product/:productId/like', isLoggedIn, async (req, res) => {
    try {
        let { productId } = req.params;
        let user = req.user;
        let isLiked = await user.wishlist.includes(productId);
        // console.log(productId);
        const option = isLiked ? '$pull' : '$addToSet';
        req.user = await User.findByIdAndUpdate(
            req.user._id,
            { [option]: { wishlist: productId } },
            { new: true }//new:true is used to send the updated version of the document
        );
        res.send('like done api');
    } catch (error) {
        console.error('Error in like route:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
