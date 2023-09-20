const LoadingDatasetSearchCard = () => {
    return (
        <>
            {Array(10)
                .fill(1)
                .map((_, index) => (
                    <div
                        key={index}
                        className="rounded-lg px-5 py-1.5 flex flex-row justify-between border-gray-100 border-r-8 border-transparent w-[95%] min-w my-2 shadow-custom-2  ml-10"
                    >
                        <div className="flex flex-col md:flex-row justify-between w-full">
                            <div className="flex flex-col flex-1 w-full my-3">
                                <div className="flex justify-between" id="head">
                                    <div className="lg:flex flex-col w-full mb-3">
                                        <div className="animate-pulse bg-gray-200 rounded-md p-2 w-1/6 h-5"></div>
                                        <div className="animate-pulse mt-3 flex flex-col md:flex-row justify-between md:items-center bg-gray-200 px-1.5 md:py-5 py-2.5">
                                            <div className="animate-pulse bg-gray-200 w-1/4 h-3"></div>
                                            <div className="animate-pulse bg-gray-200 w-1/4 h-3"></div>
                                        </div>
                                    </div>
                                </div>
                                <div id="body">
                                    <div className="animate-pulse my-1 flex flex-col justify-between md:items-center bg-opacity-80 bg-gray-200  px-1.5 md:py-1 py-2.5"></div>
                                    <div className="animate-pulse my-1 flex flex-col justify-between md:items-center bg-opacity-80 bg-gray-200  px-1.5 md:py-1 py-2.5"></div>
                                    <div className="animate-pulse my-1 flex flex-col justify-between md:items-center bg-opacity-80 bg-gray-200  px-1.5 md:py-1 py-2.5"></div>
                                    <div className="animate-pulse my-1 flex flex-col justify-between md:items-center bg-opacity-80 bg-gray-200  px-1.5 md:py-1 py-2.5"></div>
                                </div>
                                <div
                                    className="flex sm:mr-8 w-full "
                                    id="footer"
                                >
                                    <div className="flex w-full items-center sm:justify-start justify-between">
                                        <div className="flex flex-wrap flex-row  sm:max-w-xs  ml-2 ">
                                            {[1, 2, 3, 4].map(
                                                (entity, index) => (
                                                    <div
                                                        key={index}
                                                        className="animate-pulse bg-gray-200 text-gray-200 text-xs m-1 py-2.5 px-4 pt-1 rounded-md"
                                                    ></div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mx-1 my-3 md:mx-3 md:my-2 border border-1 animate-pulse"></div>
                            <div className="grid grid-flow-col md:grid-cols-2 md:grid-flow-row gap-8 md:gap-1">
                                <div className="animate-pulse bg-gray-200 rounded-md p-2 w-16 md:mt-5 md:mb-1"></div>
                                <div className="animate-pulse bg-gray-200 rounded-md p-2 w-16 md:mt-5 md:mb-1"></div>
                                <div className="animate-pulse bg-gray-200 rounded-md p-2 w-16 md:mb-5 md:mt-1"></div>
                                <div className="animate-pulse bg-gray-200 rounded-md p-2 w-16 md:mb-5 md:mt-1 "></div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default LoadingDatasetSearchCard;