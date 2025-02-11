
import Product from "../Models/Products.Model.js";

// Function to get a single product by ID
function  getOneProduct(req, res){
    const productId = req.params.id;

    Product.findById(productId).then(data => {
        if(!data){
            return res.status(400).json({message: "Something went wrong"});
        }
        res.send(data);
    })
    
}

export default getOneProduct;