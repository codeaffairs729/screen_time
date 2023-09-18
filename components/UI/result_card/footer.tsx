import clsx from "clsx";
import LabelledRow from "components/dataset/labelled_row";
import DataStat from "./data_stat";
import { DateTime } from "luxon";
import { DataStats } from "models/organisation.model";
import Link from "next/link";
import { Data } from ".";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const CardFooter = ({
    data,
    className = "",
}: {
    data: Data;
    className?: string;
}) => {
    const { dataProviders, stats, lastUpdate, domains, topics } = data;
    const router = useRouter();

    function getFileFormatCounts(fileArray: Array<{ format: string }>) {
        // Define the type of formatCounts object
        const formatCounts: Record<string, number> = {};

        // Iterate through the array of objects and count the formats
        fileArray?.forEach((file: any) => {
            const format = file.format;

            // If the format exists in the counts object, increment the count; otherwise, set it to 1
            if (formatCounts[format]) {
                formatCounts[format]++;
            } else {
                formatCounts[format] = 1;
            }
        });
        // Create an array of strings with string interpolation
        const result = Object.entries(formatCounts)
            .map(([format, count]) => {
                return `${format.toUpperCase()} (${count})`;
            })
            .filter((data) => !data.includes("NULL"));

        return result;
    }
    return (
        <div className={clsx("w-full ", className)}>
            <div>
                {(router.pathname == "/search" || router.pathname =="/datasets/[id]") && (
                    <MetaInfoEntity
                        entityName="File Type"
                        entities={getFileFormatCounts(data.urls)}
                    />
                )}
            </div>
            {stats && (
                <div className="flex">
                    <DataStat stats={stats} />
                </div>
            )}
        </div>
    );
};

// const createTag = (topic: string) => {
//     const tag = topic
//         .split(/[_\s]/g)
//         .map((tag: string) => `${tag[0].toUpperCase()}${tag.slice(1)}`)
//         .join("");

//     return `#${tag}`;
// };

const MetaInfoEntity = ({
    entityName,
    entities,
}: {
    entityName: string;
    entities: string[] | undefined;
}) => {
    const [viewAll, setViewAll] = useState<boolean>(false);
    const handleSearchFocus = () => {
        setViewAll(true);
    };

    const handleSearchBlur = () => {
        setViewAll(false);
    };
    const myRef = useRef(null);
    useOutsideAlerter(myRef);
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            // Function for click event
            function handleOutsideClick(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setViewAll(viewAll);
                }
            }
            // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
            return () =>
                document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    return (
        <div className="flex sm:mr-8 w-full " ref={myRef}>
            {entities && entities.length > 0 && (
                <div className="flex w-full items-center sm:justify-start justify-between">
                    <div className="flex flex-wrap flex-row  sm:max-w-xs  ml-2 ">
                        {entities.map((entity, index) => {
                            return (
                                <span
                                    key={index}
                                    className="sm:text-xs text-xs text-white m-1 bg-dtech-new-main-light py-0.5 px-2 pt-1"
                                >
                                    {entity}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardFooter;
