import LoadingGif from "../assets/images/loading.gif"

export default function LoadingPlaceholder () {
    return (
        <div className="loading-placeholder-container">
            <img src={LoadingGif} />
        </div>
    )
}