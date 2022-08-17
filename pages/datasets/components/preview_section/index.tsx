import { DatasetDetailVMContext } from "../../dataset_detail.vm";
import { useContext, useState, useEffect } from "react";
import PreviewSelect from "./components/PreviewSelect";
import DatafilePreview from "./components/DatafilePreview";
import DatasetPreviewVM from "./dataset_preview.vm";

const PreviewSection = () => {
    const vm = useContext(DatasetDetailVMContext);
    const [previewDataList, setPreviewDataList] = useState<any>(null);
    const [previewID, setPreviewID] = useState<any>(null);
    const [previewIDList, setPreviewIDList] = useState<any>(null);
    const [previewData, setPreviewData] = useState<any>(null);

    const { isPageLoading } = DatasetPreviewVM(
        setPreviewDataList,
        setPreviewIDList,
        setPreviewData,
        setPreviewID,
        vm.dataset?.id
    );

    const handleChangePreviewID = (newID: Number) => {
        console.log(newID);
        setPreviewID(newID);
        if (previewDataList.length > 0) {
            const idx = previewDataList.findIndex(
                (item: any) => item.datafile_id === newID
            );

            if (idx !== -1) {
                setPreviewData(previewDataList[idx]);
            }
        }
    };

    return (
        <div className="p-3">
            {previewData && previewIDList && previewID && previewDataList ? (
                <div>
                    <PreviewSelect
                        options={previewIDList}
                        previewID={previewID}
                        handleChangePreviewID={handleChangePreviewID}
                    />
                    <DatafilePreview previewData={previewData} />
                </div>
            ) : isPageLoading ? (
                <div>Preview data is loading...</div>
            ) : (
                <div>No preview available.</div>
            )}
        </div>
    );
};

export default PreviewSection;