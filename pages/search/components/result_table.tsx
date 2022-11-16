import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import { useContext } from "react";
import { SearchVMContext } from "../search.vm";
import NoResults from "./no_results";
import TableBody from "./table_body";
import { useRouter } from "next/router";

const ResultTable = () => {
    const router = useRouter();
    const {
        query: { q },
    } = router;
    const vm = useContext(SearchVMContext);

    if (vm.error) {
        return (
            <div className="w-full flex items-start justify-center">
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching datasets. Please try again later."
                />
            </div>
        );
    }

    if (vm.isLoading) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!vm.datasets?.length) {
        return (
            <div className="w-full flex items-start justify-center">
                <NoResults
                    message={`No results found for ${q}.`}
                    subMessages={[
                        "Try Different keywords",
                        "Make sure that all words are spelled correctly.",
                        "Consider changing the filters.",
                    ]}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col" data-test-id="results table">
            <TableBody />
        </div>
    );
};

export default ResultTable;
