import "./styles/Login-Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // for saving email
    const [password, setPassword] = useState(""); // for saving password
    const [isLoggedIn, setIsLoggedIn] = useState(false); // FOR checking if user is logged in or not

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const data = {
                email: email,
                password: password,
            }
            const response = await fetch("http://localhost:9898/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json();

            if(response.ok){
                localStorage.setItem("token", result.token);
                localStorage.setItem("email", email);
                alert("User logged in successfully");
                navigate("/");
            } 
            else{
                alert(result.message || "Failed to login user");
            }
        }catch(error){
            console.error("Error logging in user:", error);
            alert("Failed to login user");
        };
    }

    // Function to check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("email");
        if (token) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
        }
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className="login-register-container">
            <div className="login-register">
                <div className="login-A">
                    <div className="login-text">
                        <h1 className="login-bold-text">Login</h1>
                        <p>Get access to your Orders,</p> 
                        <p>Wishlist and Recommendations</p>
                    </div>
                    <div className="login-img-container">
                        <img className="login-img" src="/login-bg.png" />
                    </div>
                </div>
                {/* If user is logged in, show user details and logout button */}
                {isLoggedIn ? 
                    <div className="login-B">
                        <FontAwesomeIcon icon={faCircleUser} className="user-icon"/>
                        <p> User Details:  </p>
                        <p> Email: {email} </p>
                        <button className="login-btn" onClick={handleLogout}>Logout</button>
                    </div>
                     : 
                    <div className="login-B">
                        <FontAwesomeIcon icon={faCircleUser} className="user-icon"/>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder="Email" required  onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                            <button className="login-btn" type="submit">Login</button>
                        </form>
                        <p className="createaccount-text">New to ShoppyGlobe? <Link to={"/register"}> Create an Account</Link></p>
                    </div>
                }
                
            </div>
        </div>
        
    );
}

export default Login;