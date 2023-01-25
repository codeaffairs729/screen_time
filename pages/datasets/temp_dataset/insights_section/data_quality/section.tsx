import MetaRating from "components/UI/metaRating";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext } from "react";
import { IoTimeSharp } from "react-icons/io5";

const metaFileQuality = [
    { label: "overallScore", rating: 3 },
    { label: "findability", rating: 3 },
    { label: "reusability", rating: 3 },
    { label: "accessibility", rating: 3 },
    { label: "contextuality", rating: 3 },
    { label: "interoperability", rating: 3 },
];

const dataFileQuality = [
    { label: "overallScore", rating: 3, ratingLabel: "votes", total: 132 },
    {
        label: "feedbackSentiment",
        rating: 3,
        ratingLabel: "comments",
        total: 132,
    },
    { label: "accuracy", rating: 3, ratingLabel: "votes", total: 132 },
    { label: "clarity", rating: 3, ratingLabel: "votes", total: 132 },
    { label: "consistency", rating: 3, ratingLabel: "votes", total: 132 },
    { label: "readiness", rating: 3, ratingLabel: "votes", total: 132 },
];

const DatasetQualityInsightsBody = () => {
    const { selectedQualityInsights: selectedLabel } = useContext(
        DatasetDetailVMContext
    );
    const items = selectedLabel == 0 ? dataFileQuality : metaFileQuality;
    return (
        <div className="flex flex-col">
            {items.map((item: any, index: number) => {
                return (
                    <div className={''}>
                        <FileQuality item={item} key={index}/>
                    </div>
                );
            })}
        </div>
    );
};

const FileQuality = ({ item }: { item: any }) => {
    return (
        <div className="flex flex-row justify-center items-center mt-10">
            <span>{getLabel(item.label)}</span>
            <MetaRating
                label={""}
                dataQuality={item.rating}
                className="!flex-row ml-0"
                labelClass="!text-lg text-dtech-dark-grey"
                starClassName="!w-6 !h-6 text-[#5F5F63]"
            />
            <span className="mr-2">{item.total}</span>
            <span>{item.ratingLabel}</span>
        </div>
    );
};

const getLabel = (title: string) => {
    return `${title[0].toUpperCase()}${title.slice(1)}`;
};
export default DatasetQualityInsightsBody;
