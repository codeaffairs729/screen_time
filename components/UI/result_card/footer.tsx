import clsx from "clsx";
import LabelledRow from "components/dataset/labelled_row";
import DataStat from "./data_stat";
import { DateTime } from "luxon";
import { DataStats } from "models/organisation.model";
import Link from "next/link";
import { Data } from ".";

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
        <div
            className={clsx(
                "flex items-center justify-between w-full my-1.5",
                className
            )}
        >
            {stats && (
                <div className="flex">
                    <DataStat stats={stats} />
                </div>
            )}
            <div className="flex flex-wrap justify-start items-center">
                {dataProviders && (
                    <>
                        <Link href={`${dataProviders?.datasetSource}`}>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-medium hover:underline underline-offset-2 text-dtech-main-dark"
                            >
                                Source
                            </a>
                        </Link>
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
                    </>
                )}
                <LabelledRow
                    className="mr-10"
                    label="Domains"
                    labelClasses="!text-sm mr-1"
                >
                    <div className="flex flex-wrap">
                        {domains.map((domain: any, index: number) => (
                            <span
                                key={index}
                                className="text-sm underline decoration-1 mr-1"
                            >
                                {createTag(domain)}
                            </span>
                        ))}
                    </div>
                </LabelledRow>
                <LabelledRow
                    className="mr-10"
                    label="Topics"
                    labelClasses="!text-sm mr-1"
                >
                    <div className="flex flex-wrap">
                        {topics.map((topic: any, index: number) => (
                            <span
                                key={index}
                                className="text-sm underline decoration-1 mr-1 truncate"
                            >
                                {createTag(topic)}
                            </span>
                        ))}
                    </div>
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
            </div>
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
