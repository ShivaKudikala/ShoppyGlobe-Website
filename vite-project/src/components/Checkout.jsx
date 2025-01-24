import "./styles/Checkout.css"
import { Link } from "react-router-dom";

function Checkout() { // Basic Checkout Page without any Functionality
    return (
        <div className="checkout-page">   
            <div className="checkout-container">
                <h1 className="checkout-title">Checkout Page</h1>
                <p className="progress-indicator">Step 2 of 3: Review and Confirm</p>
        
                {/* User Information */}
                <div className="user-info">
                    <h2>Personal Information</h2>
                    <form>
                        <label>
                        Name: <input type="text" placeholder="John Doe" disabled />
                        </label>
                        <label>
                        Address: <input type="text" placeholder="123 Main St" disabled />
                        </label>
                        <label>
                        Phone: <input type="text" placeholder="(123) 456-7890" disabled />
                        </label>
                    </form>
                    <p className="info-note">
                        *Delivery information is required. Payment will be enabled soon.*
                    </p>
                </div>
        
                {/* Payment Placeholder */}
                <div className="payment-placeholder">
                    <h2>Payment</h2>
                    <p>Choose your preferred payment method:</p>
                    <ul>
                        <li>Credit Card</li>
                        <li>Debit Card</li>
                        <li>UPI</li>
                    </ul>
                    <p className="payment-note">
                        Payment functionality is coming in the next update!
                    </p>
                </div>
        
                {/* Pay Now and Back Button */}
                <button className="pay-now-button" disabled>
                    Pay Now
                </button>
                <Link to={"/cart"}><button className="backtocart-btn">Back to Cart</button></Link>
            </div>

        </div>
      
    );
  }
  
  export default Checkout;