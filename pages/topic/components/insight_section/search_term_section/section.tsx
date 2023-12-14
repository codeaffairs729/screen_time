import Loader from "components/UI/loader";
import { useContext, useEffect, useMemo, useState } from "react";

// import TagCloud2 from "./tagCloud2";
import { DateTime } from "luxon";
import { getAge } from "pages/workspace/notification.vm";
import { SearchTermType, SearchTermVMContext } from "./search_term.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import dynamic from "next/dynamic";
import clsx from "clsx";

import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
// import TagCloud2 from "pages/organisation/components/insights_section/search_term_section/tagCloud2";
import Table from "pages/organisation/components/table";
import UpgradeAccountModal from "pages/organisation/components/upgrade_modal";
import { TopicDetailVMContext } from "pages/topic/topic_detail.vm";
const TagCloud2 = dynamic(
    () =>
        import(
            "pages/organisation/components/insights_section/search_term_section/tagCloud2"
        ),
    {
        loading: () => <p>A map is loading</p>,
        ssr: false, // This line is important. It's what prevents server-side render
    }
);
const TABLE_HEADERS = ["Search term", "Count", "Last used"];

const SearchTermSection = () => {
    const [transformedData, setTransformedData] = useState([]);
    const { permittedPermissions } = useContext(TopicDetailVMContext);
    const { searchTerms, fetchSearchTerms, isFetchingSearchTerms, error } =
        useContext(SearchTermVMContext);
    const {insight_searchTerm_description} = useContext(OrganisationDetailVMContext)

    useEffect(() => {
        fetchSearchTerms();
    }, []);

    if (error) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching searchTerms data. Please try again later"
            />
        );
    }
    if (isFetchingSearchTerms) {
        return (
            <div className="h-[calc(40vh-var(--nav-height))] w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }
    if (!searchTerms.length) {
        return (
            <div className=" flex flex-col-reverse sm:flex-col sm:mx-40 sm:mt-8 items-center justify-center">
                <div>
                    <img src="/images/no_data_logo.svg" width={250} />
                </div>
                <div className=" sm:my-10 text-[#727272] text-center text-xl sm:text-2xl">
                    Oops! No data available.
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="hidden sm:block text-sm text-center my-5 text-dtech-dark-grey">
              {insight_searchTerm_description}
            </div>
            <div className="sm:hidden text-xs px-2 py-2 text-center">
                Terms in the tag cloud below are gathered from the search
                queries entered by users to view datasets. Larger the size of
                the term, the higher its occurrence
            </div>
            <div className="relative">
                <div className="w-full">
                    <TagCloud2 data={tagCloudDataTable(searchTerms, "cloud")} />
                    <div className="text-sm w-full overflow-scroll text-dtech-dark-grey my-8 ">
                        <Table
                            tableHeaders={TABLE_HEADERS}
                            tableData={tagCloudDataTable(searchTerms, "table")}
                            headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                            tableClass=" text-sm border-white w-full min-w-[180%] sm:min-w-fit !px-10 text-white text-center sm:font-medium bg-[#EBEBEB] table-fixed"
                            cellPadding={20}
                            tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                        />
                    </div>
                </div>
                {!permittedPermissions.includes(
                    "topicInsights.useCases.view"
                ) && (
                    <div className=" absolute top-0 left-0 w-full h-full">
                        <div className="h-full">
                            <UpgradeAccountModal />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchTermSection;




const tagCloudDataTable = (searchTerms: SearchTermType[], label: string) => {
    const aggregatedData: any = {};
    searchTerms.forEach((item: any) => {
        const title = item.title.toLowerCase();
        if (
            !aggregatedData[title] ||
            item.lastUsed > aggregatedData[title].lastUsed
        ) {
            aggregatedData[title] = {
                title: item.title,
                count: item.count,
                lastUsed: item.lastUsed,
            };
        } else {
            aggregatedData[title].count += item.count;
        }
    });

    if (label === "table") {
        const data = Object.values(aggregatedData).map((terms: any) => {
            const date: any = DateTime.fromISO(terms["lastUsed"]);
            return [
                terms["title"].replace(/\+/g, " "),
                terms["count"],
                getAge(date.ts),
            ];
        });

        return data;
    }else{
        
        const data = Object.values(aggregatedData).map((item: any) => {
            return {
                tag: item.title.replace(/\+/g, " "),
                count: item.count,
            };
        })

        return data;
    }
};
