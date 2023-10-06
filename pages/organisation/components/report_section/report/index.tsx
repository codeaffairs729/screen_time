import { useContext, useMemo, useState } from "react";
import Head from "./head";
import Preview from "./preview";
import dynamic from "next/dynamic";
import { Tab } from "@headlessui/react";
import { DateTime } from "luxon";
import MetaRating from "components/UI/metaRating";
import BarGraph from "components/UI/BarGraph";
import PieGraph from "components/UI/PieGraph";
import Loader from "components/UI/loader";
import LineGraph from "components/UI/line_graph";
import Accordian from "components/UI/accordian";
import Table from "../../table";
import { DownloadByTime } from "../../insights_section/download_section/download_metric.vm";
import { SearchTermType } from "../../insights_section/search_term_section/search_term.vm";
import TagsCloud from "../../insights_section/search_term_section/tagCloud";
import { getAge } from "pages/workspace/notification.vm";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { getDateRange, ReportVMContext } from "../report.vm";
import { HiPencil } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
const DownloadReport = dynamic(() => import("./downloadReport"), {
    ssr: false,
});
const EditReport = dynamic(() => import("./editReport"), {
    ssr: false,
});

const TIME_HEADERS = ["Count", "Month"];
const PIE_HEADER = ["name", "value"];
const LOCATION_HEADERS = ["Region", "Count", "Last used"];
const SEARCH_TERM_HEADERS = ["Search term", "Count", "Last used"];
const QUALITY_HEADERS = ["Score", "Dataset"];
const selectedLabel = 0

const DisplayDataset = ({ title, description }: any) => (
    <div>
        <span className="text-sm font-medium text-dtech-dark-grey limit-line break-words">
            {title}
        </span>
        <span className="text-sm text-dtech-dark-grey limit-line break-words">
            {description}
        </span>
    </div>
);

