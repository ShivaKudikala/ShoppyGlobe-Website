import { Link } from "react-router-dom";
import "./styles/Empty.css";

function EmptyCart(){ // Empty Cart component, shows when cart is empty
    return(
        <>
            <div className="emptyCart-div">
                <div className="emptyDetails-div">
                    <img className="emptyCart-img" src="/emptyCart-img.png" alt="Cart Empty Image"/>
                    <p className="empty-text">Your Cart is Empty!</p>
                    <p className="additems-text">Add items to it Now.</p>
                    <Link to={"/"}><button className="shopnow-btn">Shop Now</button></Link>
                </div>
            </div>
        </>
    )
}

export default EmptyCart;