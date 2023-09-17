import { Link } from "react-router-dom"

export default function NotFound () {
    return (
        <div className="not-found-container">
            <div className="container">
                <h1>Sorry, the page you were looking for does not exist.</h1>
                <Link to="/" className="btn-return-home">Return to home</Link>
            </div>
        </div>
    )
}