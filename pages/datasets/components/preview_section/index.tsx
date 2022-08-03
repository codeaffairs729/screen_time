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

    // const { isPageLoading } = DatasetPreviewVM(
    //     setPreviewDataList,
    //     setPreviewIDList,
    //     setPreviewData,
    //     setPreviewID,
    //     vm.dataset?.id
    // );

    useEffect(() => {
        const getOnLoad = async () => {
            await fetch(
                `http://127.0.0.1:8085/api/datafilepreview?dataset_id=${vm.dataset?.id}`
            )
                .then((res) => {
                    return res.json();
                })
                .then((previewDataFetch) => {
                    console.log(previewDataFetch);

                    if (previewDataFetch.length > 0) {
                        setPreviewDataList(previewDataFetch);

                        var id_list = previewDataFetch.map(
                            (item: any, idx: number) => {
                                return {
                                    id: item.datafile_id,
                                    label: "Data file " + (idx + 1),
                                };
                            }
                        );
                        setPreviewIDList(id_list);
                        setPreviewData(previewDataFetch[0]);
                        setPreviewID(previewDataFetch[0].datafile_id);
                    }
                });
        };

        getOnLoad().catch(console.error);
    }, []);

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
            ) : (
                <div>No preview available.</div>
            )}
        </div>
    );
};

export default PreviewSection;

// const [previewID, setPreviewID] = useState<any>(null);
// const [previewOptions, setPreviewOptions] = useState<any>(null);

// useEffect(() => {
//     const previewOptions = vm.dataset?.urls.map((file, idx) => {
//         return {
//             id: idx,
//             label: `${
//                 file.description.replace(/['"]+/g, "")
//                     ? file.description.replace(/['"]+/g, "") + ": "
//                     : ""
//             }${file.format}, ${file.sizemb} MB`,
//             url: file.url,
//             dataset_id: vm.dataset?.id,
//             active: idx === 0 ? true : false,
//         };
//     });
//     setPreviewID(0);
//     setPreviewOptions(previewOptions);
// }, []);

// {previewID !== null && previewOptions !== null && (
//     <div>
//         <PreviewSelect
//             options={previewOptions}
//             previewID={previewID}
//             setPreviewID={setPreviewID}
//         />
//         <PreviewDataFile
//             previewID={previewID}
//             previewOptions={previewOptions}
//         />
//     </div>
// )}
