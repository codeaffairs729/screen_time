import { RecommendationItem } from "pages/home/index.page";
import CardComponent from "../card_component";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link"

const RecommendedDatasets = ({ isMobile, recommendations }: { isMobile: boolean, recommendations: RecommendationItem[] }) => {
    return (
        <div className="flex flex-col pl-6 sm:pl-[10%] mt-24 ">
            <div className="flex flex-row sm:items-center justify-between sm:justify-start">
                <div className=" flex flex-row">
                    <div className="font-bold text-xl text-dtech-main-dark">Datasets Recommended for you</div>
                    <div>
                        <InfoIcon
                            tooltipClassName="w-60 !bg-[#C5E8E7] !text-black"
                            iconClasses=" text-dtech-new-main-light ml-1  mr-5"
                            title="Datasets aggregated by topics"
                        />
                    </div>
                </div>
                <div className="text-sm text-dtech-main-dark hover:bg-[#D9EFFC] focus-within:bg-[#FDD522] focus-within:borderb--2 focus-within:border-black active:bg-[#FDD522] focus:bg-[#FDD522]"><Link href={"/"}>(View All)</Link></div>
            </div>
            <CardComponent dataObjects={recommendations} isMobile={isMobile} />
        </div>
    )
}
export default RecommendedDatasets;