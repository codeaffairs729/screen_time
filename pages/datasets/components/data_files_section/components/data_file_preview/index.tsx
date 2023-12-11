import DataFilePreviewTable from "./components/components/data_file_preview_table";
import DataFilePreviewVM, {
    CSVPreviewData,
    DataFileFormatType,
    MapPreviewData,
    XLSPreviewData,
    DataFileFormat,
} from "./data_file_preview.vm";
import Loader from "components/UI/loader";
import InfoAlert from "components/UI/alerts/info_alert";
import { Transition } from "@headlessui/react";
import React from "react";
import CSVDataFilePreview from "./components/csv_data_file_preview";
import XLSDataFilePreview from "./components/xls_data_file_preview";
import MapDataFilePreview from "./components/map_data_file_preview";

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
    switch (true) {
        case DataFileFormatType.CSV.includes((vm.data as CSVPreviewData)?.type):
            previewBlock = (
                <CSVDataFilePreview data={vm.data as CSVPreviewData} />
            );
            break;
        case DataFileFormatType.EXCEL.includes(
            (vm.data as XLSPreviewData)?.type
        ):
            previewBlock = (
                <XLSDataFilePreview data={vm.data as XLSPreviewData} />
            );
            break;
        case DataFileFormatType.MAP.includes((vm.data as MapPreviewData)?.type):
            previewBlock = (
                <MapDataFilePreview data={vm.data as MapPreviewData} />
            );
            break;
    }
    return <div className="m-5 overflow-x-auto px-2">{previewBlock}</div>;
};

export default React.memo(DataFilePreview);
