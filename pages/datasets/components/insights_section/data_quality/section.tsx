import MetaRating from "components/UI/metaRating";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext, useEffect } from "react";
import { IoTimeSharp } from "react-icons/io5";

const DatasetQualityInsightsBody = () => {
    const { selectedQualityInsights: selectedLabel,fetchQualityMetrics,qualityMetrics,isFetchingQualityMetrics } = useContext(
        DatasetDetailVMContext
    );
    const { dataFileQuality = {}, metaDataQuality = {} } = qualityMetrics || {};

    useEffect(()=>{
        fetchQualityMetrics && fetchQualityMetrics();
    },[])

    const items = selectedLabel == 0 ? dataFileQuality : metaDataQuality;
    return (
        <div className="grid grid-cols-2 gap-4 mt-10">
            {Object.keys(items)?.map((item: any, index: number) => (
                <FileQuality items={items} item={item} key={index} />
            ))}
        </div>
    );
};

const FileQuality = ({ item, items }: { item: any, items: any }) => {
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
            {items[item].total &&
                <div>
                    <span className="mx-2">({items[item].total}</span>
                    <span>{items[item].ratingLabel})</span>
                </div>
            }
        </div>
    );
};

const getLabel = (title: string) => {
    return `${title[0].toUpperCase()}${title.slice(1)}`;
};
export default DatasetQualityInsightsBody;
