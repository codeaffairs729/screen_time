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
        <div className="flex flex-col pl-6 sm:px-[10%] mt-6 sm:mt-16 ">
            <div className="flex flex-row sm:items-center justify-between sm:justify-start">
                <div className=" flex flex-row">
                    <div className="font-bold text-[16px] md:text-3xl text-md text-dtech-new-main-light">Insights</div>
                </div>
            </div>
            {insightMetrics && <div className=" hidden sm:flex flex-row md:pb-20 md:pt-12 md:px-12  py-2  text-dtech-new-main-light text-md sm:text-xl md:space-x-[38px] space-x-4  justify-between font-bold">
                <InsightCard className="sm:py-2 hover:bg-[#FAFAFA]" label="Datasets" tooltip="Total number of datasets discoverable through Dtechtive" isMobile={isMobile} metrics={insightMetrics?.datasets} insightIcon="/images/datasets.svg" />
                <InsightCard className="sm:py-2 hover:bg-[#FAFAFA]" label="Data Providers" tooltip="Total number of data hosts and owners whose datasets are discoverable through Dtechtive" isMobile={isMobile} metrics={{ host: insightMetrics?.host, owner: insightMetrics?.owner }} insightIcon="/images/data_providers.svg" />
                <InsightCard className="sm:py-2 hover:bg-[#FAFAFA]" label="Metadata quality" tooltip="Average quality of dataset metadata based on the EU Metadata Quality Assessment method" isMobile={isMobile} metrics={insightMetrics?.quality} insightIcon="/images/metadata_quality.svg" />
            </div>}
            {insightMetrics && <div className=" sm:hidden flex flex-row  pr-6 py-2  text-dtech-new-main-light text-md sm:text-xl space-x-2 justify-between font-bold">
                <InsightCard className="sm:py-2 hover:bg-[#FAFAFA]" label="Datasets" tooltip="Total number of datasets discoverable through Dtechtive" isMobile={isMobile} metrics={insightMetrics?.datasets} insightIcon="/images/datasets_for_mobile.svg" />
                <InsightCard className="sm:py-2 hover:bg-[#FAFAFA]" label="Data Providers" tooltip="Total number of data hosts and owners whose datasets are discoverable through Dtechtive" isMobile={isMobile} metrics={{ host: insightMetrics?.host, owner: insightMetrics?.owner }} insightIcon="/images/data_providers_for_mobile.svg" />
                <InsightCard className="sm:py-2 hover:bg-[#FAFAFA]" label="Metadata quality" tooltip="Average quality of dataset metadata based on the EU Metadata Quality Assessment method" isMobile={isMobile} metrics={insightMetrics?.quality} insightIcon="" />
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