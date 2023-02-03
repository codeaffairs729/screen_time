import Loader from "components/UI/loader";
import { useContext, useEffect, useMemo } from "react";
import Table from "../../table";
import TagsCloud from "./tagCloud";
import { DateTime } from "luxon";
import { getAge } from "pages/workspace/notification.vm";
import { SearchTermType, SearchTermVMContext } from "./search_term.vm";

const TABLE_HEADERS = ["Search term", "Count", "Last used"];
const SearchTermSection = () => {
    const { searchTerms, fetchSearchTerms, isFetchingSearchTerms } =
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

    return (
        <div className="ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
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
