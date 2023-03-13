import clsx from "clsx";
import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import ResultCard, { Data } from "components/UI/result_card";
import { useRouter } from "next/router";
import NoResults from "./no_results";

type ResultLayoutProps = {
    error: any;
    isLoading: boolean;
    recordsData: Data[];
    className?: string;
};

const ResultLayout = ({ error, isLoading, recordsData, className="" }: ResultLayoutProps) => {
    const router = useRouter();
    const {
        query: { q },
    } = router;

    if (error) {
        return (
            <div className="w-full flex items-start justify-center">
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching data. Please try again later."
                />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!recordsData?.length) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))] w-full flex items-start justify-center ">
                <NoResults
                    message={`No results found for ${q}.`}
                    subMessages={[
                        "Try different keywords.",
                        "Make sure that all words are spelled correctly.",
                    ]}
                />
            </div>
        );
    }

    return (
        <div className={clsx("flex flex-col -mt-[18px]", className)} data-test-id="results table">
            {recordsData.map((data: Data) => (
                <ResultCard key={data.id} data={data} />
            ))}
        </div>
    );
};

export default ResultLayout;
