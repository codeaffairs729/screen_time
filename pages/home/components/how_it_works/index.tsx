import YoutubePlayer from "components/about/youtube";

const HowItWorks = ({ isMobile, learnMore }: { isMobile: boolean, learnMore :boolean}) => {
    return (
        <div className="px-6 sm:px-[10%] overflow-hidden">
            <div className="sm:my-4 sm:pb-8">
                {<div className=" font-bold sm:text-xl md:text-3xl text-dtech-main-dark md:text-[#333333]">How it Works</div>}
                <div className="sm:px-[10%] sm:py-[1%] px-2 sm:pb-8 relative sm:m-4 m-2">
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