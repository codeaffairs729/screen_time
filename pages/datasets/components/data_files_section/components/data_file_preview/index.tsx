import DataFilePreviewTable from "./components/components/data_file_preview_table";
import DataFilePreviewVM from "./data_file_preview.vm";
import Loader from "components/UI/loader";
import InfoAlert from "components/UI/alerts/info_alert";
import { Transition } from "@headlessui/react";
import React from "react";
import CSVDataFilePreview from "./components/csv_data_file_preview";
import XLSDataFilePreview from "./components/xls_data_file_preview";

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

    let previewBlock = (
        <InfoAlert
            message={"This data file format is unsupported"}
            className="w-100 max-w-sm mx-auto my-5"
        />
    );
    switch (vm.data?.type) {
        case "csv":
            previewBlock = <CSVDataFilePreview data={vm.data} />;
            break;
        case "xls":
            previewBlock = <XLSDataFilePreview data={vm.data} />;
            break;
    }
    return (
        <div className="m-5 overflow-x-auto px-2">
            {previewBlock}
        </div>
    );
};

export default React.memo(DataFilePreview);
