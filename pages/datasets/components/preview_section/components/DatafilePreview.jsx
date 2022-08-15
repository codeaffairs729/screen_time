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

    const [previewActiveTab, setPreviewActiveTab] = useState("None");
    const [previewTotalBounds, setPreviewTotalBounds] = useState([
        [0, 0],
        [0, 0],
    ]);

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
        console.log(keys, cols, ready);
        setColumns(cols);
        setRows(keys);
        setReady(true);
        // console.log(data, columns, rows)
        console.log(rows, columns, ready);
    };

    return (
        <div className="mt-6 border-t-2 border-t-gray-300">
            <SheetTab tabList={previewTabList} setActive={setActive} />

            <div className="my-8">
                <p className="text-sm font-bold mb-4 ml-5">Datafile Sample</p>
                {/* <PreviewTable data={previewHead[previewActiveTab]} /> */}
                {previewHead[previewActiveTab] && (
                    <PreviewTable
                        data={previewHead[previewActiveTab]}
                        id={"tableSample"}
                    />
                )}
            </div>

            <div className="my-8">
                <p className="text-sm font-bold mb-4 ml-5">Datafile Summary</p>

                {/* <PreviewTable data={previewSummary[previewActiveTab]} /> */}

                {previewSummary[previewActiveTab] && (
                    <PreviewTable
                        data={previewSummary[previewActiveTab]}
                        id={"tableSummary"}
                    />
                )}
            </div>

            {previewType == "GeoJSON" && (
                <div className="my-8">
                    <p className="text-sm font-bold mb-4 ml-5">
                        Datafile geographic bounds
                    </p>
                    <MapView
                        totalBounds={previewTotalBounds}
                        id={"previewGeographic"}
                    />
                </div>
            )}
        </div>
    );
};

export default DatafilePreview;
