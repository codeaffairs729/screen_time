import Accordian from "components/UI/accordian";
import { BsHeartFill, BsFillEyeFill } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";
import dataset from "public/images/icons/dataset.svg";
import Table from "./table";
import Image from "next/image";
import { ReactNode, useContext, useEffect, useState } from "react";
import { OrganisationDetailVMContext } from "../organisation_detail.vm";
import Loader from "components/UI/loader";
import Link from "next/link";
import AllDatasets from "./all_datasets";

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
            <span className="text-sm font-medium text-dtech-dark-grey cursor-pointer break-all">
                {title}
            </span>
        </Link>
        <span className="text-sm text-dtech-dark-grey limit-line break-all">
            {description}
        </span>
    </div>
);

const Datasets = () => {
    const {
        organisationRankedDatasets,
        fetchOrganisationRankedDatasets,
        isFetchingOrganisationRankedDatasets,
    } = useContext(OrganisationDetailVMContext);

    useEffect(() => {
        fetchOrganisationRankedDatasets();
    }, []);

    // const [inc, setInc] = useState(true);

    // if (isLoading && inc) {
    //     setInc(false);
    //     return (
    //         <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
    //             <Loader />
    //         </div>
    //     );
    // }

    return (
        <div className="ml-16">
            <div className="text-sm text-dtech-dark-grey">
                All the datasets of this organisation are listed here.
            </div>
            <div>
                <AllDatasets />
                {Object.keys(organisationRankedDatasets).map(
                    (key: string, index: number) => {
                        return (
                            <Accordian
                                key={index}
                                label={<ItemCard item={getItem(key)} />}
                            >
                                <div className="px-8 pb-4">
                                    {!isFetchingOrganisationRankedDatasets ? (
                                        <Table
                                            tableClass="w-[43rem]"
                                            // onScrollEnd={importOrgDatasets}
                                            tableHeaders={
                                                key == "all_datasets"
                                                    ? ["Dataset"]
                                                    : ["Count", "Dataset"]
                                            }
                                            tableData={getTableData(
                                                key,
                                                organisationRankedDatasets[key]
                                            )}
                                            tableBodyClasses={
                                                key == "all_datasets"
                                                    ? "block h-[220px] overflow-auto"
                                                    : ""
                                            }
                                            cellPadding={3}
                                        />
                                    ) : (
                                        <div className=" mx-80 my-36">
                                            <Loader />
                                        </div>
                                    )}
                                </div>
                            </Accordian>
                        );
                    }
                )}
            </div>
        </div>
    );
};

const ItemCard = ({ item }: { item: { name: string; icon: ReactNode } }) => {
    return (
        <div className="flex items-center jutify-between">
            {item.icon}
            <span className="ml-3">{item.name}</span>
        </div>
    );
};

const getTableData = (key: string, datasets: any) =>
    datasets?.map((dataset: any, index: number) => {
        const datasetCell = (
            <DisplayDataset
                id={dataset?.id}
                key={dataset?.id}
                title={dataset.title}
                description={dataset.description}
            />
        );

        return key == "all_datasets"
            ? [datasetCell]
            : [dataset.count, datasetCell];
    });

const getItem = (key: string) => {
    switch (key) {
        case "downloaded":
            return {
                name: "Downloaded",
                icon: <MdFileDownload className="w-[20px] h-[20px]" />,
            };
        case "viewed":
            return {
                name: "Viewed",
                icon: <BsFillEyeFill className="w-[20px] h-[20px]" />,
            };
        case "added_to_favourite":
            return {
                name: "Added to favourites",
                icon: <BsHeartFill className="w-[20px] h-[20px]" />,
            };
        default:
            return {
                name: "All datasets",
                icon: <Image src={dataset} alt="" height={20} width={20} />,
            };
    }
};

export default Datasets;
