import DatasetBookmarksSection from "./dataset";
import OrganisationBookmarksSection from "./organisation";

const BookmarksSection = ({ list }: { list: any }) => {
    if (!list.listDatasets.length && !list.listOrganisations.length) {
        return (
            <div className="w-full flex items-center justify-center my-3">
                <p>No datasets or organisations bookmarked here.</p>
                <p>No datasets or providers bookmarked here.</p>
            </div>
        );
    }

    return (
        <div className="mt-2">
            <DatasetBookmarksSection datasetIDS={list.listDatasets} />
            <OrganisationBookmarksSection orgIDS={list.listOrganisations} />
        </div>
    );
};

export default BookmarksSection;
