import Accordian from "components/UI/accordian";
import Image from "next/image";
import Table from "./table";
import dataset from "public/images/icons/dataset.svg";
import { ReactNode, useContext, useEffect } from "react";
import Link from "next/link";
import { OrganisationDetailVMContext } from "../organisation_detail.vm";

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
            <span className="text-sm font-medium text-dtech-dark-grey cursor-pointer">
                {title}
            </span>
        </Link>
        <span className="text-sm text-dtech-dark-grey limit-line">
            {description}
        </span>
    </div>
);
const AllDatasets = () => {
    const {
        organisationDatasets,
        incrementOrgDatasetsCount,
        fetchOrganisationDatasets,
    } = useContext(OrganisationDetailVMContext);

    useEffect(() => {
        fetchOrganisationDatasets();
    }, []);

    const importOrgDatasets = (e: any) => {
        const bottom =
            e.target.scrollHeight - e.target.scrollTop ===
            e.target.clientHeight;
        if (bottom) {
            incrementOrgDatasetsCount();
        }
    };
    return (
        <Accordian label={<ItemCard item={getItem("all_datasets")} />}>
            <div className="px-8 pb-4 h-[350px]">
                {Object.keys(organisationDatasets).length !== 0 && (
                    <Table
                        onScrollEnd={importOrgDatasets}
                        tableHeaders={["Dataset"]}
                        tableData={getTableData(
                            "all_datasets",
                            organisationDatasets["all_datasets"]
                        )}
                        tableBodyClasses={"block h-[220px] overflow-auto"}
                        cellPadding={3}
                    />
                )}
            </div>
        </Accordian>
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
const getItem = (key: string) => {
    return {
        name: "All datasets",
        icon: <Image src={dataset} alt="" height={20} width={20} />,
    };
};
const getTableData = (key: string, datasets: any) =>
    datasets.map((dataset: any, index: number) => {
        const datasetCell = (
            <DisplayDataset
                id={dataset?.id}
                key={dataset?.id}
                title={dataset.title}
                description={dataset.description}
            />
        );

        return [datasetCell];
    });

export default AllDatasets;
