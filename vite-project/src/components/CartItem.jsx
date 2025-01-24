import { Link } from "react-router-dom";
import "./styles/Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { removeFromCart } from "../utils/cartSlice";

function CartItem(props){

    const dispatch = useDispatch();

    function handleRemove(){
        dispatch(removeFromCart(props.item.id));  // function to remove items from cart
    }

    return ( // Individual Cart Item
        <> 
            <div className="cartItem-div">
                <div className="cart-image-div">
                    <Link to={`/Product-Detail/${props.item.id}`}><img className="cart-img" src={props.item.thumbnail}/></Link>
                    <button onClick={handleRemove} className="cart-delete-btn"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <div className="cart-content-div">
                    <div className="item-name-shipping">
                        <p className="item-title">{props.item.title}</p>
                        <p>{props.item.shippingInformation}</p>
                    </div>
                    <p className="item-seller">Seller: {props.item.brand}</p>
                    <div className="item-price">
                        <p className="item-priceTag">${props.item.price}</p>
                        <p className="discount-tag">- {props.item.discountPercentage}% off</p>  
                    </div>
                    <p className="return-policy">{props.item.returnPolicy}</p>
                </div>
            </div>
            <hr className="hr-tag"/>
        </>
        
    )
}

export default CartItem;