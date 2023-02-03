import DatasetBookmarksSection from "./dataset";
import OrganisationBookmarksSection from "./organisation";

const BookmarksSection = ({ list }: { list: any }) => {
    if (!list.listDatasets.length && !list.listOrganisations.length) {
        return (
            <div className="w-full flex items-center justify-center">
                <p>No datasets or organisations bookmarked here.</p>
            </div>
        );
    }

    return (
        <div>
            <DatasetBookmarksSection datasetIDS={list.listDatasets} />
            <OrganisationBookmarksSection orgIDS={list.listOrganisations} />
        </div>
    );
};

export default BookmarksSection;
