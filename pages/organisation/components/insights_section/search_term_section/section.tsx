import Loader from "components/UI/loader";
import { useContext, useEffect, useMemo, useState } from "react";
import Table from "../../table";
// import TagCloud2 from "./tagCloud2";
import { DateTime } from "luxon";
import { getAge } from "pages/workspace/notification.vm";
import { SearchTermType, SearchTermVMContext } from "./search_term.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import InfoAlert from "components/UI/alerts/info_alert";
import dynamic from "next/dynamic";
import clsx from "clsx";
const TagCloud2 = dynamic(() => import("./tagCloud2"), {
    loading: () => <p>A map is loading</p>,
    ssr: false, // This line is important. It's what prevents server-side render
});
const TABLE_HEADERS = ["Search term", "Count", "Last used"];
const SearchTermSection = () => {
    const [transformedData, setTransformedData] = useState([]);
    const { searchTerms, fetchSearchTerms, isFetchingSearchTerms, error } =
        useContext(SearchTermVMContext);

    useEffect(() => {
        fetchSearchTerms();
    }, []);

    // const tagsItems = useMemo(
    //     () => searchTerms.map((terms: SearchTermType) => terms.title),
    //     [searchTerms]
    // );
    // const tagsCount = useMemo(
    //     () => searchTerms.map((terms: SearchTermType) => terms.count),
    //     [searchTerms]
    // );
    useEffect(() =>
        transformData(searchTerms)
        , [searchTerms])

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
            <InfoAlert
                message="There is no data to show"
                className="mt-5 ml-20 mr-32"
                messageClassName="ml-56 font-semibold !text-lg !text-blue-800"
                divClassName="flex flex-row"
            />
        );
    }
    // function replacePlusWithSpace(inputArray:any) {
    //     let outputArray = inputArray.map((word:String) => word.replace(/\+/g, ' '));
    //     return outputArray;
    // }
    function transformData(inputData: any) {
        const transformedData = inputData.map((item: any) => {
            return {
                tag: item.title.replace(/\+/g, ' '), // Replace '+' with space in the title
                count: item.count
            };
        });
        setTransformedData(transformedData)
    }

    const getTableData = (searchTerms: SearchTermType[]) =>
        searchTerms.map((terms: any) => {
            const date: any = DateTime.fromISO(terms["lastUsed"]);
            return [terms["title"].replace(/\+/g, ' '), terms["count"], getAge(date.ts)];
        });

    return (
        <div className="w-full">
            <div className="hidden sm:block text-sm text-center mt-10 text-dtech-dark-grey">
                Search terms used to discover the datasets of the data provider
            </div>
            <div className="sm:hidden text-xs px-2 py-2 text-center">
                Terms in the tag cloud below are gathered from the search queries entered by users to view datasets. Larger the size of the term, the higher its occurrence
            </div>
            <TagCloud2 data={transformedData} />
            <div className="text-sm w-full text-dtech-dark-grey my-8 ">
                <Table
                    tableHeaders={TABLE_HEADERS}
                    tableData={getTableData(searchTerms)}
                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    tableClass=" text-sm border-white w-full min-w-[180%] sm:min-w-fit !px-10 text-white text-center sm:font-medium bg-[#EBEBEB] table-fixed"
                    cellPadding={20}
                    tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                />
            </div>
        </div>
    );
};



export default SearchTermSection;
