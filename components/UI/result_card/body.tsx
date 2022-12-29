import LabelledRow from "components/dataset/labelled_row";
import { Data } from ".";

const CardBody = ({ data }: { data: Data }) => {
    const { topics, domains, description } = data;

    return (
        <div>
            <p className="text-sm  text-gray-800 my-1.5">
                {description.length > 300 ? (
                    <span>
                        <span>
                            {description.replace(/^(.{200}[^\s]*).*/, "$1")}
                        </span>
                        <span>...more</span>
                    </span>
                ) : (
                    description
                )}
            </p>
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
