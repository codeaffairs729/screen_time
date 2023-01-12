import BarGraph from "components/UI/BarGraph";
// import CalendarSelect from "components/UI/calendar_select";
import PieGraph from "components/UI/PieGraph";
import { LatLngExpression } from "leaflet";
import Table from "../../table";
import dynamic from "next/dynamic";
import RangeSelector from "components/UI/range_selector";
import { useContext, useEffect, useState } from "react";
import Loader from "components/UI/loader";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});

const TABLE_HEADERS = ["Region", "Count", "Last used"];
const PIE_HEADER = ["name", "value"];
const TIME_HEADERS = ["Count", "Month"];

const DownloadSection = () => {
    const { selectedDownload: selectedLabel } = useContext(
        OrganisationDetailVMContext
    );
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
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

    const tableData = ROW2.map((data, index) => [
        ROW1[index],
        ROW2[index],
        ROW3[index],
    ]);
    const timeData = TIME.map((data, index) => [
        [data.download_per_month],
        [data.month + " " + "2022"],
    ]);
    const PieData = PIEDATA.map((data, index) => [[data.name], [data.value]]);
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

    const { isLoading, downloadMetrics, fectchDownloadMetrics } = useContext(
        OrganisationDetailVMContext
    );

    useEffect(() => {
        fectchDownloadMetrics();
    }, []);

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    /*TODO
        - Create data structure for the same
        - Create api for the same
        - Fetch data through api
     */
    return (
        <div>
            {selectedLabel == 0 && (
                <div className="mt-12 ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                    <WorldMap locations={LOCATIONS} counts={ROW2} />
                    <div className="mt-8">
                        <Table
                            tableHeaders={TABLE_HEADERS}
                            tableData={tableData}
                            headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                            tableClass="w-full text-sm text-left border table-fixed"
                            cellPadding={20}
                            tableRow="text-[17px] font-normal "
                        />
                    </div>
                </div>
            )}
            {selectedLabel == 1 && (
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
                        <div className="mt-8">
                            <Table
                                tableHeaders={TIME_HEADERS}
                                tableData={timeData}
                                headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                                tableClass="w-[90%] text-sm text-left border table-fixed ml-12"
                                cellPadding={20}
                                tableRow="text-[17px] font-normal "
                            />
                        </div>
                    </div>
                </div>
            )}
            {selectedLabel == 2 && (
                <div className="mr-24 mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                    <PieGraph data={PIEDATA} />
                    <Table
                        tableHeaders={PIE_HEADER}
                        tableData={PieData}
                        headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                        tableClass="w-[90%] text-sm text-left border table-fixed ml-12"
                        cellPadding={20}
                        tableRow="text-[17px] font-normal "
                    />
                </div>
            )}
        </div>
    );
};

export default DownloadSection;
