import YoutubePlayer from "components/about/youtube";

const HowItWorks = ({
    isMobile,
    learnMore,
}: {
    isMobile: boolean;
    learnMore: boolean;
}) => {
    return (
        <div className="px-6 sm:px-[10%] overflow-hidden">
            <div className="sm:my-4 sm:pb-8 ">
                {
                    <div className=" font-bold sm:text-xl md:text-3xl text-dtech-main-dark md:text-[#333333]">
                        How it Works
                    </div>
                }
                <div className=" border-solid relative p-4 md:p-8 lg:p-12">
                    <YoutubePlayer
                        videoId="aM3-4QvjVBk"
                        iframeclassName="rounded-2xl w-full aspect-video"
                        // width={isMobile ? '40%' : '100%'}
                        // height={isMobile ? 180 : 360}
                    />
                </div>
            </div>
        </div>
    );
};
export default HowItWorks;
