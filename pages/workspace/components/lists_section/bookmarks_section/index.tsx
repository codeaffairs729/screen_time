import { useEffect, useMemo, useState } from "react";
import DatasetBookmarksSection from "./dataset";
import OrganisationBookmarksSection from "./organisation";
import Pagination from "components/UI/pagination_for_datasets";

const BookmarksSection = ({ list }: { list: any }) => {
    const [currentPageNo, setCurrentPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const bookmarkRecords = [...list.listDatasets, ...list.listOrganisations];

    useEffect(() => {
        setTotalPages(
            Math.ceil((bookmarkRecords?.length as number) / pageSize)
        );
    }, [bookmarkRecords]);

    const currentbookmarRecords = useMemo(() => {
        if (!bookmarkRecords) return [];
        const startIndex = (currentPageNo - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return bookmarkRecords.slice(startIndex, endIndex);

    }, [currentPageNo, pageSize, bookmarkRecords]);

    const bookMarklistDatasets = useMemo(
        () =>
            currentbookmarRecords.filter(
                (record:any, index:number) => typeof record === "number"
            ),
        [currentbookmarRecords]
    );
    const bookMarklistProvider = useMemo(
        () =>
            currentbookmarRecords.filter(
                (record:any, index:number) => typeof record === "string"
            ),
        [currentbookmarRecords]
    );

    if (!list.listDatasets.length && !list.listOrganisations.length) {
        return (
            <div className="w-full flex items-center justify-center my-3">
                <p>No datasets or providers bookmarked here.</p>
            </div>
        );
    }

    return (
        <div className="mt-2">
            <DatasetBookmarksSection datasetIDS={bookMarklistDatasets} />
            <OrganisationBookmarksSection orgIDS={bookMarklistProvider} />

            <Pagination
                currentPage={currentPageNo}
                totalPages={totalPages}
                setPageNumber={setCurrentPageNo}
            />
        </div>
    );
};

export default BookmarksSection;

