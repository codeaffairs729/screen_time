import { useContext, useEffect, useState } from "react";
import Head from "./head";
import dynamic from "next/dynamic";
import { Tab } from "@headlessui/react";
import { DateTime } from "luxon";
import Loader from "components/UI/loader";

import { getAge } from "pages/workspace/notification.vm";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { getDateRange, ReportVMContext } from "../report.vm";
import { HiPencil } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useIsMobile } from "common/hooks";

import RichTextEditor from "./components/editor";
import PreviewReport from "./components/new_preview";
import { getTableData } from "../../insight_section/download_section/download_metric.vm";
import { sortAndAggregate } from "../../insight_section/usecase_section/section";
import Table from "pages/organisation/components/table";
import { SearchTermType } from "../../insight_section/search_term_section/search_term.vm";

import TagCloud2 from "pages/organisation/components/insights_section/search_term_section/tagCloud2";

const PieChartComponent = dynamic(() => import("./components/pie_Chart"), {
    ssr: false,
});

const MapChartComponent = dynamic(() => import("./components/map_chart"), {
    ssr: false,
});

const BarChart = dynamic(() => import("./components/bar_graph"), {
    ssr: false,
});

const DownloadReport = dynamic(() => import("./downloadReport"), {
    ssr: false,
});

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

