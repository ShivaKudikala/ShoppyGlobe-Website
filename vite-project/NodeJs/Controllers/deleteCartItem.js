import cartItems from "../Models/Cart.Model.js";

// Function to delete an item from the cart
async function deleteCartItem(req, res) {
    const itemId = req.params.id;
    try{
        const deleted = await cartItems.findByIdAndDelete(itemId)
        if(!deleted){
            return res.status(400).json({message: "Item not found"});
        }
        res.send(deleted);
    }catch(error){
        return res.status(500).json({message:"Server Error", error: error.message});
    }
    
}

export default deleteCartItem;