import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PreviewTable from "../components/PreviewTable";
import SheetTab from "../components/SheetTab";

import React from "react";

const DatafilePreview = ({ previewData }) => {
    const [previewSheets, setPreviewSheets] = useState(["None"]);
    const [previewSummary, setPreviewSummary] = useState({
        None: { "-": { Status: "Preview Unavailable" } },
    });
    const [previewHead, setPreviewHead] = useState({
        None: { "-": { Status: "Preview Unavailable" } },
    });
    const [previewType, setPreviewType] = useState("");
    const [previewTabList, setPreviewTabList] = useState([
        { tab: "None", active: true },
    ]);
    const[isMobile, setIsMobile] = useState(false)
    const [previewActiveTab, setPreviewActiveTab] = useState("None");
    const [previewTotalBounds, setPreviewTotalBounds] = useState([
        [0, 0],
        [0, 0],
    ]);
useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
    };

    // Call handleResize on initial component render
    handleResize();

    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);
    const MapChartComponent = dynamic(() => import("./AmMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false, // This line is important. It's what prevents server-side render
    });
    const MapView = dynamic(() => import("./MapView"), {
        loading: () => <p>A map is loading</p>,
        ssr: false, // This line is important. It's what prevents server-side render
    });

    useEffect(() => {
        const onLoad = async () => {
            await setPreviewData();
        };

        onLoad();
    }, [previewData]);

    const setPreviewData = async () => {
        var loadTabList = [];
        previewData.sheets.forEach((item, idx) => {
            if (idx === 0) {
                loadTabList.push({ tab: item, active: true });
                setPreviewActiveTab(item);
            } else {
                loadTabList.push({ tab: item, active: false });
            }
        });
        setPreviewTabList(loadTabList);
        setPreviewType(previewData.type);
        setPreviewSheets(previewData.sheets);
        setPreviewTotalBounds([
            [previewData.total_bounds[1], previewData.total_bounds[0]],
            [previewData.total_bounds[3], previewData.total_bounds[2]],
        ]);
        setPreviewHead(previewData.head);
        setPreviewSummary(previewData.summary);
    };

    const setActive = (tab) => {
        const newTabList = [...previewTabList];
        newTabList.forEach((item) => {
            if (item.tab === tab) {
                item.active = true;
                setPreviewActiveTab(item.tab);
            } else {
                item.active = false;
            }
        });
        setPreviewTabList(newTabList);
    };

    const getColsRows = () => {
        const keys = Object.keys(data);
        const cols = Object.keys(data[keys[0]]);
        setColumns(cols);
        setRows(keys);
        setReady(true);
    };
    return (
        <div className="bg-white ">
            <div className=" border-t-gray-300 bg-white ">
                {/*  <SheetTab tabList={previewTabList} setActive={setActive} /> */}

                <div className="my-4 bg-white flex sm:ml-16">
                    <div className="w-full text-left">
                        <span className="text-lg font-bold">
                            Data File Sample
                        </span>
                        <div className=" text-left my-2  border-solid  ">
                            {/* <PreviewTable data={previewHead[previewActiveTab]} /> */}

                            {previewHead[previewActiveTab] && (
                                <PreviewTable
                                    data={previewHead[previewActiveTab]}
                                    id={"tableSample"}
                                />
                            )}
                        </div>
                        <div className="text-lg font-bold mt-8">
                            Data File Summary
                        </div>
                        <div className=" text-left   border-solid  ">
                            {/* <PreviewTable data={previewSummary[previewActiveTab]} /> */}

                            {previewSummary[previewActiveTab] && (
                                <PreviewTable
                                    data={previewSummary[previewActiveTab]}
                                    id={"tableSummary"}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {previewType == "GeoJSON" && (
                    <div>
                        <div className="text-lg text-left ml-16 font-bold mt-8">
                            Data File Geographic Bound
                        </div>
                        <div className="my-4  lg:ml-14">
                            {/* <MapView
                                totalBounds={previewTotalBounds}
                                id={"previewGeographic"}
                            /> */}
                            <MapChartComponent
                                totalBounds={previewTotalBounds}
                                isMobile={isMobile}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DatafilePreview;
