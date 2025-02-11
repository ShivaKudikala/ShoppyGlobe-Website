import newCartItem from "../Controllers/newCartItem.js";
import getCartItems from "../Controllers/getCartitems.js";
import deleteCartItem from "../Controllers/deleteCartItem.js";
import updateCartItem from "../Controllers/updateCartItem.js";
import authenticate from "../Controllers/authenicate.js";

// Function to define the routes for the cart
function cartRoutes(app){
    app.get("/api/cartItems", getCartItems);
    app.post("/api/cart", authenticate, newCartItem);
    app.put("/api/cart/:id", authenticate, updateCartItem);
    app.delete("/api/cart/:id", authenticate, deleteCartItem);
}

export default cartRoutes;