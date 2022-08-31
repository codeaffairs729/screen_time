import { useContext } from "react";
import { DatasetDetailVMContext } from "../../dataset_detail.vm";
import {
    HeartIcon,
    FolderDownloadIcon,
    EyeIcon,
    DownloadIcon,
    SearchCircleIcon,
} from "@heroicons/react/outline";

const SummaryRow = ({
    icon,
    name,
    value,
}: {
    icon: String;
    name: String;
    value: String;
}) => {
    const renderIcon = (icon: String) => {
        switch (icon) {
            case "heart":
                return (
                    <HeartIcon
                        className="h-5 w-5 text-gray-700"
                        aria-hidden="true"
                    />
                );
            case "download":
                return (
                    <DownloadIcon
                        className="h-5 w-5 text-gray-700"
                        aria-hidden="true"
                    />
                );
            case "eye":
                return (
                    <EyeIcon
                        className="h-5 w-5 text-gray-700"
                        aria-hidden="true"
                    />
                );
            case "search":
                return (
                    <SearchCircleIcon
                        className="h-5 w-5 text-gray-700"
                        aria-hidden="true"
                    />
                );
            default:
                return <div>O</div>;
        }
    };

    return (
        <div className="flex my-3.5 items-end">
            <div className="mx-2">{renderIcon(icon)}</div>
            <div className="mx-2 font-medium text-md">{name}</div>
            <div className="mx-3 text-dtech-secondary-dark text-xl font-semibold">{value}</div>
        </div>
    );
};

const SummaryStatistics = () => {
    const vm = useContext(DatasetDetailVMContext);
    const dataset = vm.dataset;
    if (!dataset) return <div />;
    // LIKES start
    const totalLikes = dataset?.detail.likes;
    const totalDislikes = dataset?.detail.dislikes;
    let likePercent = 0;
    if (totalDislikes + totalLikes) {
        likePercent = Number(
            ((totalLikes / (totalDislikes + totalLikes)) * 100).toFixed(0)
        );
    }
    // LIKES end

    return (
        <div>
            <div className="text-xs font-light text-gray-500">
                High level statistical insights
            </div>
            <div className="flex justify-around">
                <div className="bg-gray-100 border-gray-200 border-[1.5px] my-5 mx-3 px-5 py-3">
                    <SummaryRow
                        icon="heart"
                        name="Added to favorites"
                        value="1"
                    />
                    <SummaryRow icon="download" name="Downloaded" value="1" />
                    <SummaryRow icon="eye" name="Viewed" value="1" />
                    <SummaryRow
                        icon="search"
                        name="Displayed in search results"
                        value="1"
                    />
                </div>
            </div>
        </div>
    );
};

export default SummaryStatistics;
