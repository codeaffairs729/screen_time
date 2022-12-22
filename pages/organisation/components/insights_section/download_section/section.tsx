import BarGraph from "components/UI/BarGraph";
import PieGraph from "components/UI/PieGraph";
import WorldMap from "components/UI/world_map";
import Table from "../../table";

const DownloadSection = ({ selectedLabel }: { selectedLabel: string }) => {
    const TABLE_HEADERS = ["Region", "Count", "Last used"];
    const ROW1 = ["Manchester", "London", "Edinburgh", "Bristol"];
    const ROW2 = ["125", "64", "87", "34"];
    const ROW3 = [
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
    ];
    // const TABLE_DATA = [ROW1, ROW2, ROW3];
    const tableData = ROW2.map((data, index) => [
        index,
        ROW1[index],
        ROW2[index],
        ROW3[index],
    ]);
    const barDataKey = "download_per_month";
    const labelListDatakey = "month";
    return (
        <div>
            {selectedLabel.toLowerCase() == "by region" && (
                <div className="ml-8 mr-24">
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
            {selectedLabel.toLowerCase() == "by time" && (
                <div className="ml-[-25px]">
                    <div className="my-44">{/* <WorldMap /> */}</div>
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
                    />
                </div>
            )}
            {selectedLabel.toLowerCase() == "by user type" && (
                <div className="ml-[-50px] mr-24 mt-8">
                    <PieGraph data={PIEDATA} />
                </div>
            )}
        </div>
    );
};

export default DownloadSection;
