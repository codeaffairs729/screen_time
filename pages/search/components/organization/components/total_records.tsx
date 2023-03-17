import Dropdown from "components/UI/drop_down";
import { useContext } from "react";
import Organisation from "..";
import { OrganizationSearchVMContext } from "../organisation.vm";

const OPTIONS = [
    {
        label: 20,
    },
    {
        label: 50,
    },
    {
        label: 100,
    },
];

const TotalRecords = ({
    setPageSize,
    totalRecords,
    pageSize,
}: {
    setPageSize: Function;
    totalRecords: number;
    pageSize: number;
}) => {
    const {setLoading } = useContext(OrganizationSearchVMContext)
    const options = OPTIONS.map((option) => ({
        label: `${option.label}`,
        onClick: () => {
            setPageSize(option.label);
            setLoading(true);
        },
    }));

    return (
        <div className="sm:flex items-center">
            <div className="flex">
                <span className="mt-1 pr-2 font-medium text-sm">Display</span>
                <div className="flex justify-center items-center space-x-1 border border-dtech-main-dark rounded  h-7 px-7 pr-1.5">
                    <Dropdown
                        label={`${pageSize} results`}
                        menuItems={options}
                        menuItemsClasses="!w-32  rounded-[10px]"
                        labelClasses=" text-m font-normal pr-2.5 whitespace-nowrap"
                        className="!ml-0 "
                        iconClass="text-dtech-main-dark !ml-2.5"
                        itemsClasses="rounded-[10px] shadow-none "
                    />
                </div>
            </div>
            <div className="text-sm mt-2 sm:mt-0 sm:ml-2">
                <span className="font-medium ">Total:</span>
                <span className="font-normal text-sm ">{` ${totalRecords} results`}</span>
            </div>
        </div>
    );
};

export default TotalRecords;
