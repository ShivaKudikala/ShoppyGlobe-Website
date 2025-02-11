import NewProduct from "../Controllers/newProduct.js";
import getProducts from "../Controllers/getProducts.js";
import getOneProduct from "../Controllers/getOneProduct.js";

// Function to define the routes for the products
function productRoutes(app) {
    app.post("/api/product", NewProduct);
    app.get("/api/products", getProducts);
    app.get("/api/products/:id", getOneProduct);
}

export default productRoutes;