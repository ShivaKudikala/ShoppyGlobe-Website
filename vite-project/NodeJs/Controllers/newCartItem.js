import cartItems from "../Models/Cart.Model.js";

// Function to add a new item to the cart
async function newCartItem(req,res){

    const {id, brand, name, price, thumbnail, quantity, shippingInformation, discountPercentage, returnPolicy} = req.body;

    try{

        // **Check if all required fields are present**
        if (!id || !brand || !name || !price || !thumbnail || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // **Check if the product is already in the cart**
        const existingCartItem = await cartItems.findOne({ id: id });

        if (existingCartItem) {
            return res.status(400).json({ message: "Item already exists in cart" });
        }

        const newItem = new cartItems({
            id: id,
            brand: brand,
            name: name,
            price: price,
            thumbnail: thumbnail,
            quantity: quantity,
            shippingInformation: shippingInformation,
            discountPercentage: discountPercentage,
            returnPolicy: returnPolicy,
        })
    
        await newItem.save().then(data => {
            if(!data){
                return res.status(400).json({message: "Something went wrong"});
            }
            res.send(data);
        })

    }catch(error){
        return res.status(500).json({message:"Server Error", error: error.message});
    }
    
}

export default newCartItem;