import CardBody from "./body";
import CardFooter from "./footer";
import CardHead from "./head";
import { DateTime } from "luxon";
import { useState } from "react";
import { DataStats } from "models/organisation.model";

export interface DataProviders {
    datasetSource: string;
    ownerUrl: string;
    organisation: string;
    hostName: string;
    hostUuid?: string;
    ownerUuid?: string;
    hostUrl?: string;
}

export interface Data {
    id: number | string;
    title: string;
    description: string;
    dataQuality: number;
    licenseTypes: string[];
    topics: string[];
    domains: string[];
    dataProviders?: DataProviders;
    stats?: DataStats;
    recordType: string;
    lastUpdate: DateTime;
    isFavourited: boolean;
}

interface ResultCardProps {
    data: Data;
    handleFAQClick?: Function;
}

//TODO update the object of data in props to have both stats and dataProviders

const ResultCard = ({ data, handleFAQClick }: ResultCardProps) => {
    const [resultRecord, setResultRecord] = useState(data);
    const { dataProviders, stats, lastUpdate } = data || {};

    return (
        <div className="rounded-lg px-5 py-1.5 flex flex-row justify-between bg-dtech-light-grey hover:bg-dtech-main-light w-full my-2">
            <div className="flex flex-col flex-1 w-full">
                <CardHead
                    handleFAQClick={handleFAQClick}
                    data={resultRecord}
                    setData={setResultRecord}
                />
                <CardBody data={resultRecord} />
                <CardFooter
                    data={data}
                    // stats={stats}
                    // lastUpdate={lastUpdate}
                />
            </div>
        </div>
    );
};

export default ResultCard;
