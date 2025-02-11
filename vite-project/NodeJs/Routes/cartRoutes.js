import newCartItem from "../Controllers/newCartItem.js";
import getCartItems from "../Controllers/getCartitems.js";
import deleteCartItem from "../Controllers/deleteCartItem.js";
import updateCartItem from "../Controllers/updateCartItem.js";
import authenticate from "../Controllers/authenicate.js";

// Function to define the routes for the cart
function cartRoutes(app){
    app.get("/cartItems", getCartItems);
    app.post("/cart", authenticate, newCartItem);
    app.put("/cart/:id", authenticate, updateCartItem);
    app.delete("/cart/:id", authenticate, deleteCartItem);
}

export default cartRoutes;