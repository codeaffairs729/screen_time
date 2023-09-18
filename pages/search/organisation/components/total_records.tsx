import Dropdown from "components/UI/drop_down";
import { useContext } from "react";
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
    setPageNumber,
    pageSize,
}: {
    setPageSize: Function;
    totalRecords: number;
    setPageNumber: Function;
    pageSize: number;
}) => {
    // const { setLoading } = useContext(OrganizationSearchVMContext)

    // console.log("><><><><", setLoading)
    const options = OPTIONS.map((option) => ({
        label: `${option.label}`,
        onClick: () => {
            setPageSize(option.label);
            // setLoading(true);
            setPageNumber(1)
        },
    }));

    return (
        <div className="sm:flex justify-between items-center w-full">
            <div className="flex flex-row justify-between items-center">
                <div className=" text-base mt-0.1">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-medium text-lg">{` ${totalRecords} results`}</span>
                </div>
            </div>
            <div className="flex flex-row items-center mx-2">
                <div>
                    <span className=" text-base font-medium mx-3">
                        Display
                    </span>
                </div>
                <div className="flex justify-center items-center space-x-1 h-7 border-2 border-gray-500 rounded-full px-5 py-5 pr-1.5 mt-1">
                    <Dropdown
                        label={`${pageSize} Results`}
                        menuItems={options}
                        menuItemsClasses="!w-32  rounded-[10px]"
                        labelClasses=" !text-base text-gray-500 font-normal pr-2.5 whitespace-nowrap"
                        className="!ml-0 "
                        iconClass=" !font-medium text-xl !mx-5"
                        itemsClasses="rounded-[10px] shadow-none hover:!bg-[#6DCDCB] hover:!bg-opacity-50 "
                        dropdownIcon = "arrow"
                    />
                </div>
            </div>
        </div>
    );
};

export default TotalRecords;
