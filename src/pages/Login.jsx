import { useNavigate, useLocation } from "react-router-dom"

import { useState } from "react"
import { loginUser } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
    const location = useLocation()
    const navigate = useNavigate()

    const [status,setStatus] = useState("idle")
    const [error, setError] = useState(null)
    /* 
        fromLocation: 
        It grabs the previous location that the user tried to access before
        getting redirected to the login page. As a result, this variable remembers where
        to send the user after logging in.
    */
    const fromLocation = location.state?.fromLocation || "/host";

    // USERNAME: b@b.com
    // PASS: p123
    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")

        loginUser(loginFormData)
            // eslint-disable-next-line no-unused-vars
            .then(data => {
                setError(null)
                localStorage.setItem("loggedin", true)
                // Replace: Fixes the bug when we click on return after logging in
                navigate(fromLocation, { replace: true }) 
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
            })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="content">
            <div className="container">
                <div className="login-container">
                    { location.state && location.state.message && (<div className="notification">{location.state.message}</div>)}
                    {
                        error && error.message && <div className="notification">{error.message}</div>
                    }
                    <h1>Sign in to your account</h1>
                    <form onSubmit={handleSubmit} className="login-form">
                        <input
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Email address"
                            value={loginFormData.email}
                        />
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            value={loginFormData.password}
                        />
                        <button className="link-button" disabled={status === "submitting"}>
                            {
                                status === "submitting" 
                                ? "Logging in..." 
                                : "Log in"
                            }     
                        </button>
                        <p className="extra-info">Test user: b@b.com / Password: p123</p>
                    </form>
                </div>
            </div>
        </div>
    )
}