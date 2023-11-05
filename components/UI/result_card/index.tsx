import CardBody from "./body";
import CardFooter from "./footer";
import CardHead from "./head";
import { DateTime } from "luxon";
import { useState } from "react";
import { DataStats } from "models/organisation.model";
import NewResultCardAction from "../new_result_card_action";
import DataProviderCardHead from "./data_provider/head";
import DataProviderCardFooter from "./data_provider/footer";


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
    imgUrl?: string;
}

interface ResultCardProps {
    data: Data;
    handleFAQClick?: Function;
    hideResultCard?: boolean;
    showToolTip?: boolean;
    className?: string;
    pageName?: string;
    label?: string;
}

//TODO update the object of data in props to have both stats and dataProviders

const ResultCard = ({
    data,
    handleFAQClick,
    hideResultCard,
    showToolTip = true,
    className = "",
    pageName = "",
    label = "",
}: ResultCardProps) => {
    const [resultRecord, setResultRecord] = useState(data);
    const [cardClicked, setCardClicked] = useState(false);
    const [cardHover, setCardHover] = useState(false);
    const { dataProviders, stats, lastUpdate } = data || {};
    const href = `/${
        resultRecord.recordType ? resultRecord.recordType : "datasets"
    }/${resultRecord.id}`;

    return (
        <div
            onMouseUp={() => pageName === "workspace" && setCardClicked(false)}
            onMouseDown={(e) =>
                pageName === "workspace" && setCardClicked(true)
            }
            onMouseEnter={(e) => pageName === "workspace" && setCardHover(true)}
            onMouseLeave={(e) =>
                pageName === "workspace" && setCardHover(false)
            }
        >
            <div className="md:hidden ">
                {pageName === "workspace" && (
                    <div
                        className={` bg-dtech-new-main-light text-white items-center text-xs `}
                    >
                        <div className=" text-sm font-medium whitespace-nowrap px-3 py-1">
                            {label.split("_").join(" ").toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
            <div
                className={`${className} rounded-lg px-5 py-1.5 flex flex-row justify-between  w-full min-w my-2 border-r-8  border-transparent  hover:border-[#6DCDCB] active:border-dtech-main-dark ${
                    hideResultCard
                        ? " shadow-underline"
                        : "border-gray-100 shadow-custom-2"
                }`}
            >
                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex flex-col flex-1 w-full my-3">
                        {getResultCards(
                            label,
                            handleFAQClick,
                            resultRecord,
                            setResultRecord,
                            dataProviders,
                            showToolTip,
                            data
                        )}
                    </div>
                    {!hideResultCard && (
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
                                    // cardClicked={cardClicked}
                                    // cardHover={cardHover}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {pageName === "workspace" && (
                    <div
                        className={` bg-dtech-new-main-light 
                        ${
                            cardHover && "bg-[#6DCDCB]"
                        }  text-white hidden flex-col justify-center items-center w-[24px] md:flex  ${
                            label === "datasets" ? "rounded-r-lg" : ""
                        }`}
                    >
                        <div className=" transform -rotate-90 text-base font-bold whitespace-nowrap">
                            {label.split("_").join(" ").toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultCard;

const getResultCards = (
    label: string,
    handleFAQClick: any,
    resultRecord: any,
    setResultRecord: any,
    dataProviders: any,
    showToolTip: any,
    data: any
) => {
    switch (label) {
        case "datasets":
            return (
                <>
                    <CardHead
                        handleFAQClick={handleFAQClick}
                        data={resultRecord}
                        setData={setResultRecord}
                        datasetSource={dataProviders?.datasetSource}
                        showToolTip={showToolTip}
                        // cardClicked={cardClicked}
                        // cardHover={cardHover}
                    />
                    <CardBody
                        data={resultRecord}
                        handleFAQClick={handleFAQClick}
                    />
                    <CardFooter
                        data={data}
                        // cardClicked={cardClicked}
                        // cardHover={cardHover}
                    />
                </>
            );
        case "data_provider":
            return (
                <>
                    {
                        <DataProviderCardHead
                            handleFAQClick={handleFAQClick}
                            data={resultRecord}
                            setData={setResultRecord}
                            datasetSource={dataProviders?.datasetSource}
                            showToolTip={showToolTip}
                            // cardClicked={cardClicked}
                            // cardHover={cardHover}
                        />
                    }
                    <CardBody
                        data={resultRecord}
                        handleFAQClick={handleFAQClick}
                    />
                    <DataProviderCardFooter
                        data={data}
                        // cardClicked={cardClicked}
                        // cardHover={cardHover}
                    />
                </>
            );
        case "topic":
            return (
                <>
                    {
                        <DataProviderCardHead
                            handleFAQClick={handleFAQClick}
                            data={resultRecord}
                            setData={setResultRecord}
                            datasetSource={dataProviders?.datasetSource}
                            showToolTip={showToolTip}
                            // cardClicked={cardClicked}
                            // cardHover={cardHover}
                        />
                    }
                    <CardBody
                        data={resultRecord}
                        handleFAQClick={handleFAQClick}
                    />
                    <DataProviderCardFooter
                        data={data}
                        // cardClicked={cardClicked}
                        // cardHover={cardHover}
                    />
                </>
            );
        default:
            return (
                <>
                    <CardHead
                        handleFAQClick={handleFAQClick}
                        data={resultRecord}
                        setData={setResultRecord}
                        datasetSource={dataProviders?.datasetSource}
                        showToolTip={showToolTip}
                        // cardClicked={cardClicked}
                        // cardHover={cardHover}
                    />
                    <CardBody
                        data={resultRecord}
                        handleFAQClick={handleFAQClick}
                    />
                    <CardFooter
                        data={data}
                        // cardClicked={cardClicked}
                        // cardHover={cardHover}
                    />
                </>
            );
    }
};
