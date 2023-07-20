import InfoIcon from "components/UI/icons/info_icon";
import StarRating from "components/UI/star_rating";

const InsightCard = ({ label, metrics, isMobile, insightIcon }: { label: string, metrics: number, isMobile: boolean, insightIcon: string }) => {
    return (
        <div className=" flex flex-col w-1/3 shadow-custom-1 m-[2px]">
            <div className=" flex flex-row px-4 justify-center items-center p-2">
                <div> {label} </div>
                <InfoIcon
                    tooltipClassName="w-60 !bg-[#C5E8E7] !text-black"
                    iconClasses="!text-dtech-new-main-light"
                    className=" w-10 "
                    title="Total number of data hosts whose datasets are discoverable through Dtechtive"
                />
            </div>
            {label === "Dataset quality" ?
                <div className="flex flex-col justify-center items-center sm:p-16 space-y-2 ">
                    <StarRating
                        starClassName={"text-dtech-new-main-light sm:h-6 sm:w-6"}
                        rating={metrics}
                    />
                    <div>{Math.floor(Math.ceil((metrics || 0) * 2) / 2)}</div>
                </div>
                :
                <div className="flex flex-col sm:flex-row justify-center items-center sm:p-16 space-y-2 sm:space-x-4">
                    <div><img src={insightIcon} width={isMobile ? 30 : 50} /></div>
                    {metrics && <div>{metrics}</div>}
                </div>
            }
        </div>
    )
}
export default InsightCard;