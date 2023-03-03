import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import { ReactNode, useContext, useEffect } from "react";
import DatasetList from "components/UI/dataset_list";
import { Tab } from "@headlessui/react";
import { RelatedDatasetsVMContext } from "./related_datasets.vm";

const TabHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                ` text-xl font-normal px-3 py-1 mx-5 ${
                    selected
                        ? "text-dtech-main-dark underline underline-offset-8 border-none"
                        : ""
                }`
            }
        >
            {children}
        </Tab>
    );
};
const RelatedDatasets = () => {
    const {
        stats,
        isLoading,
        datasetsByCategory,
        datasetsByDescription,
        errorByCategory,
        errorByDescription,
        fetchDatasetsByCategory,
        fetchDatasetsByDescription,
    } = useContext(RelatedDatasetsVMContext);

    useEffect(() => {
        fetchDatasetsByCategory();
        fetchDatasetsByDescription();
    }, []);

    if (
        isLoading
        //  ||
        // datasetsByCategory.length == 0 ||
        // datasetsByDescription.length == 0
    ) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }
    if (errorByCategory || errorByDescription) {
        return (
            <ErrorAlert
                className="m-2"
                message="Something went wrong while fetching related datasets. Please try again later"
            />
        );
    }

    return (
        <div className="flex flex-col">
            <Tab.Group>
                <Tab.List>
                    <TabHeader>Related by Domains & Topics </TabHeader>
                    <TabHeader>Related by Description</TabHeader>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className=" mt-5 h-[44rem] overflow-auto">
                            <div className="text-sm text-gray-600 w-full ml-8 mt-3">
                                Datasets displayed here share the same domains
                                and topics - this gives a broader set of related
                                datasets.
                            </div>
                            <DatasetList
                                datasets={datasetsByCategory}
                                stats={stats}
                            />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className=" mt-5 h-[44rem] overflow-auto">
                            <div className="text-sm text-gray-600 w-full ml-8 mt-3">
                                Datasets displayed here are based on the
                                semantic similarity of their title and summary -
                                this gives a narrower set of related datasets.
                            </div>
                            <DatasetList
                                datasets={datasetsByDescription}
                                stats={stats}
                            />
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default RelatedDatasets;
