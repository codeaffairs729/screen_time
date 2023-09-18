import CardBody from "./body";
import CardFooter from "./footer";
import CardHead from "./head";
import { DateTime } from "luxon";
import { useState } from "react";
import { DataStats } from "models/organisation.model";
import ResultCardAction from "../result_card_action";
import NewResultCardAction from "../new_result_card_action";

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
    url?: string;
    urls?: any;
}

interface ResultCardProps {
    data: Data;
    handleFAQClick?: Function;
}

//TODO update the object of data in props to have both stats and dataProviders

const ResultCard = ({ data, handleFAQClick }: ResultCardProps) => {
    const [resultRecord, setResultRecord] = useState(data);
    const { dataProviders, stats, lastUpdate } = data || {};
    const href = `/${
        resultRecord.recordType ? resultRecord.recordType : "datasets"
    }/${resultRecord.id}`;

    return (
        <div className="rounded-lg px-5 py-1.5 flex flex-row justify-between border-gray-100 border-r-8 border-transparent w-full min-w my-2 shadow-custom-2 hover:border-[#6DCDCB] active:border-dtech-main-dark">
            <div className="flex flex-col md:flex-row justify-between w-full">
                <div className="flex flex-col flex-1 w-full my-3">
                    <CardHead
                        handleFAQClick={handleFAQClick}
                        data={resultRecord}
                        setData={setResultRecord}
                        datasetSource={dataProviders?.datasetSource}
                    />
                    <CardBody
                        data={resultRecord}
                        handleFAQClick={handleFAQClick}
                    />
                    <CardFooter
                        data={data}
                        // stats={stats}
                        // lastUpdate={lastUpdate}
                    />
                </div>
                <div className=" md:flex md:flex-row">
                    <div className="mx-1 my-3 md:mx-3 md:my-2 border border-1 "></div>
                    <div className="flex ">
                        <NewResultCardAction
                            data={{
                                ...resultRecord,
                                url: dataProviders?.datasetSource,
                            }}
                            setData={setResultRecord}
                            href={href}
                            className="flex-row md:flex-col items-center justify-center md:py-8 w-full md:mx-5 mx-0 max-h-min"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
