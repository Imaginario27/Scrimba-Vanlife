import { NavLink } from "react-router-dom"

export default function SubNavigation (){
    return (
        <div className="container">
            <nav className="host-nav">
                <NavLink end to="." className={({isActive}) => isActive ? "active-nav-element" : null }>Dashboard</NavLink>
                <NavLink to="income" className={({isActive}) => isActive ? "active-nav-element" : null }>Income</NavLink>
                <NavLink to="vans" className={({isActive}) => isActive ? "active-nav-element" : null }>Vans</NavLink>
                <NavLink to="reviews" className={({isActive}) => isActive ? "active-nav-element" : null }>Reviews</NavLink>
            </nav>
        </div>
    )
}