import "./styles/Products.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function ProductItem(props){ // component for single product item

    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // Function to handle adding product to cart
    const handleClick = async () => {
        try {
            const token = localStorage.getItem("token"); // Get the token from local storage

            // Check if user is logged in
            if (!token) {
                alert("You must be logged in to add items to the cart.");
                return;
            }

            // Create a new cart item object
            const newCartItem = {
                id: props.Product._id,
                brand: props.Product.brand,
                name: props.Product.name,
                price: props.Product.price,
                thumbnail: props.Product.thumbnail,
                quantity: 1, // Minimum quantity to be added to cart
                shippingInformation: props.Product.shippingInformation,
                discountPercentage: props.Product.discountPercentage,
                returnPolicy: props.Product.returnPolicy
            };
            
            // Send a POST request to add the item to the cart
            const response = await fetch("http://localhost:9898/cart",{
                method: "POST",
                headers: { 
                    "Content-type" : "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newCartItem),
            })
            if (response.status === 403) {
                alert("Unauthorized! Please login again.");
                return;
            }
    
            const newItem = await response.json();
            dispatch(addToCart(newItem));
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add product to cart.");
        }
    };

    return(
        <div className="product-card">
            <div className="product-image">
                <Link to={`/Product-Detail/${props.Product._id}`}><img className="product-img" src={props.Product.thumbnail} alt="Product-image"/></Link>
            </div>
            <div className="product-details">
                <h4 className="product-brand">{props.Product.brand}</h4>
                <p className="product-title">{props.Product.name}</p>
                <p className="product-price">${props.Product.price}</p>
                <p className="product-status" style={{color: props.Product.availabilityStatus === "Low Stock" ? "red" : "green"}}>{props.Product.availabilityStatus}</p>
                {
                (!cart.some((item) => item.id == props.Product._id) 
                ? <button onClick={handleClick} className="addtocart-btn"><FontAwesomeIcon className="addcart-icon" icon={faCartShopping} />Add to Cart</button> 
                : <p className="addedCart">Added to cart <FontAwesomeIcon color="#26a451" icon={faCheck}/></p>)
                }
                
            </div>

        </div>
    )
}

export default ProductItem;