import BarGraph from "components/UI/BarGraph";
import CalendarSelect from "components/UI/calendar_select";
import PieGraph from "components/UI/PieGraph";
import WorldMap from "components/UI/world_map";
import { LatLngExpression } from "leaflet";
import Table from "../../table";

const DownloadSection = ({ selectedLabel }: { selectedLabel: number }) => {
    const TABLE_HEADERS = ["Region", "Count", "Last used"];
    const ROW1 = [
        "Manchester",
        "London",
        "Edinburgh",
        "Bristol",
        "Manchester",
        "London",
        "Edinburgh",
        "Bristol",
    ];
    const ROW2 = ["125", "64", "87", "34", "125", "64", "87", "34"];
    const ROW3 = [
        "22 minutes ago",
        "1 day ago",
        "22 minutes ago",
        "22 minutes ago",
        "22 minutes ago",
        "1 day ago",
        "22 minutes ago",
        "22 minutes ago",
    ];
    const TIME = [
        { month: "Jan", download_per_month: 265 },
        { month: "Feb", download_per_month: 475 },
        { month: "Mar", download_per_month: 190 },
        { month: "Apr", download_per_month: 465 },
        { month: "May", download_per_month: 565 },
        { month: "Jun", download_per_month: 465 },
        { month: "Jul", download_per_month: 85 },
        { month: "Aug", download_per_month: 195 },
        { month: "Sep", download_per_month: 1225 },
        { month: "Oct", download_per_month: 165 },
        { month: "Nov", download_per_month: 365 },
        { month: "Des", download_per_month: 265 },
    ];
    const PIEDATA = [
        { name: "Data modelling", value: 400 },
        { name: "Publications", value: 300 },
        { name: "Planning", value: 200 },
        { name: "gov", value: 500 },
        { name: "Plan", value: 300 },
    ];
    // const TABLE_DATA = [ROW1, ROW2, ROW3];
    const tableData = ROW2.map((data, index) => [
        index,
        ROW1[index],
        ROW2[index],
        ROW3[index],
    ]);
    const barDataKey = "download_per_month";
    const LOCATIONS: Array<LatLngExpression> = [
        [41.8819, -87.6278],
        [45.89, -87.6279],
        [42.536457, -70.985786],
        [35.328674, -90.664658],
        [31.8819, -87.6278],
        [75.89, -87.6279],
        [52.536457, -90.985786],
        [60.328674, -90.664658],
    ];
    return (
        <div>
            {selectedLabel == 0 && (
                <div className="ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                    <div className="mt-12">
                        {/* <WorldMap locations={LOCATIONS} counts={ROW2}/> */}
                    </div>
                    <Table
                        tableHeaders={TABLE_HEADERS}
                        tableData={tableData}
                        headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                        tableClass="w-full text-sm text-left border table-fixed"
                        cellPadding={20}
                        tableRow="text-[17px] font-normal "
                    />
                </div>
            )}
            {selectedLabel == 1 && (
                <div className="ml-[-25px]">
                    <div className="flex ml-16">
                        Please select your time frame:
                        <CalendarSelect label="From" />
                        <CalendarSelect label="To" />
                    </div>
                    <BarGraph
                        data={TIME}
                        strokeWidthAxis={0.4}
                        strokeWidthLabelList={0}
                        xLabel="month"
                        showIntervalLabelX={true}
                        barDatakey={barDataKey}
                        labelListDatakey={barDataKey}
                        hideY={false}
                        height={500}
                        width={1100}
                        XleftPadding={30}
                        XrightPadding={50}
                        barColor={"#F0E2FA"}
                        cellStrokeWidth={0}
                        labelListColor={"#3F0068"}
                        barSize={100}
                        labelListPosition="insideTop"
                        labellistTopPadding={6}
                    />
                </div>
            )}
            {selectedLabel == 2 && (
                <div className="mr-24 mt-8">
                    <PieGraph data={PIEDATA} />
                </div>
            )}
        </div>
    );
};

export default DownloadSection;
