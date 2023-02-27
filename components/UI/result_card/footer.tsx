import clsx from "clsx";
import LabelledRow from "components/dataset/labelled_row";
import DataStat from "./data_stat";
import { DateTime } from "luxon";
import { DataStats } from "models/organisation.model";
import Link from "next/link";

export interface DataProviders {
    organisation: string;
    hostName: string;
    hostUuid?: string;
    ownerUuid?: string;
    hostUrl?: string;
}

const CardFooter = ({
    stats,
    dataProviders,
    lastUpdate,
    className = "",
}: {
    stats?: DataStats;
    dataProviders?: DataProviders;
    lastUpdate: DateTime;
    className?: string;
}) => {
    console.log("dataProviders :",dataProviders)
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
            {dataProviders && (
                <div className="flex flex-row w-1/2 justify-start">
                    <Link href={`${dataProviders.hostUrl}`}>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            className="text-m underline mr-5 text-dtech-main-dark"
                        >
                            Source
                        </a>
                    </Link>
                    <LabelledRow
                        label="Owner"
                        className="mr-12"
                        labelClasses="font-normal text-m"
                        childClasses="font-medium text-m"
                    >
                        <Link href={`/organisation/${dataProviders?.ownerUuid}`}>
                            {dataProviders.organisation &&
                                dataProviders.organisation}
                        </Link>
                    </LabelledRow>
                    <LabelledRow
                        label="Host"
                        labelClasses="font-normal text-m"
                        childClasses="font-medium text-m"
                    >
                        <Link href={`/organisation/${dataProviders?.hostUuid}`}>
                            {dataProviders.hostName}
                        </Link>
                    </LabelledRow>
                </div>
            )}
            {lastUpdate?.isValid && (
                <div className="flex my-1.5">
                    <span className="text-sm mr-1">Updated</span>
                    <span className="text-sm font-medium">
                        {lastUpdate.toRelative()}
                    </span>
                </div>
            )}
        </div>
    );
};

export default CardFooter;
