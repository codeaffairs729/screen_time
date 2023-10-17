import clsx from "clsx";
import DataStat from "./../data_stat";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Data } from "..";
import LabelledRow from "components/dataset/labelled_row";
import { DateTime } from "luxon";

const DataProviderCardFooter = ({
    data,
    className = "",
}: {
    data: any;
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
        <>
            <div className={clsx("w-full ", className)}>
                <div>
                    {(router.pathname == "/search" ||
                        router.pathname == "/datasets/[id]" ||
                        router.pathname.includes("/workspace")) && (
                        <MetaInfoEntity
                            entityName="File Type"
                            entities={getFileFormatCounts(data.urls)}
                        />
                    )}
                </div>
                {stats && (
                    <div className="my-3 flex flex-col md:flex-row justify-between md:items-center bg-[#EBEBEB] px-1.5">
                        <DataStat stats={stats} />
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row justify-start items-start my-0.5">
                <MetaInfoEntity entityName="Domains" entities={domains} />
                <MetaInfoEntity entityName="Topics" entities={topics} />
            </div>
            <div className="md:flex hidden">
                <div
                    className={` flex flex-col md:flex-row justify-between md:items-center px-1.5  my-1  
                `}
                >
                    {DateTime.fromISO(lastUpdate)?.isValid && (
                        <LabelledRow
                            className={` ${
                                router.pathname != "/datasets/[id]"
                                    ? "!mr-10"
                                    : "mr-1"
                            }`}
                            label="Last updated"
                            labelClasses="!text-sm mr-1  font-normal text-[#333333]"
                            childClasses="text-[#727272]"
                        >
                            <span className="text-sm">
                                {DateTime.fromISO(lastUpdate).toRelative()}
                            </span>
                        </LabelledRow>
                    )}
                </div>
            </div>
        </>
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
        <div className="flex mr-8 w-full " ref={myRef}>
            {entities && entities.length > 0 && (
                // <div className="flex flex-row space-x-2  w-full ">
                <div className="flex w-full items-center sm:justify-start justify-between">
                    <div className=" min-w-max">
                        <span className="sm:text-sm text-md font-normal m-1 text-[#333333] ">
                            {entityName}
                        </span>
                        <span
                            onClick={() => setViewAll(!viewAll)}
                            className=" underline sm:text-sm text-md cursor-pointer text-[#0065BD]"
                        >
                            View all
                        </span>
                    </div>
                    <div className="flex flex-wrap flex-row  max-w-xs ml-2 ">
                        {entities.map((entity, index) => {
                            if (index < 2)
                                return (
                                    <span
                                        key={index}
                                        className="sm:text-sm text-md text-white m-1 bg-dtech-new-main-light rounded p-1 px-2 !pt-0"
                                    >
                                        {entity}
                                    </span>
                                );
                        })}
                    </div>
                    {
                        <div
                            onClick={handleSearchBlur}
                            className={
                                viewAll
                                    ? ` bg-black fixed opacity-50 h-[3000px] top-0 left-0 right-0 bottom-0 sm:h-[3000px]  w-screen flex items-center  z-20`
                                    : "hidden"
                            }
                        ></div>
                    }
                    {viewAll && (
                        <div className="flex flex-wrap flex-row px-6 py-4 sm:w-[616px] w-xs bg-white absolute z-20 rounded-xl border-[2px] border-[#6DCDCB]">
                            <div className="flex justify-between w-full pb-4">
                                <div>{entityName}</div>
                                <div
                                    className=" cursor-pointer"
                                    onClick={() => setViewAll(!viewAll)}
                                >
                                    <img src="/images/provider-detail-page/close.svg" />
                                </div>
                            </div>
                            {entities.map((entity, index) => {
                                return (
                                    <span
                                        key={index}
                                        className="text-sm text-white m-1 bg-dtech-new-main-light rounded p-1 px-2 !pt-0"
                                    >
                                        {entity}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
                // </div>
            )}
        </div>
    );
};
export default DataProviderCardFooter;
