import { useParams, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { getVan } from "../../api"
import LoadingPlaceholder from "../../components/LoadingPlaceholder"

export default function VanDetail() {
    const params = useParams()
    const location = useLocation()
    const [van, setVan] = useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    
    useEffect(() => {
        async function loadVan() {
            setLoading(true)
            try {
                const data = await getVan(params.id)
                setVan(data)
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVan()
    },[params.id])
    
    return (
        <div className="content">
            <div className="container">
                <Link
                    to={location.state.search ? `..${location.state.search}` : ".."}
                    relative="path"
                    className="back-button"
                >
                    &larr; <span>Back to { location.state.type ? `${location.state.type} vans` : "all vans"}</span>
                </Link>
                <div className="van-detail-container">
                    {
                        error && <h1>An error happened: {error.message}</h1>
                    }
                    {van && !loading ? (
                        <div className="van-detail">
                            <div className="van-detail">
                                <img src={van.imageUrl} />
                                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                                <h2>{van.name}</h2>
                                <p className="van-price"><span>${van.price}</span>/day</p>
                                <p className="van-description">{van.description}</p>
                            </div>
                        </div>
                    ) : <LoadingPlaceholder />}
                </div>
            </div>
        </div>
    )
}