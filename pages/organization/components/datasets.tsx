import Accordian from "components/UI/accordian";
import { BsHeartFill, BsFillEyeFill } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";
import dataset from "public/images/icons/dataset.svg";
import Table from "./table";
import Image from "next/image";

const LIST_ITEMS = [
    {
        name: "All datasets",
        icon: <Image src={dataset} alt="" height={20} width={20} />,
    },
    {
        name: "Downloaded",
        icon: <MdFileDownload className="w-[20px] h-[20px]" />,
    },
    { name: "Viewed", icon: <BsFillEyeFill className="w-[20px] h-[20px]" /> },
    {
        name: "Added to favourites",
        icon: <BsHeartFill className="w-[20px] h-[20px]" />,
    },
];

const TABLE_HEADERS = ["Count", "Dataset"];
const ROW1 = ["125", "56", "125"];
const ROW2 = [
    {
        title: "2011 Output Area code, old to new",
        description:
            "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
    },
    {
        title: "Frozen Postcode 2011 to Workplace Zone 2011",
        description:
            "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
    },
    {
        title: "2011 Output Area code, old to new",
        description:
            "This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August 2013) and the new 2011 This file provides a look-up between the archived 2011 Output Area (OA) code (published 15 August",
    },
];
const TABLE_DATA = [ROW1, ROW2];

const Datasets = () => {
    return (
        <div>
            <div className="text-sm text-dtech-dark-grey">
                All the datasets of this organisation are listed here.
            </div>
            <div>
                {LIST_ITEMS.map((label) => (
                    <Accordian
                        label={
                            <ItemCard icon={label.icon} label={label.name} />
                        }
                    >
                        <div className="px-8 pb-4">
                            <Table
                                tableHeaders={TABLE_HEADERS}
                                tableData={TABLE_DATA}
                            />
                        </div>
                    </Accordian>
                ))}
            </div>
        </div>
    );
};

const ItemCard = ({ icon, label }: any) => {
    return (
        <div className="flex items-center jutify-between">
            {icon}
            <span className="ml-3">{label}</span>
        </div>
    );
};

export default Datasets;
