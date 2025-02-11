import cartItems from "../Models/Cart.Model.js";

// Function to get all items in the cart
async function getCartItems(req,res){
    
    try{
        await cartItems.find().then(data => {
            if(!data){
                return res.status(400).json({message: "Something went wrong"});
            }
            res.send(data);
        })

    }catch(error){
        return res.status(500).json({message:"Server Error", error: error.message});
    }
    
}

export default getCartItems;