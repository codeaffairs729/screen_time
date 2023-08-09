import Accordian from "components/UI/accordian";
import Table from "../../table";
import MetaRating from "components/UI/metaRating";
import Loader from "components/UI/loader";
import { useContext, useEffect } from "react";
import { QualityMetricVMContext } from "./quality_metric.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
// import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { AgChartsReact } from "ag-charts-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const TABLE_HEADERS = ["Score", "Dataset"];

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
const QualityInsightsBody = () => {
    const {
        qualityMetrics,
        fetchQualityMetrics,
        isFetchingQualityMetrics,
        error,
        selectedQualityInsights: selectedLabel,
    } = useContext(QualityMetricVMContext);

    /**  Adding metaQuality same as overscore for metaFileQuality */
    const { organisation } = useContext(OrganisationDetailVMContext);
    const { dataFileQuality = {}, metaFileQuality = {} } = qualityMetrics || {};
    const items = selectedLabel == 0 ? dataFileQuality : metaFileQuality;

    useEffect(() => {
        fetchQualityMetrics && fetchQualityMetrics();
    }, []);

    if (error) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching Quality Metrics data. Please try again later"
            />
        );
    }
    if (isFetchingQualityMetrics) {
        return (
            <div className="h-[calc(40vh-var(--nav-height))] w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }
    return (
        <div className="ml-16">
            <div className="text-sm text-dtech-dark-grey my-4">
                {selectedLabel == 0 ? (
                    <div className="my-4 text-sm text-dtech-dark-grey">
                        The data quality of datasets of this organisation has
                        been estimated based on user feedback (where available).
                        Datasets rated based on overall data quality and
                        individual dimensions are listed below.
                    </div>
                ) : (
                    <div className="ml-4 my-4 text-sm text-dtech-dark-grey">
                        The metadata quality of all datasets of this
                        organisation has been algorithmically estimated based on
                        the &nbsp;
                        <a
                            href="https://data.europa.eu/mqa/methodology"
                            className=" text-dtech-main-dark underline "
                        >
                            EU Metadata Quality Assessment method
                        </a>
                        . Datasets rated based on overall metadata quality and
                        individual dimensions are listed below.
                    </div>
                )}
            </div>
            {Object.keys(items)?.map((key, index) => (
                <Accordian
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
                    {!isFetchingQualityMetrics ? (
                        <div>
                            <div className="px-8">
                                <Table
                                    tableHeaders={TABLE_HEADERS}
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
                            <div className="relative w-full">

                                <div className=" ">
                                    <AgChartsReact options={
                                        {
                                            data: getChartData(items[key].rating),
                                            series: [{
                                                xKey: 'star',
                                                yKey: 'starRating',
                                                type: 'column',
                                                // type: 'histogram',
                                                strokeWidth: 2,
                                                stroke: '#3F0068',
                                                fill:'#3F0068'

                                            },
                                            {
                                                xKey: 'star',
                                                yKey: 'starRating',
                                                // type: 'column', // Bar series

                                                strokeWidth: 1,
                                                tooltip: {
                                                    enabled: true
                                                },
                                                stroke: '#3F0068',
                                                fill: '#3F0068'

                                            }
                                            ],
                                            axes: [
                                                {
                                                    type: 'category',
                                                    position: 'bottom',
                                                    title: {
                                                        text: 'Star',
                                                    },
                                                    label: {
                                                        formatter: (params) => {
                                                            const value = parseFloat(params.value);
                                                            return value % 1 === 0 ? value.toString() : '';
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'number',
                                                    position: 'left',
                                                    title: {
                                                        text: 'Ratings',
                                                    },
                                                    tick: {
                                                        interval:5
                                                    }
                                                },
                                            ]
                                                                                    }
                                    } />
                                </div>
                                
                            </div>
                            {/* <BarGraph
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
                            /> */}
                        </div>
                    ) : (
                        <div className="h-[calc(40vh-var(--nav-height))] w-full flex items-center justify-center">
                            <Loader />
                        </div>
                    )}
                </Accordian>
            ))}
        </div>
    );
};

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

const getAvg = (ratings: any, label: any) => {
    let ratingSum;
    let count;
    if (ratings.length == 11) {
        const ratingData = ratings.map(
            (rate: any, index: number) => {
                return rate[index / 2]
            }
        );
        count = ratingData.reduce(
            (accumulator: any, curValue: any) => accumulator + curValue,
            0
        );

        ratingSum = ratings.reduce((accumulator: any, curValue: any) => {
            const rating = parseFloat(Object.keys(curValue)[0]);
            const value = curValue[rating];
            return accumulator + rating * value;
        }, 0);
    } else {
        const ratingData = ratings.map(
            (rate: any, index: number) => rate[index + 1]
        );
        count = ratingData.reduce(
            (accumulator: any, curValue: any) => accumulator + curValue,
            0
        );

        ratingSum = ratingData.reduce(
            (accumulator: any, curValue: any, curIndex: any) =>
                accumulator + curValue * (curIndex + 1),
            0
        );
    }
    return ratingSum / count;
};

const getLabel = (title: string) => {
    return `${title[0].toUpperCase()}${title.slice(1)}`;
};

const getTableData = (key: string, datasets: any) => {
    if (key === "overallScore") return datasets?.map((dataset: any, index: number) => {
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
    else {
        return datasets?.map((dataset: any, index: number) => {
            let rating;
            if (dataset.factorWiseRating == 0) {
                rating = dataset.rating
            }
            else {
                rating = dataset.factorWiseRating[key]
            }

            const datasetCell = (
                <DisplayDataset
                    id={dataset?.id}
                    key={dataset?.id}
                    title={dataset?.title ? dataset?.title : "NA"}
                    description={dataset?.description ? dataset?.description : "NA"}
                />
            );

            return [rating, datasetCell];
        });
    }
}

const getRating = (ratings: any, index: any) => {
    let rating;
    if (ratings.length == 6) {
        rating = ratings.slice(1).map((rate: any, index: any) => ({
            name: index + 1,
            rating: rate[index + 1],
        }));
    } else {
        rating = ratings.map((rate: any, index: any) => ({
            name: index + 1,
            rating: rate[index + 1],
        }));
    }
    return rating;
};

const getChartData = (rating: any) => {
    const data = rating.map((obj: any) => {
        const key = parseFloat(Object.keys(obj)[0]);
        const value = obj[key];
        return {
            star: ` ${key}`,
            starRating: value
        };
    })
    return data
}
export default QualityInsightsBody;
