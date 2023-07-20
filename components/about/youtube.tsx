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
    height?: string|number;
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
        <YouTube
            videoId={videoId}
            opts={opts}
            className={clsx("", className)}
            iframeClassName={clsx("", iframeclassName)}
        />
    );
};
export default YoutubePlayer;
