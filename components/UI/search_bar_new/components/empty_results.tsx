const EmptyResults = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <div className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-700 text-sm">
            {isLoading ? "Loading..." : "Nothing found."}
        </div>
    );
};

export default EmptyResults;
