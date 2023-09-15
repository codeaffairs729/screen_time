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

    // console.log("description :", description)
    const words = description.split(/\s+/);
    const first30Words = words.slice(0, 30);
    const wordCount = words.length;

    return (
        <>
            <div
                className={`${more ? "max-h-16" : "max-h-[100vh] "
                    } overflow-hidden transition-all duration-1000 ease-in-out w-full`}
            >
                <p className="text-sm  text-gray-800 my-1.5">
                    {wordCount > 30 ? (
                        <span>
                            {more
                                ? first30Words.join(' ')
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
