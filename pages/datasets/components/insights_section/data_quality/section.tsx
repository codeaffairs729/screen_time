import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import MetaRating from "components/UI/metaRating";
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
        <div className="grid grid-cols-2 gap-4 mt-10">
            {Object.keys(items)?.map((item: any, index: number) => (
                <FileQuality items={items} item={item} key={index} />
            ))}
        </div>
    );
};

const FileQuality = ({ item, items }: { item: any; items: any }) => {
    return (
        <div className="flex flex-row justify-center items-center mt-10">
            <span>{getLabel(items[item].label)}</span>
            <MetaRating
                label={""}
                dataQuality={items[item].rating}
                className="!flex-row ml-0"
                labelClass="!text-lg text-dtech-dark-grey"
                starClassName="!w-6 !h-6 text-[#5F5F63]"
            />
            {items[item].total && (
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
