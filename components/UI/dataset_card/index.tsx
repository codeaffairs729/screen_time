import CardBody from "./body";
import CardFooter, { DataProviders } from "./footer";
import CardHead from "./head";
import { DateTime } from "luxon";
import { DataStats } from "./dataset_stat";

export interface Dataset {
    id: number | string;
    title: string;
    description: string;
    dataQuality: number;
    // favourite: boolean;
    // bookmark: boolean;
    buttonTags: string[];
    topics: string[];
    domains: string[];
}

interface DatasetCardProps {
    data: Dataset;
    onFavourite: Function;
    handleBookmark: Function;
    handleShare: Function;
    lastUpdate: DateTime;
    stats?: DataStats;
    href: string;
    handleFAQClick?: Function;
    dataProviders?: DataProviders;
}

//TODO update the object of data in props to have both stats and dataProviders

const DatasetCard = ({
    data,
    stats,
    href,
    onFavourite,
    handleBookmark,
    handleShare,
    lastUpdate,
    handleFAQClick,
    dataProviders,
}: DatasetCardProps) => {
    return (
        <div className="rounded-lg sm:px-2 md:px-5 py-1 flex flex-row justify-between bg-dtech-light-grey hover:bg-dtech-main-light ml-2 mr-4 my-2">
            <div className="flex flex-col flex-1">
                <CardHead
                    href={href}
                    handleFAQClick={handleFAQClick}
                    dataset={data}
                    onFavourite={onFavourite}
                    handleBookmark={handleBookmark}
                    handleShare={handleShare}
                />
                <CardBody dataset={data} />
                <CardFooter
                    dataProviders={dataProviders}
                    stats={stats}
                    lastUpdate={lastUpdate}
                />
            </div>
        </div>
    );
};

export default DatasetCard;
