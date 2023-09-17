import { useState, useEffect } from "react"
import { Link, useSearchParams} from "react-router-dom"
import { getVans } from "../../api"
import LoadingPlaceholder from "../../components/LoadingPlaceholder"

export default function Vans () {

    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Catches  the type filter
    const typeFilter = searchParams.get("type")

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    },[])

    const displayedVans = typeFilter 
    ? vans.filter(van => van.type.toLowerCase() === typeFilter)
    : vans
    
    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link 
                to={van.id} 
                state={{ 
                    search: `?${searchParams.toString()}`, 
                    type: typeFilter 
                }}
            >
                <div className="van-image-zoom-container">
                    <img src={van.imageUrl} />
                </div>
            </Link>
            <div className="van-info">
                <Link to={van.id}>
                    <h3>{van.name}</h3>
                </Link>
                <p>${van.price}<span>/day</span></p>
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </div>
    ))

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <div className="content">
            <div className="container">
                {
                    error && <h1>An error happened: {error.message}</h1>
                }
                { 
                loading ? <LoadingPlaceholder /> :
                    (
                        <div className="van-list-container">
                            <h1>Explore our van options</h1>
                            <div className="van-list-filter-buttons">
                                <button 
                                    onClick={() => handleFilterChange("type", null)}
                                    className={`van-type all ${typeFilter === null ? "selected" : ""}`}
                                >All</button>
                                <button 
                                    onClick={() => handleFilterChange("type", "simple")}
                                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                                >Simple</button>
                                <button 
                                    onClick={() => handleFilterChange("type", "luxury")}
                                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                                >Luxury</button>
                                <button 
                                    onClick={() => handleFilterChange("type", "rugged")}
                                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                                >Rugged</button>
                            </div>
                            <div className="van-list">
                                {vanElements}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}