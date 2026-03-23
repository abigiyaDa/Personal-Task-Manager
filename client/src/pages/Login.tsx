import signInImage from "../assets/sign-in.png";
import "../App.css";
import { FaUser,FaLock } from "react-icons/fa";

export default function Login(){
    return (
        <div className="login-container">
            <div className="login-left">
                <h1>Sign In</h1>

                <div className="input-group">
                    <FaUser className="input-icon"></FaUser>
                    <input type="text" placeholder="Enter Username"/>
                </div>

                <div className="input-group">
                    <FaLock className="input-icon"></FaLock>
                    <input type="password" placeholder="Enter Password"/>
                </div>

                <div className="remember">
                    <input type="checkbox" />
                    <span>Remember Me</span>
                </div>

                <button className="login-btn">Login</button>

                <p className="register-text">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>

            <div className="login-right">
                <img src={signInImage} alt="Sign In" className="login-image"/>
            </div>
        </div>
    )
}