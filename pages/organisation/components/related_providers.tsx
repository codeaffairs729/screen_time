import { RecommendationItem } from "pages/home/index.page";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link"
import CardComponent from "pages/home/components/card_component";

const RelatedProviders = ({ isMobile, recommendations }: { isMobile: boolean, recommendations: RecommendationItem[] }) => {
    return (
        <div className="flex flex-col pl-6 sm:pl-4  mt-10 ">
            <div className="flex flex-row sm:items-center justify-between sm:justify-start">
                <div className=" flex flex-row">
                    <div className="font-bold text-xl text-dtech-main-dark">Related Data Providers</div>
                    <div>
                        <InfoIcon
                            tooltipClassName="w-60 !bg-[#C5E8E7] !text-black"
                            iconClasses="!text-dtech-new-main-light ml-1  mr-5"
                            title="Datasets aggregated by countries"
                        />
                    </div>
                </div>
                <div className="text-sm text-dtech-new-main-light hover:bg-[#D9EFFC] focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:bg-[#FDD522] focus:bg-[#FDD522]"><Link href={"/search/organisation?page=1"}>(View All)</Link></div>
            </div>
            {recommendations.length > 0
                ?
                <CardComponent dataObjects={recommendations} isMobile={isMobile} />
                :
                <div className=" h-40 w-full text-center mx-auto my-[5%]">
                    No data to show
                </div>
            }


        </div>
    )
}
export default RelatedProviders;