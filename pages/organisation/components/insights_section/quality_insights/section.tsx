import Accordian from "components/UI/accordian";
import Table from "../../table";
import MetaRating from "components/UI/metaRating";
import BarGraph from "components/UI/BarGraph";
import Loader from "components/UI/loader";
import { useContext, useEffect } from "react";
import { QualityMetricVMContext } from "./quality_metric.vm";
import ErrorAlert from "components/UI/alerts/error_alert";

const TABLE_HEADERS = ["Score", "Dataset"];

const DisplayDataset = ({ title, description }: any) => (
    <div>
        <span className="text-sm font-medium text-dtech-dark-grey">
            {title}
        </span>
        <span className="text-sm text-dtech-dark-grey limit-line">
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
                        />
                    }
                    key={selectedLabel + key}
                >
                    {!isFetchingQualityMetrics ? (
                        <div>
                            <div className="px-8">
                                <Table
                                    tableHeaders={TABLE_HEADERS}
                                    tableData={getTableData(key,
                                        items[key].datasets
                                    )}
                                    cellPadding={3}
                                    tableBodyClasses={
                                        "block h-[220px] overflow-auto"
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
}: {
    label: string;
    ratings: any;
    tooltipTitle: string;
}) => {
    return (
        <MetaRating
            label={label}
            dataQuality={getAvg(ratings)}
            className="!flex-row ml-0"
            labelClass="!text-lg text-dtech-dark-grey"
            starClassName="!w-6 !h-6 text-[#5F5F63]"
            title={tooltipTitle}
        />
    );
};

const getAvg = (ratings: any) => {
    const ratingData = ratings.map(
        (rate: any, index: number) => rate[index + 1]
    );
    const count = ratingData.reduce(
        (accumulator: any, curValue: any) => accumulator + curValue,
        0
    );

    const ratingSum = ratingData.reduce(
        (accumulator: any, curValue: any, curIndex: any) =>
            accumulator + curValue * (curIndex + 1),
        0
    );
    return ratingSum / count;
};

const getLabel = (title: string) => {
    return `${title[0].toUpperCase()}${title.slice(1)}`;
};

const getTableData = (key: string, datasets: any) =>
    datasets?.map((dataset: any, index: number) => {
        const datasetCell = (
            <DisplayDataset
                id={dataset?.id}
                key={dataset?.id}
                title={dataset?.title}
                description={dataset?.description}
            />
        );

        return [dataset?.rating, datasetCell];
    });

const getRating = (ratings: any, index: any) => {
    const rating = ratings.map((rate: any, index: any) => ({
        name: index + 1,
        rating: rate[index + 1],
    }));
    return rating;
};

export default QualityInsightsBody;
