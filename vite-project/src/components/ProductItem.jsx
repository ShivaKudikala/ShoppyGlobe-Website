import "./styles/Products.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function ProductItem(props){ // component for single product item

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    function handleClick(){
        dispatch(addToCart(props.Product));
    }

    return(
        <div className="product-card">
            <div className="product-image">
                <Link to={`/Product-Detail/${props.Product.id}`}><img src={props.Product.thumbnail} alt="Product-image"/></Link>
            </div>
            <div className="product-details">
                <h4 className="product-brand">{props.Product.brand}</h4>
                <p className="product-title">{props.Product.title}</p>
                <p className="product-price">${props.Product.price}</p>
                <p className="product-status" style={{color: props.Product.availabilityStatus === "Low Stock" ? "red" : "green"}}>{props.Product.availabilityStatus}</p>
                {
                (!cart.some((item) => item.id === props.Product.id) 
                ? <button onClick={handleClick} className="addtocart-btn"><FontAwesomeIcon className="addcart-icon" icon={faCartShopping} />Add to Cart</button> 
                : <p className="addedCart">Added to cart <FontAwesomeIcon color="#26a451" icon={faCheck}/></p>)
                }
                
            </div>

        </div>
    )
}

export default ProductItem;