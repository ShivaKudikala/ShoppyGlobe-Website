import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from "react-redux";
import { useState } from "react";

function Navbar(){

    const cart = useSelector((state) => state.cart); // for count of cart items
    const count = cart.length;
    const [search, setSearch] = useState(""); // for search options of diff items

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
                </div>
            </div>
        </>
        
    )
}

export default Navbar;