import { Data } from "components/UI/result_card/index";
import CardComponent from "../card_component";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link"

const DiscoverByRegions = ({ isMobile, recommendations, isLoading }: { isMobile: boolean, recommendations: Data[], isLoading: boolean }) => {
    return (
        <div className="flex flex-col pl-6 sm:pl-[10%]  mt-10 ">
            <div className="flex flex-row sm:items-center justify-between sm:justify-start">
                <div className=" flex flex-row">
                    <div className="font-bold text-xl text-dtech-main-dark">Discover By Regions</div>
                    <div>
                        <InfoIcon
                            tooltipClassName="w-60 !bg-[#C5E8E7] !text-black"
                            iconClasses="!text-dtech-new-main-light ml-1  mr-5"
                            title="Datasets aggregated by countries"
                        />
                    </div>
                </div>
                <div className="text-sm text-dtech-new-main-light hover:bg-[#D9EFFC] focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:bg-[#FDD522] focus:bg-[#FDD522]"><Link href={"/"}>(View All)</Link></div>
            </div>
            <CardComponent discoverby="region" dataObjects={recommendations} isMobile={isMobile} isLoading={isLoading} />


        </div>
    )
}
export default DiscoverByRegions;