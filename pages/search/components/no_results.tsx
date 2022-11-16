import { FaInfoCircle } from "react-icons/fa";

const NoResults = ({
    message,
    subMessages,
}: {
    message: string;
    subMessages?: string[];
}) => {
    return (
        <div
            className="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg"
            role="alert"
        >
            <FaInfoCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">{message}</span>
                <ul className="mt-1.5 ml-4 text-blue-700 list-disc list-inside">
                    {subMessages?.map((subMessage: string, index: number) => (
                        <li key={index}>{subMessage}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default NoResults;
