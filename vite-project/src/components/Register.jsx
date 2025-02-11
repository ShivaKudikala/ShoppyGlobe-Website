import "./styles/Login-Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // for saving email
    const [password, setPassword] = useState(""); // for saving password
    const [confirmPassword, setConfirmPassword] = useState(""); // for saving password

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }else{
            try{
                const data = {
                    email: email,
                    password: password,
                }
                
                const response = await fetch("http://localhost:9898/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                const result = await response.json();
                if(response.ok){
                    alert("User registered successfully! Go to login page and login to continue");
                    navigate("/login");

                } 
                else{
                    alert(result.message || "Failed to register user");
                }
            }catch(error){
                console.error("Error registering user:", error);
                alert("Failed to register user");
            };
        }
    }

    return (
        <div className="login-register-container">
                <div className="login-register">
                    <div className="login-A">
                        <div className="login-text">
                            <h1 className="login-bold-text">Register</h1>
                            <p>Looks like you're new here!,</p> 
                            <p>Sign up to get started</p>
                        </div>
                        <div className="login-img-container">
                            <img className="login-img" src="/register-bg.png" />
                        </div>
                    </div>
                    <div className="login-B">
                        <FontAwesomeIcon icon={faCircleUser} className="user-icon"/>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
                            <input type="password" name="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />
                            <input type="password" name="password" placeholder="Confirm Password" required onChange={(e)=>setConfirmPassword(e.target.value)}/>
                            <button className="login-btn" type="submit">Register</button>
                        </form>
                        <p className="createaccount-text">Already an existing user? <Link to={"/login"}> Login</Link></p>
                    </div>
                </div>
            </div>
    );
}

export default Register;