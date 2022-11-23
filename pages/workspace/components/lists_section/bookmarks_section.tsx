import Loader from "components/UI/loader";
import DatasetRowDisplay from "components/UI/dataset_row_display";
import { useSelector } from "react-redux";
import { RootState } from "store";

const BookmarksSection = ({ datasetIDS }: { datasetIDS: any }) => {
    const bookmarkItemsData = useSelector(
        (state: RootState) => state.user.bookmarkItemsData
    );

    if (datasetIDS.length == 0) {
        return (
            <div className="w-full flex items-center justify-center">
                <p>No datasets bookmarked here.</p>
            </div>
        );
    }

    return (
        <div>
            {bookmarkItemsData?.map((dataset: any) => (
                <div key={dataset.id}>
                    {datasetIDS.includes(dataset.id) && (
                        <DatasetRowDisplay
                            key={dataset.id}
                            dataset={dataset}
                            displayContext={"favorite-item"}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default BookmarksSection;
