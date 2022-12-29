import CardBody from "./body";
import CardFooter, { DataProviders } from "./footer";
import CardHead from "./head";
import { DateTime } from "luxon";
import { DataStats } from "./dataset_stat";

export interface Data {
    id: number | string;
    title: string;
    description: string;
    dataQuality: number;
    buttonTags: string[];
    topics: string[];
    domains: string[];
    dataProviders?: DataProviders;
    stats?: DataStats;
    recordType: string;
    lastUpdate: DateTime;
}

interface ResultCardProps {
    data: Data;
    onFavourite: Function;
    handleBookmark: Function;
    handleShare: Function;
    handleFAQClick?: Function;
}

//TODO update the object of data in props to have both stats and dataProviders

const ResultCard = ({
    data,
    onFavourite,
    handleBookmark,
    handleShare,
    handleFAQClick,
}: ResultCardProps) => {
    const { dataProviders, stats, lastUpdate } = data || {};
    return (
        <div className="rounded-lg sm:px-2 md:px-5 py-1 flex flex-row justify-between bg-dtech-light-grey hover:bg-dtech-main-light ml-2 mr-4 my-2">
            <div className="flex flex-col flex-1">
                <CardHead
                    handleFAQClick={handleFAQClick}
                    data={data}
                    onFavourite={onFavourite}
                    handleBookmark={handleBookmark}
                    handleShare={handleShare}
                />
                <CardBody data={data} />
                <CardFooter
                    dataProviders={dataProviders}
                    stats={stats}
                    lastUpdate={lastUpdate}
                />
            </div>
        </div>
    );
};

export default ResultCard;
