import { useContext, useEffect, useMemo, useState } from "react";
import {
    ReportVMContext,
    getAge,
    getRegion,
    getRegionTableData,
    getTableData,
    getUseCaseData,
    getfilteredData,
    graphDataVal,
    sortAndAggregate,
} from "../report.vm";
import BarChart from "./components/bar_graph";
import Table from "../../table";
import MapChartComponent from "./components/map_chart";
import PieChartComponent from "./components/pie_Chart";
import { useIsMobile } from "common/hooks";
import { SearchTermType } from "../../insights_section/search_term_section/search_term.vm";
import { DateTime } from "luxon";
import ReportTagCloud from "./components/tag_cloud";
import { QualityMetricVMContext } from "../../../components/insights_section/quality_insights/quality_metric.vm";

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

const ReportData = () => {
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
    const [updatedData, setUpdatedData] = useState([]);

    const downloadByTimeData = () => {
        let newData: any = [];
        let dataLength = tableDataByTime.length;

        for (let i = 0; i < dataLength; i += 20) {
            newData.push(tableDataByTime.slice(i, i + 20));
        }

        setUpdatedData(newData);
    };

    useEffect(() => {
        downloadByTimeData();
    }, [downloadByTime]);
    const {
        // qualityMetrics,
        selectedQualityInsights: selectedLabel,
    } = useContext(QualityMetricVMContext);

    const {
        dataFileQuality = {},
        metaFileQuality = {},
        totalMatches,
    } = qualityMetrics || {};
    const items = selectedLabel == 0 ? dataFileQuality : metaFileQuality;

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

    // const qualityMetricsRatingData = useMemo(
    //     () =>
    //         calculateRatingPercentages([
    //             {
    //                 "0": 1,
    //             },
    //             {
    //                 "0.5": 0,
    //             },
    //             {
    //                 "1": 0,
    //             },
    //             {
    //                 "1.5": 0,
    //             },
    //             {
    //                 "2": 0,
    //             },
    //             {
    //                 "2.5": 0,
    //             },
    //             {
    //                 "3": 2,
    //             },
    //             {
    //                 "3.5": 0,
    //             },
    //             {
    //                 "4": 3,
    //             },
    //             {
    //                 "4.5": 0,
    //             },
    //             {
    //                 "5": 2,
    //             },
    //         ]),
    //     []
    // );

    const sortUseCaseData = useMemo(
        () => sortAndAggregate(useCases),
        [useCases]
    );
    return (
        <div className=" h-[56rem] overflow-y-scroll no-scrollbar whitespace-nowrap absolute ">
            {/* {searchTerms.length > 0  && <ReportTagCloud data={transformedData}  />} */}
            {items && (
                <div>
                    {/* overall */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics"
                    >
                        <BarChart
                            data={calculateRatingPercentages(
                                items["overallScore"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetricsDiv"
                        />
                    </div>

                    {/* qualityMetrics_accessibility */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_accessibility"
                    >
                        <BarChart
                            data={calculateRatingPercentages(
                                items["accessibility"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetricsDiv_accessibility"
                        />
                    </div>

                    {/* qualityMetrics_contextuality */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_contextuality"
                    >
                        <BarChart
                            data={calculateRatingPercentages(
                                items["contextuality"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetricsDiv_contextuality"
                        />
                    </div>

                    {/* qualityMetricsDiv_findability */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_findability"
                    >
                        <BarChart
                            data={calculateRatingPercentages(
                                items["findability"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetricsDiv_findability"
                        />
                    </div>

                    {/* qualityMetrics_interoperability */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_interoperability"
                    >
                        <BarChart
                            data={calculateRatingPercentages(
                                items["interoperability"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetricsDiv_interoperability"
                        />
                    </div>

                    {/* qualityMetrics_reusability */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_reusability"
                    >
                        <BarChart
                            data={calculateRatingPercentages(
                                items["reusability"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetricsDiv_reusability"
                        />
                    </div>
                </div>
            )}
            {searchTerms.length > 0 && (
                <div
                    className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                    id="searchTerms"
                >
                    <ReportTagCloud data={transformedData} />
                    <div className="text-sm w-full overflow-scroll text-dtech-dark-grey my-8 ">
                        <Table
                            tableHeaders={SEARCH_TERM_HEADERS}
                            tableData={getTableDataForSearchTerms(searchTerms)}
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
                // id="map"
                // className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10 top-0 left-0"
                >
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10 top-0 left-0"
                        id="map"
                    >
                        <MapChartComponent
                            regions={regions}
                            isMobile={isMobile}
                        />
                    </div>
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10 top-0 left-0"
                        id="location"
                    >
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
                    className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10 top-0 left-0"
                >
                    <BarChart
                        data={graphData}
                        isMobile={isMobile}
                        titles={byTimetitles}
                        divID="downloadByTimeID"
                    />
                    {/* <Table
                        tableHeaders={TIME_HEADERS}
                        tableData={tableDataByTime}
                        headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                        tableClass=" text-sm border-white w-full min-w-[180%] sm:min-w-fit !px-10 text-white text-center sm:font-medium bg-[#EBEBEB] table-fixed"
                        cellPadding={20}
                        tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                    /> */}
                </div>
            )}

            {downloadByTime.length > 0 && (
                <div className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10 top-0 left-0">
                    {updatedData.map((el, index) => (
                        <div key={index} id={`time_test${index}`}>
                            <Table
                                tableHeaders={TIME_HEADERS}
                                tableData={el}
                                headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                                tableClass="text-sm border-white w-full min-w-[180%] sm:min-w-fit !px-10 text-white text-center sm:font-medium bg-[#EBEBEB] table-fixed"
                                cellPadding={20}
                                tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                            />
                        </div>
                    ))}
                </div>
            )}
            {downloadByRole.length > 0 && (
                <div
                    id="pie"
                    className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10 top-0 left-0"
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
                    className="flex fixed justify-center items-center z-[-10] w-full top-0 left-0"
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
    );
};
export default ReportData;

interface RatingObject {
    [key: string]: number;
}

function calculateRatingPercentages(ratings: RatingObject[]): RatingObject[] {
    if (!ratings || ratings.length === 0) {
        return [];
    }

    let totalSum = 0;
    let totalCount = 0;

    ratings.forEach((ratingObj) => {
        const [ratingValue, count] = Object.entries(ratingObj)[0];
        const numericValue = Number(ratingValue);

        totalSum += numericValue * count;
        totalCount += count;
    });

    const ratingPercentages: RatingObject[] = ratings.map((ratingObj) => {
        const [ratingValue, count] = Object.entries(ratingObj)[0];
        const percentage = (count / totalCount) * 100;
        const numericValue = Number(ratingValue);
        return { [numericValue]: percentage };
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
