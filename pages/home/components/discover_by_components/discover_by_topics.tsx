import { Data } from "components/UI/result_card/index";
import CardComponent from "../card_component";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateSearchType } from "store/search/search.action";
import { SearchTypes } from "components/UI/white_label_search_bar/components/search_type_select";

const DiscoverByTopics = ({
    isMobile,
    recommendations,
    isLoading,
}: {
    isMobile: boolean;
    recommendations: Data[];
    isLoading: boolean;
}) => {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col pl-6 sm:pl-[10%] mt-10 ">
            <div className="flex flex-row sm:items-center justify-between sm:justify-start">
                <div className=" flex flex-row text-dtech-new-main-light">
                    <div className="font-bold md:text-3xl text-[16px] mb-2">
                        Discover By Topics
                    </div>
                    <div>
                        <InfoIcon
                            tooltipClassName="w-60 !bg-[#C5E8E7] !text-black"
                            iconClasses=" text-dtech-new-main-light ml-1  mr-5"
                            title="Datasets aggregated by Data Hosts"
                        />
                    </div>
                </div>
                <div className="text-sm text-[#0065BD] hover:bg-[#D9EFFC] focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:bg-[#FDD522] focus:bg-[#FDD522]">
                    <div
                        onClick={() =>
                            dispatch(updateSearchType(SearchTypes.TOPICS.value))
                        }
                    >
                        <Link href={"/search/topics?page=1"}>(View All)</Link>
                    </div>
                </div>
            </div>
            <CardComponent
                discoverby="topic"
                dataObjects={recommendations}
                isMobile={isMobile}
                isLoading={isLoading}
            />
        </div>
    );
};
export default DiscoverByTopics;
