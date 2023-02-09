import LabelledRow from "components/dataset/labelled_row";
import { useState } from "react";
import { Data } from ".";

const CardBody = ({ data }: { data: Data }) => {
    const { topics, domains, description } = data;
    const [more, setMore] = useState(true);
    return (
        <div>
            <div
                className={`${
                    more ? "max-h-16" : "max-h-[100vh] "
                } overflow-hidden transition-all duration-1000 ease-in-out`}
            >
                <p className="text-sm  text-gray-800 my-1.5">
                    {description?.length > 300 ? (
                        <span>
                            <span>
                                {more
                                    ? description.replace(
                                          /^(.{200}[^\s]*).*/,
                                          "$1"
                                      )
                                    : description}
                                <span
                                    onClick={() => setMore(!more)}
                                    className=" cursor-pointer hover:text-black hover:font-bold"
                                >
                                    {more ? " ...more" : " ...less"}
                                </span>
                            </span>
                        </span>
                    ) : (
                        description
                    )}
                </p>
            </div>
            <div className="flex my-1.5">
                <LabelledRow
                    className="mr-10"
                    label="Domains"
                    labelClasses="!text-sm"
                >
                    {domains.map((domain: any, index: number) => (
                        <span
                            key={index}
                            className="w-14 h-4 text-sm underline decoration-1 p-1.5"
                        >
                            {createTag(domain)}
                        </span>
                    ))}
                </LabelledRow>
                <LabelledRow
                    className="mr-10"
                    label="Topics"
                    labelClasses="!text-sm"
                >
                    {topics.map((topic: any, index: number) => (
                        <span
                            key={index}
                            className="w-14 h-4 text-sm underline decoration-1 p-1.5"
                        >
                            {createTag(topic)}
                        </span>
                    ))}
                </LabelledRow>
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

export default CardBody;
