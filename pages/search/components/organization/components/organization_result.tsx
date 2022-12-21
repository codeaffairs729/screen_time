import { useState } from "react";
import DatasetCard from "components/UI/dataset_card";
import { DateTime } from "luxon";

const OrganizationResult = ({ dataset }: { dataset: any }) => {
    const [favourite, setFavourite] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [popup, setPopup] = useState(false);
    const onFavourite = () => {
        console.log("onfavoutrite favourite ", favourite);
        favourite ? setFavourite(false) : setFavourite(true);
    };
    const handleBookmark = () => {
        console.log("onBookmark bookmark", bookmark);
        bookmark ? setBookmark(false) : setBookmark(true);
    };

    const handleShare = () => {
        popup ? setPopup(false) : setPopup(true);
    };

    const {
        id,
        title,
        description,
        dataQuality,
        buttonTags,
        topics,
        domains,
        stats,
    } = dataset;

    return (
        <DatasetCard
            data={{
                id,
                title,
                description,
                dataQuality,
                buttonTags,
                topics,
                domains,
            }}
            href={`/organisation/${dataset.id}`}
            lastUpdate={DateTime.fromISO(new Date("12-16-2022").toISOString())}
            stats={stats}
            onFavourite={onFavourite}
            handleBookmark={handleBookmark}
            handleShare={handleShare}
        />
    );
};

export default OrganizationResult;
