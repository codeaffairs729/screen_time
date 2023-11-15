import { RecommendationItem } from "pages/home/index.page";
import CardComponent from "../card_component";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateSearchType } from "store/search/search.action";
import { SearchTypes } from "components/UI/white_label_search_bar/components/search_type_select";
import { Data } from "components/UI/result_card/index";
import DiscoverVM from "./discover.vm";

const DiscoverByDataProviders = ({ isMobile, recommendations,isLoading }: { isMobile: boolean, recommendations: Data[],isLoading:boolean }) => {
    const dispatch = useDispatch()
    const discoverVM = DiscoverVM()

    return (
        <div className="flex flex-col pl-6 sm:pl-[10%]  mt-10 ">
            <div className="flex flex-row sm:items-center justify-between sm:justify-start">
                <div className=" flex flex-row text-dtech-new-main-light">
                    <div className="font-bold md:text-3xl text-[16px] mb-2">Discover By Data Providers</div>
                    <div>
                        <InfoIcon
                            tooltipClassName="w-60 !bg-[#C5E8E7] !text-black"
                            iconClasses=" text-dtech-new-main-light ml-1  mr-5"
                            title="Datasets aggregated by Data Hosts"
                        />
                    </div>
                </div>
                <div className="text-sm h-fit text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black  "><div onClick={() => dispatch(updateSearchType(SearchTypes.ORGANISATION.value))}><Link href={"/search/organisation?page=1"}>(View All)</Link></div></div>
            </div>
            <CardComponent discoverby="provider" dataObjects={recommendations} isMobile={isMobile} isLoading={isLoading}/>
        </div>
    )
}
export default DiscoverByDataProviders;