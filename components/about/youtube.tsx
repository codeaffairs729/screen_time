import clsx from "clsx";
import YouTube from "react-youtube";

const YoutubePlayer = ({
    videoId = "",
    width = "",
    height = "",
    className = "",
    iframeclassName = "",
}: {
    videoId: string;
    width?: string;
    height?: string | number;
    className?: string;
    iframeclassName?: string;
}) => {
    const opts = {
        height: height,
        width: width,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    return (
        // <YouTube
        //     videoId={videoId}
        //     opts={opts}
        //     className={clsx("", className)}
        //     iframeClassName={clsx("", iframeclassName)}
        // />
        <div className="responsive-video-wrapper">
            <iframe
                title="YouTube Video"
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
                className={`w-full lg:w-[70%] lg:h-[70%] responsive-iframe ${iframeclassName}`}
            ></iframe>
        </div>
    );
};
export default YoutubePlayer;
