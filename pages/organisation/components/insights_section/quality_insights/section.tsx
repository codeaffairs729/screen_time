import Accordian from "components/UI/accordian";
import Table from "../../table";
import MetaRating from "components/UI/metaRating";
import BarGraph from "components/UI/BarGraph";
import Loader from "components/UI/loader";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { useContext, useEffect } from "react";

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
        isLoading,
        qualityMetrics,
        fetchQualityMetrics,
        selectedQualityInsights: selectedLabel,
    } = useContext(OrganisationDetailVMContext);

    const { dataFileQuality = {}, metaDataQulaity = {} } = qualityMetrics || {};
    const items = selectedLabel == 0 ? dataFileQuality : metaDataQulaity;

    useEffect(() => {
        fetchQualityMetrics && fetchQualityMetrics();
    }, []);

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="ml-16">
            <div className="text-sm text-dtech-dark-grey my-4">
                {selectedLabel == 0
                    ? "These scores are determined based on feedback gathered from users."
                    : "These values are determined based on the Metadata Quality Assessment methodology and calculated using algorithms."}
            </div>
            {Object.keys(items).map((key, index) => (
                <Accordian
                    label={
                        <AccordianLabel
                            label={getLabel(items[key].title)}
                            ratings={items[key].rating}
                        />
                    }
                    key={index}
                >
                    <div>
                        <div className="px-8">
                            <Table
                                tableHeaders={TABLE_HEADERS}
                                tableData={getTableData(items[key].datasets)}
                                cellPadding={3}
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
            ))}
        </div>
    );
};

const AccordianLabel = ({
    label,
    ratings,
}: {
    label: string;
    ratings: any;
}) => {
    return (
        <MetaRating
            label={label}
            dataQuality={getAvg(ratings)}
            className="!flex-row ml-0"
            labelClass="!text-lg text-dtech-dark-grey"
            starClassName="!w-6 !h-6 text-[#5F5F63]"
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

const getTableData = (datasets: any) => {
    return datasets.map((dataset: any, index: number) => [
        dataset.rating,
        <DisplayDataset
            key={index}
            title={dataset.title}
            description={dataset.description}
        />,
    ]);
};

const getRating = (ratings: any, index: any) => {
    const rating = ratings.map((rate: any, index: any) => ({
        name: index + 1,
        rating: rate[index + 1],
    }));
    return rating;
};

export default QualityInsightsBody;
