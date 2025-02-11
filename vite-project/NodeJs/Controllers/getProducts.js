import Product from "../Models/Products.Model.js";

// Function to get all products
function getProducts(req, res) {
    Product.find().then(data => {
        if(!data){
            return res.status(400).json({message: "Something went wrong"})
        }
        res.send(data);
    })
}

export default getProducts;