import LabelledRow from "components/dataset/labelled_row";
import { useState } from "react";
import { Data } from ".";
import MetaRating from "../metaRating";
import { useRouter } from "next/router";

const CardBody = ({ data, handleFAQClick }: { data: Data; handleFAQClick?: Function; }) => {
    const { topics, domains, description } = data;
    const [more, setMore] = useState(true);
    const {
        dataQuality
    } = data;
    const router = useRouter();
    return (
        <>
            {/* <MetaRating
                dataQuality={dataQuality}
                displayContext={"displayContext"}
                labelClass="font-normal"
                className="!flex-row items-center !font-medium !text-lg"
                infoClassName="!text-dtech-new-main-light top-0 m-[1px] !ml-[5px]"
                starClassName="!text-dtech-new-main-light"
                title={
                    "Estimated based on the European Commission's Metadata Quality Assessment method."
                }
                handleFAQClick={() => {
                    handleFAQClick
                        ? handleFAQClick()
                        : router.push({
                            pathname: `/faq`,
                        });
                }}
            /> */}
            <div
                className={`${more ? "max-h-16" : "max-h-[100vh] "
                    } overflow-hidden transition-all duration-1000 ease-in-out w-full`}
            >
                <p className="text-sm  text-gray-800 my-1.5">
                    {description?.length > 300 ? (
                        <span>
                            {more
                                ? description.replace(/^(.{200}[^\s]*).*/, "$1")
                                : description}
                            <span
                                onClick={() => setMore(!more)}
                                className=" cursor-pointer hover:text-black hover:font-bold"
                            >
                                {more ? " ...more" : " ...less"}
                            </span>
                        </span>
                    ) : (
                        description
                    )}
                </p>
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

export default CardBody;
