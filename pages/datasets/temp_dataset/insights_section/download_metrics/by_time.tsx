import BarGraph from "components/UI/BarGraph";
import RangeSelector from "components/UI/range_selector";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext } from "react";
const barDataKey = "download_per_month";
const timeMetrics = [
    {
        month: "Aug",
        download_per_month: 10,
    },
    {
        month: "Sep",
        download_per_month: 12,
    },
    {
        month: "Oct",
        download_per_month: 12,
    },
    {
        month: "Nov",
        download_per_month: 13,
    },
    {
        month: "Dec",
        download_per_month: 14,
    },
    {
        month: "Jan",
        download_per_month: 15,
    },
];
const ByTime = () => {
    const { fromDate, toDate, setFromDate, setToDate } = useContext(
        DatasetDetailVMContext
    );
    return (
        <div>
            <div className="flex flex-row mx-20">
                <span>Please select your time frame:</span>
                <RangeSelector
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                />
            </div>
            <div>
                <BarGraph
                    data={timeMetrics}
                    strokeWidthAxis={0.4}
                    strokeWidthLabelList={0}
                    xLabel="month"
                    showIntervalLabelX={true}
                    barDatakey={barDataKey}
                    labelListDatakey={barDataKey}
                    hideY={false}
                    height={500}
                    width={1025}
                    XleftPadding={30}
                    XrightPadding={50}
                    barColor={"#F0E2FA"}
                    cellStrokeWidth={0}
                    labelListColor={"#3F0068"}
                    barSize={100}
                    labelListPosition="insideTop"
                    labellistTopPadding={6}
                    className={"ml-[-10px]"}
                />
            </div>
        </div>
    );
};
export default ByTime;