const Report = ({ isReportGenerated, setIsReportGenerated }: { isReportGenerated: boolean, setIsReportGenerated: Function }) => {
    const [edit, setEdit] = useState(false);

    const {
        loading,
        fromDate,
        toDate,
        downloadByTime = [],
        downloadByRole = [],
        downloadByLocation = [],
        searchTerms,
        qualityMetrics,
        useCases
    } = useContext(ReportVMContext);
    const { organisation } = useContext(OrganisationDetailVMContext);

    const filteredDates = downloadByTime.filter(
        (data: any) =>
            new Date(data?.date) >= new Date(fromDate) &&
            new Date(data?.date) <= new Date(toDate)
    );
    const items = qualityMetrics?.dataFileQuality
    const tableDataByTime = filteredDates.map((data: DownloadByTime) => {
        const date = new Date(data?.date);
        const month = date.toLocaleString("en", { month: "short" });
        const year = new Date(data?.date).getFullYear();
        return [[data.count], [`${month} ${year}`]];
    });

    const lineChartData = getDateRange(fromDate, toDate, filteredDates);
    const useCaseData = useCases.map((usecase: any) => [usecase.category, usecase.value])
    const pieData = downloadByRole.map((data: any) => [data.name, data.count]);
    const regions = downloadByLocation?.map((region: any) => ({
        name: region["name"],
        location: region["locations"]?.map((location: any) => ({
            lat: location["latitude"],
            long: location["longitude"],
        })),
        count: region["count"],
        date: region["date"],
    }))

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

    const tagsItems = useMemo(
        () => searchTerms.map((terms: SearchTermType) => terms.title.replaceAll("+"," ")),
        [searchTerms]
    );
    const tagsCount = useMemo(
        () => searchTerms.map((terms: SearchTermType) => terms.count),
        [searchTerms]
    );
    const getLabel = (title: string) => {
        return `${title[0].toUpperCase()}${title.slice(1)}`;
    };

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
                {items && Object.keys(items)?.length > 0 && <div
                    className="flex fixed justify-center items-center flex-col z-[-10]"
                    id="qualityMetrics">

                    {Object.keys(items)?.map((key, index) => {
                        return <Accordian
                            label={
                                <AccordianLabel
                                    label={getLabel(items[key].title)}
                                    ratings={items[key].rating}
                                    tooltipTitle={items[key].tooltipTitle}
                                    selectedLabel={selectedLabel}
                                    orgQuality={(!organisation) ? 0 : organisation.dataQuality}
                                />
                            }
                            key={selectedLabel + key}
                        >
                            <div>
                                <div className="px-8">
                                    <Table
                                        tableHeaders={QUALITY_HEADERS}
                                        tableData={getTableData(
                                            key,
                                            items[key].datasets
                                        )}
                                        cellPadding={3}
                                        tableClass={
                                            "block h-[220px] overflow-y-scroll w-[690px]"
                                        }
                                    />
                                </div>
                                <BarGraph
                                    data={getRating(items[key].rating, index)}
                                    strokeWidthAxis={2}
                                    strokeWidthLabelList={0}
                                    className="font-medium mb-6 mt-6"
                                    xLabel=""
                                    yLabel=""
                                    xvalue="Star rating"
                                    yvalue="Datasets"
                                    barDatakey={"rating"}
                                    labelListDatakey={"name"}
                                />
                            </div>
                        </Accordian>
                    })}
                </div>
                }
                {
                    searchTerms.length > 0 && (
                        <div
                            className="flex fixed justify-center items-center flex-col z-[-10]"
                            id="searchTerms"
                        >
                            <TagsCloud row={tagsItems} row2={tagsCount} />
                            <div className="text-sm text-dtech-dark-grey my-8 ">
                                <Table
                                    tableHeaders={SEARCH_TERM_HEADERS}
                                    tableData={getTableDataForSearchTerms(searchTerms)}
                                    headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                                    tableClass="w-full text-sm text-left border table-fixed"
                                    cellPadding={20}
                                    tableRow="text-[17px] text-black font-normal"
                                />
                            </div>
                        </div>)
                }
                {
                    downloadByLocation.length > 0 && (
                        <div
                            id="map"
                            className="flex fixed justify-center items-center flex-col z-[-10]"
                        >
                            <div className="mt-8">
                                <Table
                                    tableHeaders={LOCATION_HEADERS}
                                    tableData={tableData}
                                    headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                                    tableClass="w-[90%] ml-12 text-sm text-left table-fixed"
                                    cellPadding={10}
                                    tableRow="text-[17px]"
                                />
                            </div>
                        </div>
                    )
                }
                {downloadByTime.length > 0 && (
                    <div
                        id="screenshot"
                        className="flex absolute justify-center items-center flex-col z-[-10]"
                    >
                        <LineGraph
                            data={lineChartData}
                            height={500}
                            width={1025}
                            datakeyX={"date"}
                            datakeyY="download"
                            className=""
                        />
                        <Table
                            tableHeaders={TIME_HEADERS}
                            tableData={tableDataByTime}
                            headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                            tableClass="w-[90%] ml-12 text-sm text-left table-fixed"
                            cellPadding={20}
                            tableRow="text-[17px]"
                        />
                    </div>
                )}
                {downloadByRole.length > 0 && (
                    <div
                        id="pie"
                        className="flex absolute justify-center items-center flex-col z-[-10]"
                    >
                        <>
                            <PieGraph
                                data={downloadByRole}
                                isAnimationActive={false}
                                radius="60%"
                                dataKey="count"
                            />

                            <Table
                                tableHeaders={PIE_HEADER}
                                tableData={pieData}
                                headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                                tableClass="w-[80%] ml-20 text-left table-fixed"
                                cellPadding={20}
                                tableRow="text-[17px]"
                            />
                        </>
                    </div>
                )}
                {
                    useCases.length > 0 && (
                        <div
                            id="useCases"
                            className="flex absolute justify-center items-center flex-col z-[-10]"
                        >
                            <>
                                <PieGraph
                                    data={useCases.map((item: any) => ({
                                        name:item.category, count:item.value
                                    }))}
                                    isAnimationActive={false}
                                    radius="60%"
                                    dataKey="count"
                                />

                                <Table
                                    tableHeaders={PIE_HEADER}
                                    tableData={useCaseData}
                                    headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                                    tableClass="w-[80%] ml-20 text-left table-fixed"
                                    cellPadding={20}
                                    tableRow="text-[17px]"
                                />
                            </>
                        </div>
                    )
                }
            </div>
            <div className={"hidden sm:block"}>

                <Tab.Group >
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
                            <Preview />
                        </Tab.Panel>
                        <Tab.Panel>
                            <EditReport />
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
                            <Tab className={ "flex justify-between items-center px-3 w-full"}>
                                <button className=" cursor-pointer" onClick={()=>setIsReportGenerated(false)}>
                                    <AiOutlineArrowLeft />
                                </button>
                                <button onClick={() => (setEdit(!edit))}>
                                    {
                                        edit
                                            ? <div>Preview</div>
                                            : <div className=" flex flex-row items-center"><HiPencil className="mr-1"/>Edit</div>
                                    }
                                </button>
                            </Tab>
                        </Tab.List>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel>
                            {
                                !edit
                                    ? <Preview />
                                    : <EditReport />
                            }
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
            {isReportGenerated && <div className=" mt-4"><DownloadReport /></div>}
        </div>
    );
};