const Report = ({
    isReportGenerated,
    setIsReportGenerated,
}: {
    isReportGenerated: boolean;
    setIsReportGenerated: Function;
}) => {
    const [edit, setEdit] = useState(false);

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
    } = useContext(ReportVMContext);

    const items = qualityMetrics?.data_file_quality;
    const meta_items = qualityMetrics?.meta_file_quality;
    // console.log("downloadbyTimeData is *************",downloadByTime)
    //------------------------------------------------------------------
    const transformedData = searchTerms.map((item: any) => {
        return {
            tag: item.title.replace(/\+/g, " "), // Replace '+' with space in the title
            count: item.count,
        };
    });

    //----------------------------------------------------------------

    const filteredDates = downloadByTime.filter(
        (data: any) =>
            new Date(data?.date) >= new Date(fromDate) &&
            new Date(data?.date) <= new Date(toDate)
    );

    const dates = filteredDates.sort((a: any, b: any) => {
        if (new Date(a.date) > new Date(b.date)) return 1;
        if (new Date(a.date) < new Date(b.date)) return -1;
        else return 0;
    });
    const lineChartData = getDateRange(fromDate, toDate, dates);

    const graphData = [];
    let dataAvailable = false;

    for (const item of lineChartData) {
        const dataPoint = {
            [item.month ?? item.date]: item.download,
        };

        graphData.push(dataPoint);

        if (item.download > 0) {
            dataAvailable = true;
        }
    }

    const tableDataByTime = getTableData(fromDate, toDate, dates);

    //---------------------------------------------------------------------------------
    const chartData = downloadByRole.map((data: any) => ({
        category: data.name,
        value: data.value,
    }));
    const pieData = downloadByRole.map((data: any) => [data.name, data.value]);

    const regions = downloadByLocation?.map((region: any) => ({
        name: region["name"],
        location: region["locations"]?.map((location: any) => ({
            lat: location["latitude"],
            long: location["longitude"],
        })),
        count: region["count"],
        date: region["date"],
    }));

    const loc: any = [];
    const downloadCounts: any = [];
    regions?.map((region: any) => {
        region["location"]?.map((location: any) => {
            loc.push([location?.lat, location?.long]);
            downloadCounts.push(1);
        });
    });
    const tableData = regions?.map((region: any) => [
        region?.name,
        region?.count,
        getAge(region.date),
    ]);

    const useCaseData = sortAndAggregate(useCases).map((data: any) => [
        data.category?.charAt(0).toUpperCase() + data.category?.slice(1),
        data.value,
    ]);
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
    // console.log(items[`overallScore`]?.rating)

    return (
        <div className="w-full relative">
            {loading && (
                <div className="flex absolute mt-12 w-full h-[90%] bg-black bg-opacity-10 z-20 ">
                    <div className="ml-auto mr-auto my-auto">
                        <Loader sizeClass="h-10 w-10" />
                    </div>
                </div>
            )}
            <div className=" h-[56rem] overflow-y-scroll no-scrollbar whitespace-nowrap absolute">
                {/* {items && (
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full"
                        id="qualityMetrics"
                    >
                        <BarChart
                            data={calculateRatingPercentages([
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
                            ])}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetricsDiv"
                        />
                    </div>
                )} */}
                {items && (
                    <div>
                        {/* overall */}
                        <div
                            className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                            id="qualityMetrics"
                        >
                            {/* {console.log("items are*************** ",items)} */}
                            <BarChart
                                data={calculateRatingPercentages(
                                    items["overall"]?.rating
                                )}
                                isMobile={isMobile}
                                titles={titles}
                                divID="qualityMetricsDiv"
                            />
                        </div>

                        {/* qualityMetrics_accuracy */}
                        <div
                            className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                            id="qualityMetrics_accuracy"
                        >
                            {/* {console.log("items are*************** ",items)} */}
                            <BarChart
                                data={calculateRatingPercentages(
                                    items["accuracy"]?.rating
                                )}
                                isMobile={isMobile}
                                titles={titles}
                                divID="qualityMetricsDiv_accuracy"
                            />
                        </div>

                        {/* qualityMetrics_clarity */}
                        <div
                            className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                            id="qualityMetrics_clarity"
                        >
                            <BarChart
                                data={calculateRatingPercentages(
                                    items["clarity"]?.rating
                                )}
                                isMobile={isMobile}
                                titles={titles}
                                divID="qualityMetricsDiv_clarity"
                            />
                        </div>

                        {/* qualityMetricsDiv_consistency */}
                        <div
                            className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                            id="qualityMetrics_consistency"
                        >
                            {/* {console.log("items are*************** ",items)} */}
                            <BarChart
                                data={calculateRatingPercentages(
                                    items["consistency"]?.rating
                                )}
                                isMobile={isMobile}
                                titles={titles}
                                divID="qualityMetricsDiv_consistency"
                            />
                        </div>

                        {/* qualityMetrics_readiness */}
                        <div
                            className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                            id="qualityMetrics_readiness"
                        >
                            {/* {console.log("items are*************** ",items)} */}
                            <BarChart
                                data={calculateRatingPercentages(
                                    items["readiness"]?.rating
                                )}
                                isMobile={isMobile}
                                titles={titles}
                                divID="qualityMetricsDiv_readiness"
                            />
                        </div>
                    </div>
                )}

                {meta_items && (
                    <Meta_items
                        items={meta_items}
                        titles={titles}
                        isMobile={isMobile}
                    />
                )}

                {searchTerms.length > 0 && (
                    <div
                        className="flex fixed  justify-center items-center  flex-col z-[-10] w-full top-0 "
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
                    // <div
                    //     id="map"
                    //     className="flex fixed justify-center items-center flex-col top-0 z-[-10] w-fit my-10 mb-5"
                    // >
                    //     <div className="mt-8">
                    //         <MapChartComponent
                    //             regions={regions}
                    //             isMobile={isMobile}
                    //         />
                    //         <Table
                    //             tableHeaders={LOCATION_HEADERS}
                    //             tableData={tableData}
                    //             headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    //             tableClass=" text-sm border-white w-full min-w-[180%] sm:min-w-fit !px-10 text-white text-center sm:font-medium bg-[#EBEBEB] table-fixed"
                    //             cellPadding={20}
                    //             tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                    //         />
                    //     </div>
                    // </div>

                    <div>
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
                {/* {downloadByTime.length > 0 && (
                    <div
                        id="screenshot"
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full my-10 mb-5"
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
                )} */}

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
                    <div>
                        <div
                            id="useCases"
                            className="flex fixed items-center w-1/2 top-0 z-[-10] left-10"
                        >
                            <PieChartComponent
                                isMobile={isMobile}
                                chartData={sortAndAggregate(useCases)}
                                divID={"useCasesId"}
                            />
                        </div>

                        <div
                            id="useCasesTable"
                            className="flex fixed items-center w-1/3 top-[20px] z-[-10] left-10"
                        >
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
                    </div>
                    // <div
                    //     id="useCases"
                    //     className="flex items-center flex-col w-1/4"
                    // >
                    //     {console.log("inside *****", useCases, useCaseData)}
                    //     <PieChartComponent
                    //         isMobile={isMobile}
                    //         chartData={sortAndAggregate(useCases)}
                    //         divID={"useCasesId"}
                    //     />

                    //     <Table
                    //         tableHeaders={["Use case", "value"]}
                    //         tableData={useCaseData}
                    //         headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    //         tableClass=" text-sm border-white w-full !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                    //         cellPadding={20}
                    //         showDots={false}
                    //         tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                    //     />
                    // </div>
                )}
            </div>

            <div className={"hidden sm:block"}>
                <Tab.Group>
                    <div className="">
                        <Tab.List>
                            <Head edit={edit} setEdit={setEdit} />
                        </Tab.List>
                    </div>
                    <div className=" sm:hidden ">
                        <Tab.List className={"flex w-full justify-between"}>
                            <Head edit={edit} setEdit={setEdit} />
                            {/* <Tab className={ "cursor-pointer"}>
                            back
                        </Tab>
                        <Tab>
                            Two
                        </Tab> */}
                        </Tab.List>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel>
                            <PreviewReport
                                loading={loading}
                                isReportGenerated={isReportGenerated}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <RichTextEditor />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            <div className=" sm:hidden">
                <Tab.Group>
                    <div className=" ">
                        <Tab.List className={"flex w-full justify-between"}>
                            {/* <Head edit={edit} setEdit={setEdit} /> */}
                            {/* <Tab className={"cursor-pointer"}>
                                back
                            </Tab> */}
                            <Tab
                                className={
                                    "flex justify-between items-center px-3 w-full"
                                }
                            >
                                <button
                                    className=" cursor-pointer"
                                    onClick={() => setIsReportGenerated(false)}
                                >
                                    <AiOutlineArrowLeft />
                                </button>
                                <button onClick={() => setEdit(!edit)}>
                                    {edit ? (
                                        <div>Preview</div>
                                    ) : (
                                        <div className=" flex flex-row items-center">
                                            <HiPencil className="mr-1" />
                                            Edit
                                        </div>
                                    )}
                                </button>
                            </Tab>
                        </Tab.List>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel>
                            {!edit ? (
                                // <Preview
                                //     loading={loading}
                                //     isReportGenerated={isReportGenerated}
                                // />
                                <PreviewReport
                                    loading={loading}
                                    isReportGenerated={isReportGenerated}
                                />
                            ) : (
                                <RichTextEditor />
                            )}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
            {isReportGenerated && !edit && (
                <div className=" mt-4">
                    <DownloadReport />
                </div>
            )}
        </div>
    );
};

