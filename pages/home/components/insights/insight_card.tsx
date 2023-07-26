import InfoIcon from "components/UI/icons/info_icon";
import StarRating from "components/UI/star_rating";
import NumberAnimation from "./number_animation";

const InsightCard = ({ label, tooltip, metrics, isMobile, insightIcon }: { label: string, tooltip: string, metrics: any, isMobile: boolean, insightIcon: string }) => {
    return (
        <div className=" flex flex-col w-1/3 shadow-custom-1 m-[2px]">
            <div className=" flex flex-row px-4 justify-center items-center p-2">
                <div className=" sm:text-2xl text-lg"> {label} </div>
                <InfoIcon
                    tooltipClassName="w-60 !bg-[#C5E8E7] !text-black"
                    iconClasses=" text-dtech-new-main-light ml-1  mr-5"
                    title={tooltip}
                />
            </div>
            {label === "Metadata quality" ?
                <div className="flex flex-col justify-center items-center sm:px-16 sm:py-8 space-y-2 ">
                    <div><NumberAnimation targetNumber={Math.floor(Math.ceil((metrics || 0) * 2) / 2)} duration={2000} /></div>
                    <StarRating
                        starClassName={"text-dtech-new-main-light sm:h-6 sm:w-6"}
                        rating={Math.floor(Math.ceil((metrics || 0) * 2) / 2)}
                    />
                </div>
                :
                <div className="flex flex-col sm:flex-row justify-center items-center  sm:px-16 sm:py-8 space-y-2 sm:space-x-4">
                    <div><img src={insightIcon} width={isMobile ? 30 : 50} /></div>
                    {metrics && <div>{(typeof metrics == 'number') ? <NumberAnimation targetNumber={metrics} duration={2000} /> : <div className="flex flex-col items-center"><div className=" flex flex-row items-center">HOSTS&nbsp;<NumberAnimation targetNumber={metrics.host} duration={2000} /></div><div className=" flex flex-row items-center">OWNERS&nbsp;<NumberAnimation targetNumber={metrics.owner} duration={2000} /></div></div>}</div>}
                </div>
            }
        </div>
    )
}
export default InsightCard;