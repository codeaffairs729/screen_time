import { useContext, useMemo } from "react";
import { ReportVMContext, getAge, getRegion, getRegionTableData, getTableData, getUseCaseData, getfilteredData, graphDataVal, sortAndAggregate } from "../report.vm";
import BarChart from "./components/bar_graph";
import TagCloud2 from "../../insights_section/search_term_section/tagCloud2";
import Table from "../../table";
import MapChartComponent from "./components/map_chart";
import PieChartComponent from "./components/pie_Chart";
import { useIsMobile } from "common/hooks";
import { SearchTermType } from "../../insights_section/search_term_section/search_term.vm";
import { DateTime } from "luxon";


interface RatingObject {
    [key: number]: number;
}

const byTimetitles = {
    yAxis: "Downloads",
    xAxis: "Months",
};

const titles = {
    yAxis: "Percentage of datasets",
    xAxis: "Score",
};

const TIME_HEADERS = ["Count", "Month"];
const PIE_HEADER = ["name", "value"];
const LOCATION_HEADERS = ["Region", "Count", "Last used"];
const SEARCH_TERM_HEADERS = ["Search term", "Count", "Last used"];


const ReportData = () =>{
    const { isMobile } = useIsMobile();
    const {
        loading,
        fromDate,
        toDate,
        downloadByTime = [],
        downloadByRole = [],
        downloadByLocation = [],
        searchTerms,
        qualityMetrics,
        useCases,
        transformedData,
    } = useContext(ReportVMContext);

    const items = qualityMetrics?.dataFileQuality;

    const dates = useMemo(
        () => getfilteredData(downloadByTime, fromDate, toDate),
        [downloadByTime]
    );

    const graphData = useMemo(
        () => graphDataVal(downloadByTime, fromDate, toDate),
        [downloadByTime]
    );

    const tableDataByTime = useMemo(
        () => getTableData(fromDate, toDate, dates),
        [dates]
    );

    const chartData = useMemo(
        () =>
            downloadByRole.map((data: any) => ({
                category: data.name,
                value: data.value,
            })),
        [downloadByRole]
    );
    const pieData = useMemo(
        () => downloadByRole.map((data: any) => [data.name, data.value]),
        [downloadByRole]
    );

    const regions = useMemo(
        () => getRegion(downloadByLocation),
        [downloadByLocation]
    );

    const tableData = useMemo(
        () => getRegionTableData(downloadByLocation),
        [downloadByLocation]
    );

    const useCaseData = useMemo(() => getUseCaseData(useCases), [useCases]);

    const qualityMetricsRatingData = useMemo(
        () =>
            calculateRatingPercentages([
                {
                    "0": 1,
                },
                {
                    "0.5": 0,
                },
                {
                    "1": 0,
                },
                {
                    "1.5": 0,
                },
                {
                    "2": 0,
                },
                {
                    "2.5": 0,
                },
                {
                    "3": 2,
                },
                {
                    "3.5": 0,
                },
                {
                    "4": 3,
                },
                {
                    "4.5": 0,
                },
                {
                    "5": 2,
                },
            ]),
        []
    );

    const sortUseCaseData = useMemo(
        () => sortAndAggregate(useCases),
        [useCases]
    );
    return(
        <div className=" h-[56rem] overflow-y-scroll no-scrollbar whitespace-nowrap absolute">
        {items && (
            <div
                className="flex fixed justify-center items-center flex-col z-[-10] w-full"
                id="qualityMetrics"
            >
                <BarChart
                    data={qualityMetricsRatingData}
                    isMobile={isMobile}
                    titles={titles}
                    divID="qualityMetricsDiv"
                />
            </div>
        )}
        {searchTerms.length > 0 && (
            <div
                className="flex fixed justify-center items-center flex-col z-[-10] w-full "
                id="searchTerms"
            >
                <TagCloud2 data={transformedData} />
                <div className="text-sm w-full overflow-scroll text-dtech-dark-grey my-8 ">
                    <Table
                        tableHeaders={SEARCH_TERM_HEADERS}
                        tableData={getTableDataForSearchTerms(
                            searchTerms
                        )}
                        headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                        tableClass=" text-sm border-white w-full min-w-[180%] sm:min-w-fit !px-10 text-white text-center sm:font-medium bg-[#EBEBEB] table-fixed"
                        cellPadding={20}
                        tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                    />
                </div>
            </div>
        )}
        {downloadByLocation.length > 0 && (
            <div
                id="map"
                className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10"
            >
                <div className="mt-8">
                    <MapChartComponent
                        regions={regions}
                        isMobile={isMobile}
                    />
                    <Table
                        tableHeaders={LOCATION_HEADERS}
                        tableData={tableData}
                        headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                        tableClass=" text-sm border-white w-full min-w-[180%] sm:min-w-fit !px-10 text-white text-center sm:font-medium bg-[#EBEBEB] table-fixed"
                        cellPadding={20}
                        tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                    />
                </div>
            </div>
        )}
        {downloadByTime.length > 0 && (
            <div
                id="screenshot"
                className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10"
            >
                <BarChart
                    data={graphData}
                    isMobile={isMobile}
                    titles={byTimetitles}
                    divID="downloadByTimeID"
                />
                <Table
                    tableHeaders={TIME_HEADERS}
                    tableData={tableDataByTime}
                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    tableClass=" text-sm border-white w-full min-w-[180%] sm:min-w-fit !px-10 text-white text-center sm:font-medium bg-[#EBEBEB] table-fixed"
                    cellPadding={20}
                    tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                />
            </div>
        )}
        {downloadByRole.length > 0 && (
            <div
                id="pie"
                className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10"
            >
                <PieChartComponent
                    chartData={chartData}
                    isMobile={isMobile}
                    divID={"downloadByRoleID"}
                />

                <Table
                    tableHeaders={PIE_HEADER}
                    tableData={pieData}
                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    tableClass=" text-sm border-white w-full !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                    cellPadding={20}
                    showDots={false}
                    tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                />
            </div>
        )}
        {useCases.length > 0 && (
            <div
                id="useCases"
                className="flex fixed justify-center items-center flex-col z-[-10] w-full"
            >
                <PieChartComponent
                    isMobile={isMobile}
                    chartData={sortUseCaseData}
                    divID={"useCasesId"}
                />

                <Table
                    tableHeaders={["Use case", "value"]}
                    tableData={useCaseData}
                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    tableClass=" text-sm border-white w-full !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                    cellPadding={20}
                    showDots={false}
                    tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                />
            </div>
        )}
    </div>
    )
}
export default ReportData;




function calculateRatingPercentages(ratings: RatingObject[]): RatingObject[] {
    let totalSum = 0;
    let totalCount = 0;

    ratings?.forEach((ratingObj) => {
        const [ratingValue, count] = Object.entries(ratingObj)[0];
        totalSum += Number(ratingValue) * count;
        totalCount += count;
    });

    const ratingPercentages: RatingObject[] = ratings?.map((ratingObj) => {
        const [ratingValue, count] = Object.entries(ratingObj)[0];
        const percentage = (count / totalCount) * 100;
        return { [ratingValue]: percentage };
    });

    return ratingPercentages;
}


const getTableDataForSearchTerms = (searchTerms: SearchTermType[]) =>
    searchTerms.map((terms: any) => {
        const date: any = DateTime.fromISO(terms["lastUsed"]);
        return [
            terms["title"].replace(/\+/g, " "),
            terms["count"],
            getAge(date.ts),
        ];
    });
