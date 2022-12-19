import DatasetCard from "components/UI/dataset_card";
import DatasetList from "components/UI/dataset_list";
import DatasetRow from "components/UI/dataset_row.v4";
import Dataset from "models/dataset.model.v4";
import { useContext } from "react";
import { SearchVMContext } from "../search.vm";
// import DatasetRowDisplay from "components/UI/dataset_row_display";

const TableBody = () => {
    const vm = useContext(SearchVMContext);

    if (vm.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <DatasetList
                datasets={vm.datasets}
                onFavourite={() => {}}
                handleBookmark={() => {}}
                handleShare={() => {}}
            />
        </>
    );
};

export default TableBody;
