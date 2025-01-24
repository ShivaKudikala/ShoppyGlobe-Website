import "./styles/Header.css";
import ProductList from "./ProductList";

function Header(){  // Basic header Design
    return(
        <>
            <div className="header-div">
                <p className="header-text">GET START</p>
                <p className="header-text">YOUR FAVORITE SHOPPING</p>
            </div>
            <ProductList />
        </>
        
    )
}

export default Header;