export default Report;

const getTableDataForSearchTerms = (searchTerms: SearchTermType[]) =>
    searchTerms.map((terms: any) => {
        const date: any = DateTime.fromISO(terms["lastUsed"]);
        return [
            terms["title"].replace(/\+/g, " "),
            terms["count"],
            getAge(date.ts),
        ];
    });

const Meta_items = ({
    items,
    isMobile,
    titles,
}: {
    items: any;
    isMobile: boolean;
    titles: any;
}) => {
    return (
        <div>
            {items && (
                <div>
                    {/* overall */}
                    <div
                        className="flex fixed justify-center items-center flex-col w-full z-[-10] top-0 left-0"
                        id="qualityMetrics_meta"
                    >
                        {/* {console.log("items are*************** ",items)} */}
                        <BarChart
                            data={calculateRatingPercentages(
                                items["overall"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetrics_meta_Div"
                        />
                    </div>

                    {/* qualityMetrics_accessibility*/}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_meta_accessibility"
                    >
                        {/* {console.log("items are*************** ",items)} */}
                        <BarChart
                            data={calculateRatingPercentages(
                                items["accessibility"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetrics_metaDiv_accessibility"
                        />
                    </div>

                    {/* qualityMetrics_contextuality */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_meta_contextuality"
                    >
                        {/* {console.log("items are*************** ",items)} */}
                        <BarChart
                            data={calculateRatingPercentages(
                                items["contextuality"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetrics_metaDiv_contextuality"
                        />
                    </div>

                    {/* qualityMetricsDiv_findability */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_meta_findability"
                    >
                        {/* {console.log("items are*************** ",items)} */}
                        <BarChart
                            data={calculateRatingPercentages(
                                items["findability"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetrics_metaDiv_findability"
                        />
                    </div>

                    {/* qualityMetrics_reusability */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_meta_reusability"
                    >
                        {/* {console.log("items are*************** ",items)} */}
                        <BarChart
                            data={calculateRatingPercentages(
                                items["reusability"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetrics_metaDiv_reusability"
                        />
                    </div>

                    {/* qualityMetrics_interoperability */}
                    <div
                        className="flex fixed justify-center items-center flex-col z-[-10] w-full top-0 left-0"
                        id="qualityMetrics_meta_interoperability"
                    >
                        {/* {console.log("items are*************** ",items)} */}
                        <BarChart
                            data={calculateRatingPercentages(
                                items["interoperability"]?.rating
                            )}
                            isMobile={isMobile}
                            titles={titles}
                            divID="qualityMetrics_metaDiv_interoperability"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
