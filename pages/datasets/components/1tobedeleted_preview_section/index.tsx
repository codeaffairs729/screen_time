import { DatasetDetailVMContext } from "../../dataset_detail.vm";
import { useContext, useState, useEffect } from "react";
import PreviewSelect from "./components/PreviewSelect";
import DatafilePreview from "./components/DatafilePreview";
import DatasetPreviewVM from "./dataset_preview.vm";
import Loader from "components/UI/loader";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import TabHeader from "components/UI/tabbed/header";
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
        <div className="bg-white">
            {previewData && previewIDList && previewID && previewDataList ? (
                <div>
                    {/* <PreviewSelect
                        options={previewIDList}
                        previewID={previewID}
                        handleChangePreviewID={handleChangePreviewID}
                    /> */}

                    <Tab.Group>
                        {previewIDList.length > 1 && (
                            <div className="">
                                <Tab.List className="flex min-w-[15rem] items-center px-6 w-[70vw] ">
                                    <div className="cursor-pointer py-1 px-4 text-fuchsia-900 text-xl ">
                                        <BsChevronLeft />
                                    </div>
                                    {previewIDList?.map(
                                        (list: any, idx: any) => (
                                            <TabHeader
                                                key={idx}
                                                className="underline-offset-4"
                                            >
                                                Tab {idx + 1}
                                            </TabHeader>
                                        )
                                    )}
                                    <div className="cursor-pointer py-1 px-4 text-fuchsia-900 text-xl">
                                        <BsChevronRight />
                                    </div>
                                </Tab.List>
                            </div>
                        )}
                        <Tab.Panels className="w-full flex bg-white">
                            {previewDataList?.map((list: any, idx: any) => (
                                <TabPanel
                                    key={idx}
                                    className="!bg-white"
                                >
                                    <DatafilePreview previewData={list} />
                                </TabPanel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            ) : isPageLoading ? (
                <div className="text-center py-10">
                    <Loader />
                </div>
            ) : (
                <div className="text-center py-10">No preview available.</div>
            )}
        </div>
    );
};

export default PreviewSection;
