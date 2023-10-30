import DataFilePreviewTable from "./components/data_file_preview_table";
import DataFilePreviewVM from "./data_file_preview.vm";
import Loader from "components/UI/loader";
import InfoAlert from "components/UI/alerts/info_alert";
import { Transition } from "@headlessui/react";
import React from "react";

const DataFilePreview = ({ dataFileId }: { dataFileId: number }) => {
    const vm = DataFilePreviewVM(dataFileId);

    if (vm.error) {
        return (
            <InfoAlert
                message={vm.error}
                className="w-100 max-w-sm mx-auto my-5"
            />
        );
    }

    if (vm.isLoading || !vm.data) {
        return (
            <div className="text-center py-10">
                <Loader />
            </div>
        );
    }

    switch (vm.data?.type) {
        case "csv":
            return (
                <div className="m-5 overflow-x-auto px-2">
                    <h4 className="font-semibold text-gray-700 text-xl mb-1.5">
                        Data File Sample
                    </h4>
                    <DataFilePreviewTable
                        index={vm.data?.head?.index}
                        className="mb-10"
                        columns={["", ...vm.data?.head?.columns]}
                        data={vm.data?.head?.data}
                    />
                    <h4 className="font-semibold text-gray-700 text-xl mb-1.5">
                        Data File Summary
                    </h4>
                    <DataFilePreviewTable
                        index={vm.data?.describe?.index}
                        className="mb-2"
                        columns={["", ...vm.data?.describe?.columns]}
                        data={vm.data?.describe?.data}
                    />
                </div>
            );
            break;
        default:
            return (
                <InfoAlert
                    message={"This data file format is unsupported"}
                    className="w-100 max-w-sm mx-auto my-5"
                />
            );
            break;
    }
};

export default React.memo(DataFilePreview);
