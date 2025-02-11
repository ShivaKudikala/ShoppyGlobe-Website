import { Link } from "react-router-dom";
import "./styles/Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { removeFromCart } from "../utils/cartSlice";
import { useState, useEffect } from "react";

function CartItem(props){

    
    const dispatch = useDispatch();

    // Function to handle removing item from cart
    const handleRemove = async() => {
        try{
            const token = localStorage.getItem("token");
            // Send a DELETE request to remove the item from the cart
            await fetch(`http://localhost:9898/cart/${props.item._id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            dispatch(removeFromCart(props.item.id));  // function to remove items from cart
        }catch(error){
            console.log("error occured", error);
            alert("Error: Failed to delete from the cart");
        }
        
    }

    const minQuantity = props.item.quantity;
    const [quantity, setQuantity] = useState(minQuantity);

    // Function to increase quantity of item in cart
    function increaseQuantity(){
        setQuantity((prevQuantity) => {
            const updatedQuantity = prevQuantity + 1;
            async function updateQuantity(){
                try{
                    const token = localStorage.getItem("token");
                    // Send a PUT request to update the quantity of the item in the cart
                    const response = await fetch(`http://localhost:9898/cart/${props.item._id}`,{
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({quantity: updatedQuantity}),
                    });
                    if(response.status === 403){
                        alert("Unauthorized! Please login again.");
                        return;
                    }
                    const updatedItem = await response.json();
                }catch(error){
                    console.log("Error occured", error);
                    alert("Error: Failed to update quantity");
                }
            }
            updateQuantity();
            return updatedQuantity;
        }); 
    }

    // Function to decrease quantity of item in cart
    function decreaseQuantity(){
        if(quantity>1){
            setQuantity((prevQuantity) => {
                const updatedQuantity = prevQuantity - 1;
                async function updateQuantity(){
                    try{
                        const token = localStorage.getItem("token");
                        // Send a PUT request to update the quantity of the item in the cart
                        const response = await fetch(`http://localhost:9898/cart/${props.item._id}`,{
                            method: "PUT",
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            },
                            body: JSON.stringify({quantity: updatedQuantity}),
                        });
                        if(response.status === 403){
                            alert("Unauthorized! Please login again.");
                            return;
                        }
                        const updatedItem = await response.json();
                    }catch(error){
                        console.log("Error occured", error);
                        alert("Error: Failed to update quantity");
                    }
                }
                updateQuantity();
                return updatedQuantity;
            });  
        }else{
            handleRemove();
        }
    }

    return ( // Individual Cart Item
        <> 
            <div className="cartItem-div">
                <div className="cart-image-div">
                    <Link to={`/Product-Detail/${props.item.id}`}><img className="cart-img" src={props.item.thumbnail}/></Link>
                    <div className="cart-quantity">
                        <div className="quantity-div">
                            <button className="quantity-btns" onClick={decreaseQuantity}> {quantity>1 ?  <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faTrash} />}</button>
                            <p className="quantity-tag">{quantity}</p>
                            <button className="quantity-btns" onClick={increaseQuantity}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                        <button onClick={handleRemove} className="cart-delete-btn"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </div>
                <div className="cart-content-div">
                    <div className="item-name-shipping">
                        <p className="item-title">{props.item.name}</p>
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
