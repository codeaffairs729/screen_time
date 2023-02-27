import Loader from "components/UI/loader";
import { useContext, useEffect, useMemo } from "react";
import Table from "../../table";
import TagsCloud from "./tagCloud";
import { DateTime } from "luxon";
import { getAge } from "pages/workspace/notification.vm";
import { SearchTermType, SearchTermVMContext } from "./search_term.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import InfoAlert from "components/UI/alerts/info_alert";

const TABLE_HEADERS = ["Search term", "Count", "Last used"];
const SearchTermSection = () => {
    const { searchTerms, fetchSearchTerms, isFetchingSearchTerms, error } =
        useContext(SearchTermVMContext);

    useEffect(() => {
        fetchSearchTerms();
    }, []);

    const tagsItems = useMemo(
        () => searchTerms.map((terms: SearchTermType) => terms.title),
        [searchTerms]
    );
    const tagsCount = useMemo(
        () => searchTerms.map((terms: SearchTermType) => terms.count),
        [searchTerms]
    );

    if (error) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching searchTerms data. Please try again later"
            />
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
    return (
        <div className="ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
            <div className="ml-4 my-6 text-sm text-dtech-dark-grey">
                Search terms used to discover the organisation&#39;s datasets
                are shown below as a tag cloud as well as a table.
            </div>
            {!isFetchingSearchTerms && searchTerms && searchTerms?.length ? (
                <>
                    <TagsCloud row={tagsItems} row2={tagsCount} />
                    <div className="text-sm text-dtech-dark-grey my-8 ">
                        <Table
                            tableHeaders={TABLE_HEADERS}
                            tableData={getTableData(searchTerms)}
                            headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                            tableClass="w-full text-sm text-left border table-fixed"
                            cellPadding={20}
                            tableRow="text-[17px] text-black font-normal"
                        />
                    </div>
                </>
            ) : (
                <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </div>
    );
};

const getTableData = (searchTerms: SearchTermType[]) =>
    searchTerms.map((terms: any) => {
        const date: any = DateTime.fromISO(terms["created_at"]);
        return [terms["title"], terms["count"], getAge(date.ts)];
    });

export default SearchTermSection;
