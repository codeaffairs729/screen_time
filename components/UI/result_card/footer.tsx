import clsx from "clsx";
import LabelledRow from "components/dataset/labelled_row";
import DataStat from "./data_stat";
import { DateTime } from "luxon";
import { DataStats } from "models/organisation.model";
import Link from "next/link";
import { Data } from ".";
import Image from "next/image";
// export interface DataProviders {
//     datasetSource: string;
//     ownerUrl: string;
//     organisation: string;
//     hostName: string;
//     hostUuid?: string;
//     ownerUuid?: string;
//     hostUrl?: string;
// }

const CardFooter = ({
    data,
    className = "",
}: {
    data: Data;
    className?: string;
}) => {
    const { dataProviders, stats, lastUpdate, domains, topics } = data;
    return (
        <div className={clsx("w-full my-1.5", className)}>
            <div className="flex flex-wrap justify-start items-center">
                {dataProviders && (
                    <>
                        <LabelledRow
                            className="mr-10"
                            label="Host"
                            labelClasses="!text-sm font-medium mr-1"
                            childClasses="hover:underline underline-offset-2"
                        >
                            <Link href={`${dataProviders.hostUrl}`}>
                                <a
                                    className="text-sm text-dtech-main-dark"
                                    target="_blank"
                                >
                                    {dataProviders.hostName}
                                </a>
                            </Link>
                        </LabelledRow>
                        <LabelledRow
                            className="mr-10"
                            label="Owner"
                            labelClasses="!text-sm font-medium mr-1"
                            childClasses="hover:underline underline-offset-2"
                        >
                            <Link href={`${dataProviders.ownerUrl}`}>
                                <a
                                    className="text-sm text-dtech-main-dark"
                                    target="_blank"
                                >
                                    {dataProviders.organisation &&
                                        dataProviders.organisation}
                                </a>
                            </Link>
                        </LabelledRow>
                        {lastUpdate?.isValid && (
                            // <div className="flex my-1.5">
                            //     <span className="text-sm mr-1">Updated</span>
                            //     <span className="text-sm font-medium">
                            //         {lastUpdate.toRelative()}
                            //     </span>
                            // </div>
                            <LabelledRow
                                className="mr-10"
                                label="Updated"
                                labelClasses="!text-sm mr-1"
                            >
                                <span className="text-sm">
                                    {lastUpdate.toRelative()}
                                </span>
                            </LabelledRow>
                        )}
                    </>
                )}
            </div>
            <div className="flex flex-row justify-start items-start mt-2.5">
                <LabelledRow
                    className="mr-10"
                    label="Domains"
                    labelClasses="!text-sm mr-1"
                >
                    <div className="flex flex-wrap  max-w-xs ">
                        {domains.map((domain: any, index: number) => (
                            <span
                                key={index}
                                className="text-sm px-2 text-black bg-[#F7F0FC] my-0.5 rounded decoration-1 mr-1"
                            >
                                {domain}
                            </span>
                        ))}
                    </div>
                </LabelledRow>
                <LabelledRow
                    className="mr-10"
                    label="Topics"
                    labelClasses="!text-sm mr-1"
                >
                    <div className="flex flex-wrap  max-w-xs ">
                        {topics.map((topic: any, index: number) => (
                            <span
                                key={index}
                                className="text-sm px-2 text-black bg-[#F7F0FC] my-0.5 rounded decoration-1 mr-1 truncate"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </LabelledRow>
            </div>
            {stats && (
                <div className="flex">
                    <DataStat stats={stats} />
                </div>
            )}
        </div>
    );
};

const createTag = (topic: string) => {
    const tag = topic
        .split(/[_\s]/g)
        .map((tag: string) => `${tag[0].toUpperCase()}${tag.slice(1)}`)
        .join("");

    return `#${tag}`;
};

export default CardFooter;
