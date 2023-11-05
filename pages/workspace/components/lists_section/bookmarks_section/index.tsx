import { useEffect, useMemo, useState } from "react";
import DatasetBookmarksSection from "./dataset";
import OrganisationBookmarksSection from "./organisation";
import Pagination from "components/UI/pagination_for_datasets";
import TopicBookmarksSection from "./topic";

const BookmarksSection = ({ list }: { list: any }) => {
    const [currentPageNo, setCurrentPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const bookmarkRecords = [
        { bookmarkType: "dataset",bookmarkList: [...list.listDatasets] },
        { bookmarkType: "provider",bookmarkList: [...list.listOrganisations] },
        { bookmarkType: "topic",bookmarkList: [...list.listTopics] },
    ];

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
                (record: any, index: number) => record.bookmarkType === "dataset"
            ).map((record: any, index: number)=> record.bookmarkList),
        [currentbookmarRecords]
    );
    const bookMarklistProvider = useMemo(
        () =>
        currentbookmarRecords.filter(
            (record: any, index: number) => record.bookmarkType === "provider"
        ).map((record: any, index: number)=> record.bookmarkList),
        [currentbookmarRecords]
    );

    const bookMarklistTopic = useMemo(
        () =>
        currentbookmarRecords.filter(
            (record: any, index: number) => record.bookmarkType === "topic"
        ).map((record: any, index: number)=> record.bookmarkList),
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
            <DatasetBookmarksSection datasetIDS={[...bookMarklistDatasets.flat()]} />
            <OrganisationBookmarksSection orgIDS={[...bookMarklistProvider.flat()]} />
            <TopicBookmarksSection topicIDS={[...bookMarklistTopic.flat()]} />

            <Pagination
                currentPage={currentPageNo}
                totalPages={totalPages}
                setPageNumber={setCurrentPageNo}
            />
        </div>
    );
};

export default BookmarksSection;
