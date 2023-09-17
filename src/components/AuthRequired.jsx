import { Outlet, Navigate, useLocation} from "react-router-dom"

/** Sets the authentification for the protected routes *******/
export default function AuthRequired () {
    const isLoggedIn = localStorage.getItem("loggedin")
    const location = useLocation()

    if (!isLoggedIn) {
        return (
            /** Sends the user to the login page when trying to access the protected route and is not logged in *******/
            <Navigate 
                to="/login" 
                state={
                    {
                        message: "You must log in first!",
                        fromLocation: location.pathname // Remembers the location which the user tried to access
                    }
                }
                replace // Replace: Fixes the bug when we click on return after logging in
            />
        )
    }

    return <Outlet />

}