import InfoIcon from "components/UI/icons/info_icon";
import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import HomeVM from "../../home.vm";
import InsightCard from "./insight_card";

const Insights = ({ isMobile, insightMetrics }: { isMobile: boolean, insightMetrics:any }) => {
    // const [metrics, setMetrics] = useState<any>()
    // const [isVisible, setIsVisible] = useState(false);
    const [showScroll, setShowScroll] = useState(false);

    // const homeVM = HomeVM()

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowScroll(true);
        } else {
            setShowScroll(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    // const handleScroll = () => {
    //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //     setIsVisible(scrollTop > 0);
    // };

    // useEffect(() => {
    //     setMetrics(homeVM.fetchedMetrics)
    // }, [homeVM.fetchedMetrics])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="flex flex-col px-4 sm:px-[10%] mt-6 sm:mt-16 ">
            <div className="flex flex-row sm:items-center justify-between sm:justify-start">
                <div className=" flex flex-row">
                    <div className="font-bold sm:text-xl text-md text-dtech-main-dark">Insights</div>
                </div>
            </div>
            {insightMetrics &&<div className=" flex flex-row sm:p-4 py-2  text-dtech-new-main-light text-md sm:text-xl space-x-[18px] sm:space-x-1 font-bold">
                <InsightCard className="sm:py-2 " label="Datasets" tooltip="Total number of datasets discoverable through Dtechtive" isMobile={isMobile} metrics={insightMetrics?.datasets} insightIcon="/images/datasets.svg" />
                <InsightCard className="sm:py-2" label="Data Providers" tooltip="Total number of data hosts and owners whose datasets are discoverable through Dtechtive" isMobile={isMobile} metrics={{ host: insightMetrics?.host, owner: insightMetrics?.owner }} insightIcon="/images/data_providers.svg" />
                <InsightCard className="sm:py-2" label="Metadata quality" tooltip="Average quality of dataset metadata based on the EU Metadata Quality Assessment method" isMobile={isMobile} metrics={insightMetrics?.quality} insightIcon="/images/metadata_quality.svg" />
            </div>}
            <div className="">
                {showScroll && <button
                    className={` fixed z-30 bottom-12 right-4 cursor-pointer p-2  transition-opacity  flex text-dtech-main-dark flex-row items-center text-sm whitespace-nowrap px-8 underline back-to-top-button`}
                    onClick={scrollToTop}
                >
                    <div className="">Back to Top</div>
                    <div>
                        <AiOutlineArrowUp />
                    </div>
                </button>}
            </div>
        </div>
    )
}
export default Insights;