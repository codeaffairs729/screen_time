import BarGraph from "components/UI/BarGraph";
import LineGraph from "components/UI/line_graph";
import RangeSelector from "components/UI/range_selector";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext } from "react";

const timeMetrics = [
    {
        month: "Aug",
        download: 10,
    },
    {
        month: "Sep",
        download: 12,
    },
    {
        month: "Oct",
        download: 12,
    },
    {
        month: "Nov",
        download: 13,
    },
    {
        month: "Dec",
        download: 14,
    },
    {
        month: "Jan",
        download: 15,
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
            <div className="mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                <LineGraph
                    data={timeMetrics}
                    height={500}
                    width={1025}
                    datakeyX="month"
                    datakeyY="download"
                    className=""
                />
                {/* <BarGraph
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
                /> */}
            </div>
        </div>
    );
};
export default ByTime;
