import "./styles/Footer.css";

function Footer(){ // Basic Footer component with dynamic date using JS
    const currentDate = new Date();
    const year = currentDate.getFullYear(); 
    return(
        <div className="footer-div">
            <div className="footer-content">
                <h1>ShoppyGlobe</h1>
                <p className="footer-text">ShoppyGlobe is your one-stop destination for a wide range of quality products at affordable prices. 
                From trendy fashion to cutting-edge gadgets, we offer something for everyone. 
                Shop with ease, enjoy exciting deals, and experience seamless service with ShoppyGlobe!</p>
            </div>
            <p className="footer-end">&copy; {year} ShoppyGlobe. All rights reserved.</p>
        </div>
    )
}

export default Footer;