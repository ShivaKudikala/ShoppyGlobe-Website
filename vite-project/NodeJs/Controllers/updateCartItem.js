import cartItems from "../Models/Cart.Model.js";

// Function to update the quantity of an item in the cart
async function updateCartItem(req, res){
    const ItemId = req.params.id;
    const { quantity } = req.body;

        try{
            const updatedItem = await cartItems.findByIdAndUpdate(ItemId, { $set: { quantity } }, {new:true});
    
            if(!updatedItem){
                return res.status(400).json({message:"Item not found"})
            }
            res.send(updatedItem)
        }catch(error){
            return res.status(500).json({message:"Server Error" || error.message});
        }

}

export default updateCartItem;