export default Report;
const AccordianLabel = ({
    label,
    ratings,
    tooltipTitle,
    selectedLabel,
    orgQuality,
}: {
    label: string;
    ratings: any;
    tooltipTitle: string;
    selectedLabel: number;
    orgQuality: number;
}) => {
    return (
        <MetaRating
            label={label}
            dataQuality={(selectedLabel == 1 && label == "OverallScore") ? orgQuality : getAvg(ratings, label)}
            className="!flex-row ml-0"
            labelClass="!text-lg text-dtech-dark-grey"
            starClassName="!w-6 !h-6 text-[#5F5F63]"
            title={tooltipTitle}
        />
    );
};

const getTableDataForSearchTerms = (searchTerms: SearchTermType[]) =>
    searchTerms.map((terms: any) => {
        const date: any = DateTime.fromISO(terms["created_at"]);
        return [terms["title"].replaceAll("+", " "), terms["count"], getAge(date.ts)];
    });
const getRating = (ratings: any, index: any) => {
    let rating;
    if (ratings?.length == 6) {
        rating = ratings.slice(1).map((rate: any, index: any) => ({
            name: index + 1,
            rating: rate[index + 1],
        }));
    } else {
        rating = ratings?.map((rate: any, index: any) => ({
            name: index + 1,
            rating: rate[index + 1],
        }));
    }
    return rating;
};

const getAvg = (ratings: any, label: any) => {
        let ratingSum;
    let count;
        const ratingData = ratings?.map(
            (rate: any, index: number) => {
                return rate[index / 2]
            }
        );
        count = ratingData?.reduce(
            (accumulator: any, curValue: any) => accumulator + curValue,
            0
        );

        ratingSum = ratings?.reduce((accumulator: any, curValue: any) => {
            const rating = parseFloat(Object.keys(curValue)[0]);
            const value = curValue[rating];
            return accumulator + rating * value;
        }, 0);
    return ratingSum / count;
};
const getTableData = (key: string, datasets: any) =>
    datasets?.map((dataset: any, index: number) => {
        const datasetCell = (
            <DisplayDataset
                id={dataset?.id}
                key={dataset?.id}
                title={dataset?.title ? dataset?.title : "NA"}
                description={dataset?.description ? dataset?.description : "NA"}
            />
        );

        return [dataset?.rating, datasetCell];
    });