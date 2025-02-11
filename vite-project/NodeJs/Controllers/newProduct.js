import Product from "../Models/Products.Model.js";

// Function to add a new product
function NewProduct(req, res) {
    const {brand, name, description, category, thumbnail, price, rating, stock, reviews, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, discountPercentage} = req.body
    // **Check if all required fields are present**
    const newProduct = new Product({
        brand: brand,
        name: name,
        description: description,
        category: category,
        thumbnail: thumbnail,
        price: price,
        rating: rating,
        stock: stock,
        reviews: reviews,
        warrantyInformation: warrantyInformation,
        shippingInformation: shippingInformation,
        availabilityStatus: availabilityStatus,
        returnPolicy: returnPolicy,
        discountPercentage: discountPercentage,
    });
    // **Save the new product to the database**

    newProduct.save().then(data => {
        if(!data){
           return res.status(400).json({message:"Something went wrong"})
        }
        res.send(data);
    });

}

export default NewProduct;