import { useContext } from "react";
import { SearchVMContext } from "../search.vm";
import DatasetRowDisplay from "components/UI/dataset_row_display";

const TableBody = () => {
    const vm = useContext(SearchVMContext);

    if (vm.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {vm.datasets?.map((dataset, i) => (
                <DatasetRowDisplay
                    key={dataset.id}
                    dataset={dataset}
                    displayContext={"search-item"}
                />
            ))}
        </>
    );
};

export default TableBody;
