import MetaRating from "components/UI/metaRating";
import { DateTime } from "luxon";
import { useContext, useEffect, useRef, useState } from "react";
import DatasetStat from "components/UI/result_card/data_stat";
import NewResultCardAction from "components/UI/new_result_card_action";
import {
    TopicDetailVMContext,
} from "../topic_detail.vm";
import ResultCardAction from "components/UI/result_card_action";
import { topicToResultCardData } from "pages/search/topics/topics.vm";

const TopicHead = () => {
    const { topic, setTopic } = useContext(TopicDetailVMContext);
    const topicCardData = topicToResultCardData([topic])[0];

    const { title, description, stats, lastUpdate, dataQuality } =
        topicCardData;

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="sm:px-10 sm:py-4 px-4  sm:w-3/4 sm:min-w-[75%]">
                {/* <div className="flex }items-center"> */}
                <div className="flex justify-between items-center">
                    <div className=" text-dtech-new-main-light text-xl pb-4 font-semibold">
                        {title}
                    </div>
                    <div className="sm:flex hidden justify-between items-center">
                        <MetaRating
                            className="text-dtech-new-main-light !flex-row items-center"
                            infoClassName="!text-dtech-new-main-light top-0 m-[1px] ml-[5px]"
                            starClassName="!text-dtech-new-main-light"
                            dataQuality={dataQuality}
                            title="Estimated based on the European Commission's Metadata Quality Assessment method."
                        />
                        {/* {buttonTags?.map((tag: string, index: number) => (
                        <fieldset
                            className=" min-h-full px-4 border rounded border-[#5F5F63]  text-xs pb-0.5"
                            key={index}
                        >
                            <legend className="text-xs mr-8">
                                Licence
                            </legend>
                            <div>
                                <label>{`${tag[0].toUpperCase()}${tag.slice(
                                    1
                                )}`}</label>
                            </div>
                        </fieldset>
                    ))} */}
                    </div>
                </div>

                {/* </div> */}
                <div className="sm:hidden flex flex-col bg-[#EBEBEB] p-2">
                    <MetaRating
                        className=" !flex-row justify-between"
                        infoClassName="text-dtech-new-main-light top-0 m-[1px] ml-[4px]"
                        starClassName="text-dtech-new-main-light"
                        dataQuality={dataQuality}
                        title="Estimated based on the European Commission's Metadata Quality Assessment method."
                    />
                    <div>
                        <span className="text-sm text-[#333333] ">
                            Last Updated:{" "}
                        </span>
                        <span className="text-sm font-normal  text-[#727272]">
                            {DateTime.fromISO(lastUpdate).toFormat(
                                "dd MMM yyyy"
                            )}
                        </span>
                    </div>
                </div>
                <div className="my-4">
                    <div className="flex justify-between">
                        <span className="text-sm text-[#727272]">
                            {description}
                        </span>
                    </div>
                    <div className="my-4 bg-[#EBEBEB]">
                        <div className="flex w-full">
                            <DatasetStat stats={stats} />
                        </div>
                    </div>
                </div>

                <div className=" sm:block hidden">
                    <span className="text-sm text-[#333333]">
                        Last Updated:{" "}
                    </span>
                    <span className="text-sm font-medium opacity-70 text-[#727272]">
                        {DateTime.fromISO(lastUpdate).toFormat("dd MMM yyyy")}
                    </span>
                </div>
            </div>
            <div className=" bg-[#2D2D32] bg-opacity-10 sm:w-1 h-[1px] sm:h-auto sm:my-4 mx-4 mb-4 sm:mx-0 sm:mb-0">
                {" "}
            </div>
            <NewResultCardAction
                className="flex-row sm:flex-col items-center justify-center sm:py-8 w-full"
                data={topicCardData}
                setData={setTopic}
                href={`/topic/${topic?.id}}`}
            />
        </div>
    );
};

export default TopicHead;
