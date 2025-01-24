import CartItem from "./CartItem";
import "./styles/Cart.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const EmptyCart = lazy(() => import("./EmptyCart")); // implementing lazy imports


function Cart(){
    const cartItems = useSelector((state) => state.cart);  // gives items in cart

    const platformFee = 0;
    const deliveryFee = 0;

    function priceCalculation(){
        const price = cartItems.reduce((acc, curr) => {
            return acc+= curr.price;
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
                            return <CartItem item={item} key={index} />;
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