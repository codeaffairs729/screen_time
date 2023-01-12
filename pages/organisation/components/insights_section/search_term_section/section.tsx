import Loader from "components/UI/loader";
import {
    OrganisationDetailVMContext,
    SearchTermType,
} from "pages/organisation/organisation_detail.vm";
import { useContext, useEffect, useMemo } from "react";
import Table from "../../table";
import TagsCloud from "./tagCloud";

const TABLE_HEADERS = ["Search term", "Count", "Last used"];
const SearchTermSection = () => {
    const { selectedSearchTerm } = useContext(OrganisationDetailVMContext); // not required here as pagination will done on organisation vm api for search term

    const { isLoading, searchTerms, fectchSearchTerms } = useContext(
        OrganisationDetailVMContext
    );

    useEffect(() => {
        fectchSearchTerms();
    }, []);

    const tagsItems = useMemo(
        () => searchTerms.map((terms: SearchTermType) => terms.title),
        [searchTerms]
    );
    const tagsCount = useMemo(
        () => searchTerms.map((terms: SearchTermType) => terms.count),
        [searchTerms]
    );

    if (isLoading && searchTerms && !searchTerms?.length) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
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
        </div>
    );
};

const getTableData = (searchTerms: SearchTermType[]) =>
    searchTerms.map((terms: SearchTermType) => [
        terms.title,
        terms.count,
        terms.lastUsed,
    ]);

export default SearchTermSection;
