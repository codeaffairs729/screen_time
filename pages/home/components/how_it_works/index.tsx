import YoutubePlayer from "components/about/youtube";

const HowItWorks = ({ isMobile }:{isMobile:boolean}) => {
    return (
        <div className="px-6 sm:px-[10%]">
            <div className="sm:my-4 sm:pb-8">
                <div className=" font-bold sm:text-xl text-dtech-main-dark ">How it Works</div>
                <div className="sm:px-[10%] sm:py-[3%] px-2 bg-white sm:m-4 m-2">
                    <YoutubePlayer
                        videoId="aM3-4QvjVBk"
                        iframeclassName=" rounded-xl "
                        width="100%"
                        height={isMobile ? 180 : 360}
                    />
                </div>
            </div>
        </div>
    )
}
export default HowItWorks;