import InfoIcon from "components/UI/icons/info_icon";
import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import HomeVM from "../../home.vm";
import InsightCard from "./insight_card";

const Insights = ({ isMobile }: { isMobile: boolean }) => {
    const [metrics, setMetrics] = useState<any>()
    const [isVisible, setIsVisible] = useState(false);

    const homeVM = HomeVM()

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 0);
    };

    useEffect(() => {
        setMetrics(homeVM.fetchedMetrics)
    }, [homeVM.fetchedMetrics])
    useEffect(() => {
        homeVM.fetchHomeMetrics()
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="flex flex-col px-6 sm:pl-[10%] mt-6 sm:mt-16">
            <div className="flex flex-row sm:items-center justify-between sm:justify-start">
                <div className=" flex flex-row">
                    <div className="font-bold sm:text-xl text-md">Insights</div>
                </div>
            </div>
            <div className=" flex flex-row p-4 text-dtech-new-main-light text-md sm:text-xl font-bold">
                <InsightCard label="Datasets" isMobile={isMobile} metrics={metrics?.datasets} insightIcon="/images/insight_dataset.svg" />
                <InsightCard label="Data Providers" isMobile={isMobile} metrics={metrics?.providers} insightIcon="/images/insight_provider.svg" />
                <InsightCard label="Dataset quality" isMobile={isMobile} metrics={metrics?.quality} insightIcon="/images/insight_provider.svg" />
                <div className=" sm:flex flex-col-reverse hidden ">
                    <button
                        className={`flex text-dtech-main-dark flex-row items-center text-sm whitespace-nowrap px-8 underline back-to-top-button  ${isVisible ? 'visible' : ''}`}
                        onClick={scrollToTop}
                    >
                        <div className="hover:bg-[#D9EFFC]">Back to Top</div>
                        <div>
                            <AiOutlineArrowUp />
                        </div>
                    </button>
                </div>

            </div>
        </div>
    )
}
export default Insights;