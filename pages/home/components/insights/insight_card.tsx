import InfoIcon from "components/UI/icons/info_icon";
import StarRating from "components/UI/star_rating";
import NumberAnimation from "./number_animation";
import clsx from "clsx";

const InsightCard = ({ className, label, tooltip, metrics, isMobile, insightIcon }: { className: string, label: string, tooltip: string, metrics: any, isMobile: boolean, insightIcon: string }) => {
    return (
        <div className={clsx(`flex flex-col h-[100px] w-[100px] sm:h-[227px]  sm:w-[305px] md:shadow-custom-5 shadow-md md:rounded-[10px] rounded-[2px] `, className)}>
            <div className=" flex flex-row  sm:px-4 justify-center items-center sm:p-2 p-1">
                <div className=" md:text-[22px] sm:text-sm text-xs text-center "> {label} </div>
                <InfoIcon
                    tooltipClassName="max-w-sm  !bg-dtech-dark-teal "
                    iconClasses=" text-dtech-new-main-light ml-1"
                    title={tooltip}
                />
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center 2xl:px-16 lg:py-8 space-y-2 lg:space-x-4 lg:px-4">
                <div className=" md:w-[60%]">

                    {
                        label === "Datasets"
                            ? <div><img src={insightIcon} width={isMobile ? 18 : 191} /></div>
                            : insightIcon.length > 0
                                ? <div><img src={insightIcon} width={isMobile ? 25 : 120} className="xl:ml-4 2xl:ml-1" /></div>
                                : <div className="mt-3"><StarRating rating={metrics} /></div>

                    }
                </div>
                <div className="md:w-[40%]">

                    {
                        label === "Metadata quality"
                            ? <div className="text-center flex lg:flex-col items-center lg:items-start text-xs sm:text-xl -mt-1 space-x-1">
                                <div className=" max-w-min lg:ml-6">
                                    <NumberAnimation targetNumber={metrics} duration={2000} />
                                </div>
                                <span className="font-normal sm:text-[16px] text-[12px]">out of 5</span>
                            </div>
                            : metrics && <div>
                                {(typeof metrics == 'number')
                                    ? <NumberAnimation targetNumber={metrics} duration={2000} />
                                    : <div className="flex flex-col items-center lg:items-start  text-xs sm:text-[24px] -mt-1 md:space-y-3 sm:space-y-2">
                                        <div className=" flex flex-row  items-center">
                                            <NumberAnimation targetNumber={metrics.host} duration={2000} />&nbsp;<span className="font-normal sm:text-[16px] text-[12px]">hosts</span>
                                        </div>
                                        <div className=" flex flex-row items-center">
                                            <NumberAnimation targetNumber={metrics.owner} duration={2000} />&nbsp;<span className="font-normal sm:text-[16px] text-[12px]">owners</span>
                                        </div>
                                    </div>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default InsightCard;