import NewProduct from "../Controllers/newProduct.js";
import getProducts from "../Controllers/getProducts.js";
import getOneProduct from "../Controllers/getOneProduct.js";

// Function to define the routes for the products
function productRoutes(app) {
    app.post("/product", NewProduct);
    app.get("/products", getProducts);
    app.get("/products/:id", getOneProduct);
}

export default productRoutes;