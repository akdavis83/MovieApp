const VideoSection = ({videoKey}) => {
  return (
    <div className="ratio ratio-16x9">

        <iframe src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&muted=1`}
            title="Youtube Video"
            frameBorder="0"
            allowFullScreen
        >


        </iframe>
    </div>
    )
}

export default VideoSection