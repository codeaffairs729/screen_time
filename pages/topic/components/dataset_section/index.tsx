import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import Pagination from "components/UI/pagination_for_datasets";
import UpgradeAccountModal from "pages/organisation/components/upgrade_modal";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { TopicDetailVMContext } from "pages/topic/topic_detail.vm";
import { useContext, useEffect, useState } from "react";
// import { DatasetTopicVMContext } from "./dataset_topic.vm";

const DatasetSection = () => {
    const {
        fetchDatasetByTopic,
        datasetByTopic,
        pageSize,
        errorDatasetByTopic,
        isFetchingDatasetByTopic,
        pageNumber,
        setPageNumber
    } = useContext(TopicDetailVMContext);
    const { permittedPermissions } = useContext(TopicDetailVMContext)
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        fetchDatasetByTopic();
    }, []);
    const handleDotClick = (index: any) => {
        setCurrentSlide(index);
    };

    if (errorDatasetByTopic) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching Organisation Datasets data. Please try again later"
            />
        );
    }

    if (!datasetByTopic) {
        return (
            <div className="text-sm text-dtech-dark-grey">
                No datasets to show currently
            </div>
        );
    }
    if (isFetchingDatasetByTopic) {
        return (
            <div className="h-full w-full flex items-center justify-center mt-24">
                <Loader />
            </div>
        );
    }
    const totalPages = Math.ceil(datasetByTopic?.total_matches / pageSize);

    return (
        <div className="relative">
            <div className="" key={currentSlide}>
                <div className="sm:overflow-auto overflow-x-hidden">
                    <table
                        className=" w-full h-full "
                        style={{
                            transform: `translateX(-${currentSlide * 16}%)`,
                        }}
                    >
                        <thead className="">
                            <tr className="">
                                <th className="sm:w-[32%] p-2 text-xs border-r-[1px] sm:border-r-0 sm:text-sm w-1/2 text-left  pb-4 min-w-[130px]">
                                    Dataset Title(
                                    {datasetByTopic?.total_matches})
                                </th>
                                <th className="sm:w-[17%] p-2 text-xs sm:text-sm min-w-[130px] text-center pb-4">
                                    Last Updated
                                </th>
                                <th className="sm:w-[17%] p-2 text-xs sm:text-sm text-center pb-4">
                                    Views
                                </th>
                                <th className="sm:w-[17%] p-2 text-xs sm:text-sm text-center pb-4">
                                    Downloads
                                </th>
                                <th className="sm:w-[17%] p-2 text-xs sm:text-sm text-center pb-4">
                                    Likes
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" sm:border-t-[1px] border-black">
                            {datasetByTopic?.datasets?.map(
                                (item: any, index: any) => (
                                    <tr
                                        className=" border-b-[1px] h-14 hover:bg-dtech-light-gray"
                                        key={index}
                                    >
                                        <td className="underline  p-2 text-xs border-r-[1px] sm:border-r-0 sm:text-sm w-1/2 min-w-[120px] sm:w-[32%]">
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/datasets/${item.id}`}
                                                className="text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black"
                                            >
                                                {item.title}
                                            </a>
                                        </td>
                                        <td className="sm:w-[17%] p-2 text-xs sm:text-sm min-w-[100px] text-center">
                                            {new Date(
                                                item.last_updated
                                            ).toLocaleDateString("en-GB")}
                                        </td>
                                        <td className="sm:w-[17%] p-2 text-xs sm:text-sm text-center">
                                            {item.views}
                                        </td>
                                        <td className="sm:w-[17%] p-2 text-xs sm:text-sm text-center">
                                            {item.downloads}
                                        </td>
                                        <td className="sm:w-[17%] p-2 text-xs sm:text-sm text-center">
                                            {item.likes}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                <div className=" flex flex-col pt-4">
                    <div className=" sm:hidden flex flex-row w-full items-center justify-center">
                        {[1, 2, 3].map((item, index) => (
                            <div
                                key={index}
                                className={` rounded-full w-3 h-3 m-1 ${
                                    index === currentSlide
                                        ? "bg-dtech-dark-teal"
                                        : "bg-[#D9D9D9]"
                                }`}
                                onClick={() => handleDotClick(index)}
                            ></div>
                        ))}
                    </div>

                    <div className=" flex flex-row items-center justify-center">
                        <Pagination
                            currentPage={pageNumber}
                            setPageNumber={setPageNumber}
                            totalPages={totalPages}
                        />
                        {/* <button className=" flex flex-row items-center justify-center text-dtech-main-dark" onClick={() => setPageNumber(pageNumber + 1)}>
                        <div>Next</div> <BsChevronRight className="text-dtech-main-dark" />
                    </button> */}
                    </div>
                </div>
            </div>
            {!permittedPermissions.includes(
                "topicInsights.datasets.view"
            ) && (
                <div className=" absolute top-0 left-0 w-full h-full">
                    <UpgradeAccountModal />
                </div>
            )}
        </div>
    );
};
export default DatasetSection;
