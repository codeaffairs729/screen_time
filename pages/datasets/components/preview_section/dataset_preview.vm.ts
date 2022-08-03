import { useEffect } from "react";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";

interface PreviewIDItem {
    id: string;
    label: string;
}

interface PreviewData {
    datafile_id: string;
    dataset_id: number;
    sheets: string[];
    title: string;
    total_bounds: number[];
    type: string;
    url: string;
    summary: any;
    head: any;
}

const DatasetPreviewVM = (
    setPreviewDataList: (arg0: []) => void,
    setPreviewIDList: (arg0: PreviewIDItem[]) => void,
    setPreviewData: (arg0: PreviewData) => void,
    setPreviewID: (arg0: string) => void,
    datasetID: number | undefined
) => {
    useEffect(() => {
        fetchDatasetPreview();
    }, []);

    // use the API for Initial page load to get keyword, and categories.
    const { execute: executePageLoad, isLoading: isPageLoading } =
        useHttpCall();
    const fetchDatasetPreview = () => {
        executePageLoad(
            () =>
                Http.get(
                    `/v1/dataset-preview/datafiles?dataset_id=${datasetID}`
                ),
            {
                onSuccess: (res) => {
                    if (res.length > 0) {
                        setPreviewDataList(res);
                        var id_list = res.map((item: any, idx: number) => {
                            return {
                                id: item.datafile_id,
                                label: "Data file " + (idx + 1),
                            };
                        });
                        setPreviewIDList(id_list);
                        setPreviewData(res[0]);
                        setPreviewID(res[0].datafile_id);
                    }
                },
                onError: (e) =>
                    toast.error(
                        "Something went wrong while fetching preview data."
                    ),
            }
        );
    };

    return { isPageLoading };
};

export default DatasetPreviewVM;
