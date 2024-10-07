const mongoose = require('mongoose');

// creating product schema
let productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,//it will store the object ids of all the reviews related to that particular product.
            ref: 'Review'
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
//When we use mongodb functions like findByIdAndDelete then  Mongoose internally uses a more generalized operation, such as findOneAndDelete() 
// which is responsible to perform that function.
// Pre Middleware (pre): Mongoose allows you to define middleware functions that will run before the main MongoDB operation. 
// For example, a pre('findOneAndDelete') middleware will run before the document is actually deleted.
// Post Middleware (post): Similarly, you can have middleware that runs after the main operation. For example, a post('findOneAndDelete')
//  middleware would execute after the deletion is complete.
// These middleware functions (both pre and post) are defined over a Mongoose schema. This means that they apply to all operations 
// related to that schema.

productSchema.post('findOneAndDelete', async function (product) {
    if (product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews } })
    }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product; //sending the model to be used anywhere when required

// In Mongoose, when defining a schema, the ref property is used to establish a relationship between different schemas.
// In this case, the ref: 'Review' inside the reviews array in the productSchema is setting up a relationship or reference to another schema named 'Review'.
//By using ref: 'Review', you're telling Mongoose that the reviews field will contain ObjectIds that correspond to documents in the 'Review' collection.
// This establishes a link between the Product schema and the 'Review' schema, creating a sort of relationship between these two models.