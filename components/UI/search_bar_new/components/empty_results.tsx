const EmptyResults = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <>
            {isLoading && (
                <div className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-700 text-sm">
                    Loading...
                </div>
            )}
        </>
    );
};

export default EmptyResults;
