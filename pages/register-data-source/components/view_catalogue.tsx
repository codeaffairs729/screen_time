import { useContext, useEffect, useState } from "react";
import { ViewCatalogueVMContext } from "../view_catalogue.vm";
import Pagination from "components/UI/pagination_for_datasets";

const Catalogue = () => {
    // const [currentSlide, setCurrentSlide] = useState(0);

    const {
        fetchCatalogue,
        catalouge,
        isFetchingCatalouge,
        totalPages,
        pageNo,
        setPageNo,
    } = useContext(ViewCatalogueVMContext);

    useEffect(() => {
        fetchCatalogue();
    }, [pageNo]);

    if (isFetchingCatalouge) {
        return null;
    }

    return (
        <div className="mt-20" >
            <div className="overflow-auto md:overflow-x-hidden ">
                <table
                    className=" w-full h-full "
                    // style={{ transform: `translateX(-${currentSlide * 16}%)` }}
                >
                    <thead className="text-xs sm:text-sm md:text-[19px] text-[#333333]">
                        <tr className="">
                            <th className="sm:w-[17%] p-2 border-r-[1px] sm:border-r-0  w-1/2 text-left  pb-4 min-w-[130px]">
                                Data Host Name
                            </th>
                            <th className="sm:w-[17%] p-2  text-center pb-4">
                                Data Host URL
                            </th>
                            <th className="sm:w-[17%] p-2  text-center pb-4">
                                Data Management System
                                {/* Data Host
                                <br />
                                <span className="font-[400] text-[14px]">
                                    (own data and/or other&apos;s data)
                                </span> */}
                            </th>
                            <th className="sm:w-[17%] p-2  text-center pb-4">
                                Available On Dtechtive?
                            </th>
                        </tr>
                    </thead>
                    <tbody className=" sm:border-t-[1px] border-black text-[#727272] sm:text-sm md:text-[19px]">
                        {catalouge?.data_sources?.map((catalouge_item: any, index: number) => (
                            <tr className=" border-b-[1px] h-14" key={index}>
                                <td className=" p-2  border-r-[1px] sm:border-r-0  w-1/2 min-w-[120px] sm:w-[17%]">
                                    {catalouge_item.site_name}
                                </td>
                                <td className="underline underline-offset-2 sm:w-[17%] p-2   min-w-[100px] text-center">
                                    {catalouge_item.site_url}
                                </td>
                                <td className="sm:w-[17%] p-2   text-center">
                                    {catalouge_item.data_management_system}
                                </td>
                                <td className="sm:w-[17%] p-2   text-center">
                                    {catalouge_item.scraper_id ? "Yes" : "No"}
                                </td>
                                {/* <td className="sm:w-[17%] p-2 text-xs sm:text-sm text-center">
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className=" flex flex-col pt-4">
                {/* <div className=" sm:hidden flex flex-row w-full items-center justify-center">
                    {[1, 2, 3].map((item, index) => (
                        <div
                            key={index}
                            className={` rounded-full w-3 h-3 m-1 ${
                                index === currentSlide
                                    ? "bg-dtech-dark-teal"
                                    : "bg-[#D9D9D9]"
                            }`}
                            // onClick={() => handleDotClick(index)}
                        ></div>
                    ))}
                </div> */}

                <div className=" flex flex-row items-center justify-center">
                    <Pagination
                        currentPage={pageNo}
                        setPageNumber={setPageNo}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
};
export default Catalogue;
