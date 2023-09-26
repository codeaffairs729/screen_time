import InfoIcon from "components/UI/icons/info_icon";
import StarRating from "components/UI/star_rating";
import NumberAnimation from "./number_animation";
import clsx from "clsx";

const InsightCard = ({ className, label, tooltip, metrics, isMobile, insightIcon }: { className:string, label: string, tooltip: string, metrics: any, isMobile: boolean, insightIcon: string }) => {
    return (
        <div className={clsx(`flex flex-col h-[100px]  w-1/3 sm:h-auto shadow-custom-1 `,className)}>
            <div className=" flex flex-row  sm:px-4 justify-center items-center sm:p-2 p-1">
                <div className=" sm:text-2xl text-xs text-center "> {label} </div>
                <InfoIcon
                    tooltipClassName="max-w-sm  !bg-dtech-dark-teal "
                    iconClasses=" text-dtech-new-main-light ml-1"
                    title={tooltip}
                />
            </div>
            <div className="flex flex-col xl:flex-row justify-center items-center 2xl:px-16 sm:py-8 space-y-2 sm:space-x-4">
                {
                    label === "Datasets"
                        ?   <div><img src={insightIcon} width={isMobile ? 60 : 191} /></div>
                        :   <div><img src={insightIcon} width={isMobile ? 22 : 130} /></div>
                }
                {
                    label === "Metadata quality"
                        ? <div className="text-center text-xs sm:text-xl -mt-1">
                            <NumberAnimation targetNumber={metrics} duration={2000} />
                            <span className="font-normal">out of 5</span>
                          </div>
                        : metrics && <div>
                            {(typeof metrics == 'number')
                                ? <NumberAnimation targetNumber={metrics} duration={2000} />
                                : <div className="flex flex-col items-center text-xs sm:text-xl -mt-1">
                                    <div className=" flex flex-row items-center">
                                        <NumberAnimation targetNumber={metrics.host} duration={2000} />&nbsp;<span className="font-normal">hosts</span>
                                    </div>
                                    <div className=" flex flex-row items-center">
                                        <NumberAnimation targetNumber={metrics.owner} duration={2000} />&nbsp;<span className="font-normal">owners</span>
                                    </div>
                                </div>
                            }
                          </div>
                }
            </div>
        </div>
    )
}
export default InsightCard;