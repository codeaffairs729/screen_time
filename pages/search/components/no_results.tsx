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
            <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">{message}</span>
                <ul className="mt-1.5 ml-4 text-blue-700 list-disc list-inside">
                    {subMessages?.map((subMessage: string) => (
                        <li>{subMessage}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default NoResults;
