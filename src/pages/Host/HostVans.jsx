import { Link } from "react-router-dom"
import {useState, useEffect } from "react"
import { getHostVans } from "../../api"
import LoadingPlaceholder from "../../components/LoadingPlaceholder"

export default function HostVans() {
    const [vans, setVans] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadHostVans() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setVans(data)
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadHostVans()
    },[])

    const hostVansElements = vans.map(van => (
        <div className="host-van-single" key={van.id}>
            <Link
                to={van.id}
                key={van.id}
                className="host-van-link-wrapper"
            >
                <div className="van-image-zoom-container">
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`}/>
                </div>
            </Link>
            <div className="host-van-info">
                <Link
                    to={van.id}
                    key={van.id}
                    className="host-van-link-wrapper"
                >
                    <h3>{van.name}</h3>
                </Link>
                <p>${van.price}/day</p>
            </div>
        </div>
        
    ))

    return (
        <div className="content">
            <div className="container">
                {
                    error && <h1>An error happened: {error.message}</h1>
                }
                { 
                    loading ? <LoadingPlaceholder /> :
                    (
                        <>
                            <h1 className="host-vans-title">Your listed vans</h1>
                            <div className="host-vans-list">
                                {
                                    vans.length > 0 ? (
                                        <div className="host-vans-list-inner">
                                            {hostVansElements}
                                        </div>

                                    ) : (
                                            <h2>Loading...</h2>
                                        )
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}