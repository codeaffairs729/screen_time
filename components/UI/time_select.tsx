import Table from "pages/organisation/components/table";
import { ResponsiveContainer } from "recharts";
import LineGraph from "./line_graph";
import RangeSelector from "./range_selector";

const TimeSelect = ({
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    lineChartData,
    TIME_HEADERS,
    tableDataByTime = [],
    recordDetailsType = "",
}: {
    fromDate: Date;
    setFromDate: Function;
    toDate: Date;
    setToDate: Function;
    lineChartData: any;
    TIME_HEADERS?: any;
    tableDataByTime?: any;
    recordDetailsType?: any;
}) => {
    return (
        <div className="mt-12 w-full">
            <div className="flex ml-16">
                Please select your time frame:
                <RangeSelector
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                />
            </div>
            <div className="mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                <ResponsiveContainer width="95%" height={600}>
                    <LineGraph
                        data={lineChartData}
                        height={500}
                        width={1025}
                        datakeyX={"date"}
                        datakeyY="download"
                        className=""
                    />
                </ResponsiveContainer>
                {recordDetailsType === "organisation" && (
                    <div className="mt-8">
                        <Table
                            tableHeaders={TIME_HEADERS}
                            tableData={tableDataByTime}
                            headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                            tableClass="w-[90%] text-sm text-left border table-fixed ml-12"
                            cellPadding={20}
                            tableRow="text-[17px] font-normal "
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default TimeSelect;
