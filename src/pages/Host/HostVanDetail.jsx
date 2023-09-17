import { useState, useEffect } from "react"
import { useParams, Link, NavLink, Outlet } from "react-router-dom"
import { getHostVan } from "../../api"
import LoadingPlaceholder from "../../components/LoadingPlaceholder"

export default function HostVanDetail() {
    const [currentVan, setCurrentVan] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const params = useParams()

    useEffect(() => {
        async function loadVan() {
            setLoading(true)
            try {
                const data = await getHostVan(params.id)
                setCurrentVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVan()
    }, [params.id])

    return (
        <div className="content">
            <div className="container">
                <Link to=".." relative="path" className="back-button"
                >&larr; <span>Back to all vans</span></Link>
                {
                    error && <h1>An error happened: {error.message}</h1>
                }
                {
                    currentVan && !loading ? (
                        <div className="host-van-detail-layout-container">
                            <div className="host-van-detail">
                                <img src={currentVan.imageUrl} />
                                <div className="host-van-detail-info-text">
                                    <i
                                        className={`van-type van-type-${currentVan.type}`}
                                    >
                                        {currentVan.type}
                                    </i>
                                    <h3>{currentVan.name}</h3>
                                    <h4>${currentVan.price}/day</h4>
                                </div>
                            </div>
                            <nav className="host-van-detail-nav">
                                <NavLink end to="." className={({isActive}) => isActive ? "active-nav-element" : null }>Info</NavLink>
                                <NavLink to="price" className={({isActive}) => isActive ? "active-nav-element" : null }>Price</NavLink>
                                <NavLink to="photos" className={({isActive}) => isActive ? "active-nav-element" : null }>Photos</NavLink>
                            </nav>
                            <Outlet context={{ currentVan }} />
                        </div>
                    ) : <LoadingPlaceholder />
                }
            </div>
        </div>
    )
}
