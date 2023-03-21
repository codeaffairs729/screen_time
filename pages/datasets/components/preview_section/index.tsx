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
        <div className="bg-dtech-main-light">
            {previewData && previewIDList && previewID && previewDataList ? (
                <div>
                    {/* <PreviewSelect
                        options={previewIDList}
                        previewID={previewID}
                        handleChangePreviewID={handleChangePreviewID}
                    /> */}

                    <Tab.Group>
                        <Tab.Panels className="w-full flex bg-dtech-main-light">
                            {previewDataList?.map((list: any, idx: any) => (
                                <TabPanel
                                    key={idx}
                                    className="bg-dtech-main-light"
                                >
                                    <DatafilePreview previewData={list} />
                                </TabPanel>
                            ))}
                        </Tab.Panels>
                        <div className="">
                            <Tab.List className="flex min-w-[15rem] items-center px-6 w-[70vw] ">
                                <div className="cursor-pointer py-1 px-4 ">
                                    <BsChevronLeft />
                                </div>
                                {previewIDList?.map((list: any, idx: any) => (
                                    <TabHeader key={idx} className="">
                                        Tab {idx + 1}
                                    </TabHeader>
                                ))}
                                <div className="cursor-pointer py-1 px-4">
                                    <BsChevronRight />
                                </div>
                            </Tab.List>
                        </div>
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
