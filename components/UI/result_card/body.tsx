import LabelledRow from "components/dataset/labelled_row";
import { useState } from "react";
import { Data } from ".";

const CardBody = ({ data }: { data: Data }) => {
    const { topics, domains, description } = data;
    const [more, setMore] = useState(true);
    return (
        <div
            className={`${
                more ? "max-h-16" : "max-h-[100vh] "
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
