import clsx from "clsx";
import LabelledRow from "components/dataset/labelled_row";
import DatasetStat, { DataStats } from "./dataset_stat";
import { DateTime } from "luxon";

export interface DataProviders {
    organisation: string;
    hostName: string;
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
    return (
        <div
            className={clsx(
                "flex items-center justify-between w-full my-1.5",
                className
            )}
        >
            {stats && (
                <div className="flex">
                    <DatasetStat stats={stats} />
                </div>
            )}
            {dataProviders && (
                <div className="flex flex-row w-1/2 justify-start">
                    <LabelledRow
                        label="Data Owner"
                        className="mr-12"
                        labelClasses="font-normal text-m"
                        childClasses="font-medium text-m"
                    >
                        {dataProviders.organisation &&
                            dataProviders.organisation}
                    </LabelledRow>
                    <LabelledRow
                        label="Data Host"
                        labelClasses="font-normal text-m"
                        childClasses="font-medium text-m"
                    >
                        {dataProviders.hostName}
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
