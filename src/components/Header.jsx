import { useState, useEffect, useRef } from "react"
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom"
import AvatarIcon from "../assets/images/avatar-icon.png"
import { FaBars } from "react-icons/fa6"

export default function Header (){
    const isLoggedIn = localStorage.getItem("loggedin")
    const location = useLocation()
    const navigate = useNavigate()

    const [isMobile, setIsMobile] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const menuRef = useRef() // Targets the menu

    
    useEffect(() => {
        // Function to check if it's a mobile device based on window width
        const checkIsMobile = () => {
            const mobileBreakpoint = 768
            return window.innerWidth < mobileBreakpoint
        }
    
        // Check if it's a mobile device when the component initially mounts
        setIsMobile(checkIsMobile())
    
        const handleResize = () => {
            setIsMobile(checkIsMobile())
            if (isMobile) {
                setIsOpen(false) // Close the menu on resize if it's a mobile device
            }
        }
    
        // Adds a event listener for the window resizing
        window.addEventListener('resize', handleResize)
    
        // Cleaning
        return () => {
          window.removeEventListener('resize', handleResize)
        }
    }, [])

    // Toggles the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    // Simulates a log out by removing the logging state from localstorage and sents the user to the previous path
    function falseLogOut () {
        localStorage.removeItem("loggedin")
        navigate(location.pathname, { replace: true }) 
    }

    useEffect(() => {
        // Add a click event listener to the document to close the menu 
        const handleClick = (e) => {
          if(!menuRef.current.contains(e.target)){
                setIsOpen(false)
          }
        }
        // Adds the event listeners
        document.addEventListener('mousedown', handleClick);
    
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

    
    return (
        <header>
            <div className="container">
                <NavLink className="site-logo" to="/">#VanLife</NavLink>
                {isMobile && <div className="menuIcon" onClick={toggleMenu}><FaBars/></div>}
                <nav className={`${isMobile ? 'mobile-menu ' : ''}${isOpen ? 'open' : ''}`} ref={menuRef}>
                    {
                        isLoggedIn && isMobile &&
                        (
                            <div className="login-state">
                                <img src={AvatarIcon} className="avatar-icon" /> Welcome, Bob 
                            </div>
                        )
                    }
                    <NavLink to="host" className={({isActive}) => isActive ? "active-nav-element" : null }>Host</NavLink>
                    <NavLink to="about" className={({isActive}) => isActive ? "active-nav-element" : null }>About</NavLink>
                    <NavLink to="vans" className={({isActive}) => isActive ? "active-nav-element" : null }>Vans</NavLink>
                    {
                        isLoggedIn && !isMobile &&
                        (
                            <div className="login-state">
                                <img src={AvatarIcon} className="avatar-icon" /> Welcome, Bob | <a onClick={falseLogOut}>Log out</a>
                            </div>
                        )
                    }
                    {
                        isLoggedIn && isMobile && (<a onClick={falseLogOut}>Log out</a>)
                    }
                    {
                        !isLoggedIn && isMobile && (<Link to="login" className="login-link">Log in</Link>) 
                    }
                    {
                        !isLoggedIn && !isMobile && (<Link to="login" className="login-link">Log in</Link>) 
                    }
                </nav>
            </div>
      </header>
    )
}