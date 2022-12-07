import Pagination from "components/UI/pagination";
import { useContext } from "react";
import { SearchVMContext } from "../search.vm";

const SearchPagination = () => {
    const vm = useContext(SearchVMContext);

    return (
        <Pagination
            currentPageNo={vm.currentPageNo}
            setCurrentPageNo={vm.setCurrentPageNo}
            totalPages={vm.totalPages}
        />
    );
};

export default SearchPagination;
