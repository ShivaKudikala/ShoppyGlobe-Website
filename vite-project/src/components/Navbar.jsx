import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCartShopping, faMagnifyingGlass, faCircleUser } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useFetch from "../utils/useFetch.js";
import { setItemsToCart } from "../utils/cartSlice.js";

function Navbar(){
    const dispatch = useDispatch();
    const {data, error, loading} = useFetch("http://localhost:9898/cartItems");
    
    useEffect(()=> {
        if(data && data.length > 0){
            dispatch(setItemsToCart(data));
        }
    }, [data, dispatch]);

    const cart = useSelector((state) => state.cart.items); // for count of cart items
    const count = cart.length;

    const [search, setSearch] = useState(""); // for search options of diff items

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

    return (
        <>  
            <div className="navbar"> 
                <div className="nav-sec-1">
                    {/* Logo Section */}
                    <img className="logo-img" src="/Logo.png"/> 
                    <h3 className="proj-title">ShoppyGlobe</h3>
                </div>
                <div className="nav-sec-2">
                    {/* Navbar links and searchbox Section */}
                    <Link to={"/"} className="icon-link"><FontAwesomeIcon color="#4361ee" icon={faHouse} />  Home</Link>
                    <div className="search">
                        <div className="search-box">
                            <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
                            <Link to={search && `/products/${search}`}><button className="search-btn"><FontAwesomeIcon color="white" icon={faMagnifyingGlass} /></button></Link>
                        </div>
                    </div>
                    <Link to={"/cart"} className="icon-link">
                        <div className="cart-items-link">
                            <FontAwesomeIcon className="cart-icon" color="#ccff33" icon={faCartShopping} />
                            <div className="cart-text-wrapper">
                                <p className="cart-text">Cart</p>
                                {count>0 && 
                                <div className="cart-count">
                                    <p>{count}</p>
                                </div>
                                }
                            </div>
                        </div>
                    </Link>
                    <Link to={"/login"} className="icon-link"><FontAwesomeIcon className="login-icon" color="#4361ee" icon={faCircleUser} />User</Link>
                </div>
            </div>
        </>
        
    )
}

export default Navbar;