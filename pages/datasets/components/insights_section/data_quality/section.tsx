import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import MetaRating from "components/UI/metaRating";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext, useEffect } from "react";
import { QualityMetricsVMContext } from "./quality_metric.vm";

const DatasetQualityInsightsBody = () => {
    const {
        error,
        selectedQualityInsights: selectedLabel,
        fetchQualityMetrics,
        qualityMetrics,
        isFetchingQualityMetrics,
    } = useContext(QualityMetricsVMContext);

    const { dataset } =useContext(DatasetDetailVMContext)
    const { dataFileQuality = {}, metaDataQuality = {} } = qualityMetrics || {};

    useEffect(() => {
        fetchQualityMetrics && fetchQualityMetrics();
    }, []);

    if (isFetchingQualityMetrics) {
        return (
            <div className="h-full w-full flex items-center justify-center mt-24">
                <Loader />
            </div>
        );
    }
    if (error) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching qulaity metrics data. Please try again later"
            />
        );
    }
    const items = selectedLabel == 0 ? dataFileQuality : metaDataQuality;
    return (
        <div>
            {selectedLabel == 0 ? (
                <div className="ml-20 my-4 text-sm text-dtech-dark-grey">
                    The data file quality has been estimated based on user
                    feedback.
                </div>
            ) : (
                <div className="ml-20 my-4 text-sm text-dtech-dark-grey">
                    The metadata quality of this dataset has been
                    algorithmically estimated based on the &nbsp;
                    <a
                        href="https://data.europa.eu/mqa/methodology?locale=en"
                        className=" text-dtech-main-dark underline "
                    >
                        EU Metadata Quality Assessment method
                    </a>
                    .
                </div>
            )}
            <div className="grid lg:grid-cols-2 gap-4 mt-10 sm:grid-cols-1 ">
                {Object.keys(items)?.map((item: any, index: number) => (
                    <FileQuality items={items} item={item} key={index} selectedLabel={selectedLabel} quality={dataset?.detail.dataQuality}/>
                ))}
            </div>
        </div>
    );
};

const FileQuality = ({ item, items, selectedLabel, quality }: { item: any; items: any; selectedLabel: any, quality:any }) => {
    return (
        <div className="flex flex-row justify-center items-center mt-10">
            <span>{getLabel(items[item].label)}</span>
            <MetaRating
                label={""}
                dataQuality={(selectedLabel == 1 && items[item].label == "overallScore" )? Math.ceil(quality) :Math.ceil(items[item].rating)}
                className="!flex-row ml-0"
                labelClass="!text-lg text-dtech-dark-grey"
                starClassName="!w-6 !h-6 text-[#5F5F63]"
                title={items[item].tooltipTitle}
            />
            {items[item].total === undefined ? (
                " "
            ) : (
                <div>
                    <span className="mx-2">({items[item].total}</span>
                    <span>{items[item].ratingLabel})</span>
                </div>
            )}
        </div>
    );
};

const getLabel = (title: string) => {
    return `${title[0].toUpperCase()}${title.slice(1)}`;
};
export default DatasetQualityInsightsBody;
