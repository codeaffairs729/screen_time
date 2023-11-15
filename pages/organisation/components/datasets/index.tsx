import Accordian from "components/UI/accordian";
import { BsHeartFill, BsFillEyeFill, BsChevronRight } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";
import dataset from "public/images/icons/dataset.svg";
import Table from "../table";
import Image from "next/image";
import { ReactNode, useContext, useEffect, useState } from "react";
import Loader from "components/UI/loader";
import Link from "next/link";
import AllDatasets from "./all_datasets";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import Pagination from "components/UI/pagination_for_datasets";
import UpgradeAccountModal from "../upgrade_modal";

const DisplayDataset = ({
    id,
    title,
    description,
}: {
    id: number;
    title: string;
    description: string;
}) => (
    <div>
        <Link href={`/datasets/${id}`}>
            <span className="text-sm font-medium text-dtech-dark-grey cursor-pointer underline underline-offset-2 break-all">
                {title}
            </span>
        </Link>
        <span className="text-sm text-dtech-dark-grey limit-line break-all">
            {description}
        </span>
    </div>
);

const Datasets = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const {
        organisationRankedDatasets,
        fetchOrganisationRankedDatasets,
        isFetchingOrganisationRankedDatasets,
        error,
    } = useContext(OrganisationDetailVMContext);
    const {
        organisationDatasets,
        incrementOrgDatasetsCount,
        fetchOrganisationDatasets,
        isFetchingOrganisationDatasets,
        orgDatasetsCount,
        errorOrganisationDatasets,
        pageNumber,
        setPageNumber,
        permittedPermissions
    } = useContext(OrganisationDetailVMContext);

    useEffect(() => {
        fetchOrganisationDatasets();
        fetchOrganisationRankedDatasets();
    }, []);
    const handleDotClick = (index: any) => {
        setCurrentSlide(index);
    };

    if (errorOrganisationDatasets || error) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching Organisation Datasets data. Please try again later"
            />
        );
    }

    if (error) {
        return (
            <div className="text-sm text-dtech-dark-grey">
                No datasets to show currently
            </div>
        );
    }
    if (isFetchingOrganisationDatasets) {
        return (
            <div className="h-full w-full flex items-center justify-center mt-24">
                <Loader />
            </div>
        )
    }
    const totalPages = Math.ceil(organisationDatasets?.total_matches / orgDatasetsCount)
    // return <AllDatasets />
    return (
        <div className="relative">

            <div className="" key={currentSlide}>
                <div
                    className="sm:overflow-auto overflow-x-hidden"
                >
                    <table className=" w-full h-full "
                        style={{ transform: `translateX(-${currentSlide * 16}%)` }}
                    >
                        <thead className="">
                            <tr className="">
                                <th className="sm:w-[32%] p-2 text-xs border-r-[1px] sm:border-r-0 sm:text-sm w-1/2 text-left  pb-4 min-w-[130px]">Datasets Title({organisationDatasets?.total_matches})</th>
                                <th className="sm:w-[17%] p-2 text-xs sm:text-sm min-w-[130px] text-center pb-4">Last Updated</th>
                                <th className="sm:w-[17%] p-2 text-xs sm:text-sm text-center pb-4">Views</th>
                                <th className="sm:w-[17%] p-2 text-xs sm:text-sm text-center pb-4">Downloads</th>
                                <th className="sm:w-[17%] p-2 text-xs sm:text-sm text-center pb-4">Likes</th>
                            </tr>
                        </thead>
                        <tbody className=" sm:border-t-[1px] border-black">
                            {organisationDatasets?.datasets?.map((item: any, index: any) => (
                                <tr className=" border-b-[1px] h-14 hover:bg-dtech-light-grey" key={index}>
                                    <td className="underline  p-2 text-xs border-r-[1px] sm:border-r-0 sm:text-sm text-dtech-main-dark w-1/2 min-w-[120px] sm:w-[32%]"><a href={`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}/datasets/${item.id}`}>{item.title}</a></td>
                                    <td className="sm:w-[17%] p-2 text-xs sm:text-sm min-w-[100px] text-center">{new Date(item.last_updated).toLocaleDateString('en-GB')}</td>
                                    <td className="sm:w-[17%] p-2 text-xs sm:text-sm text-center">{item.views}</td>
                                    <td className="sm:w-[17%] p-2 text-xs sm:text-sm text-center">{item.downloads}</td>
                                    <td className="sm:w-[17%] p-2 text-xs sm:text-sm text-center">{item.likes}</td>
                                </tr>
                            ))}
                            {/* Add more rows as needed */}
                            {/* <button onClick={()=>setPageNumber(2)}>2</button> */}

                            {/* <tr className="">
                            <td colSpan={5} className="pt-4">

                            </td>
                        </tr> */}
                        </tbody>
                    </table>
                </div>
                <div className=" flex flex-col pt-4">
                    <div className=" sm:hidden flex flex-row w-full items-center justify-center">
                        {[1, 2, 3].map((item, index) => (
                            <div
                                key={index}
                                className={` rounded-full w-3 h-3 m-1 ${index === currentSlide ? 'bg-dtech-dark-teal' : 'bg-[#D9D9D9]'}`}
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
             {!permittedPermissions.includes("providerInsights.datasets.view")&&<div className=" absolute top-0 left-0 w-full h-full">
                 <UpgradeAccountModal />
             </div>}
         </div>
    );
}
export default Datasets;
