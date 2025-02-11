import CartItem from "./CartItem";
import "./styles/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import useFetch from "../utils/useFetch.js";
import { setItemsToCart } from "../utils/cartSlice.js";

const EmptyCart = lazy(() => import("./EmptyCart")); // implementing lazy imports


function Cart(){

    const dispatch = useDispatch();
    const {data, error, loading} = useFetch("http://localhost:9898/api/cartItems"); // fetching cart items from backend

    // Function to set items to cart
    useEffect(()=> {
        if(data && data.length>0){
            dispatch(setItemsToCart(data));
        }
    },[data, dispatch]);

    const cartItems = useSelector((state) => state.cart.items);  // gives items in cart

    if(loading){  // if loading...
        return (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )
      }
  
      if(error){ // error handling
        return (
          <div className="error-loading">
            <p>Errorrrr: {error}</p>
          </div>
        ) 
      }

    const platformFee = 0;
    const deliveryFee = 0;


    function priceCalculation(){
        const price = cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;;
        }, 0);
        return price.toFixed(2);  // Function for price calculation for all items inside cart
    }

    function finalPrice(price){
        const finalprice = price + deliveryFee + platformFee;
        return finalprice;
    }

    return (
        <>
            {cartItems && cartItems.length > 0 ? ( // If there are items in cart, it shows items and price
                <div className="cart-div">  
                    <div className="cart-items">
                        {cartItems.map((item, index) => {
                            return <CartItem item={item} key={index}/>;
                        })}
                    </div>
                    <div className="pricing-div">
                        <p>Price Details</p>
                        <hr />
                        <div className="cart-price">
                            <p>Price ({cartItems.length} items)</p>
                            <p>${priceCalculation()}</p>
                        </div>
                        <div className="platform-fee">
                            <p>Platform Fee</p>
                            <p>${platformFee.toFixed(2)}</p>
                        </div>
                        <div className="delivery-charges">
                            <p>Delivery Charges</p>
                            <p className="free-tag">Free</p>
                        </div>
                        <hr />
                        <div className="total-price">
                            <p>Total</p>
                            <p>${finalPrice(priceCalculation())}</p>
                        </div>

                        <hr />
                        <div className="checkout-div">
                            <Link to={"/checkout"}><button className="checkout-btn">Checkout</button></Link>
                        </div>
                    </div>
                </div>
            ) : ( // if no items in cart then shows empty cart
                <Suspense fallback={<div className="loading-container"><div className="spinner"></div></div>}><EmptyCart /></Suspense>
            )}
        </>
    );

    
}

export default Cart;