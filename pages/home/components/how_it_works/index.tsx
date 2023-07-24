import YoutubePlayer from "components/about/youtube";

const HowItWorks = ({ isMobile, learnMore }: { isMobile: boolean, learnMore :boolean}) => {
    return (
        <div className="px-6 sm:px-[10%] overflow-hidden">
            <div className="sm:my-4 sm:pb-8">
                {learnMore &&<div className=" font-bold sm:text-xl text-dtech-main-dark ">How it Works</div>}
                <div className="sm:px-[10%] sm:py-[3%] px-2 relative sm:m-4 m-2">
                    {!learnMore&&!isMobile &&<div className="absolute z-20 h-full w-[80%] bg-black opacity-5"></div>}
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