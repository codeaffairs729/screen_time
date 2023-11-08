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
    dropDownClass ="",
    totalRecordHeader = ""
}: {
    setPageSize: Function;
    totalRecords: number;
    setPageNumber: Function;
    pageSize: number;
    dropDownClass?: string;
    totalRecordHeader?: string;
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
        <div className={`sm:flex justify-between items-center w-full ${totalRecordHeader}`}>
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
                <div className={`flex justify-center items-center space-x-1 h-7 border-2 border-gray-500 rounded-full px-5 py-5 pr-1.5 mt-1 ${dropDownClass}`}>
                    <Dropdown
                        label={`${pageSize} Results`}
                        menuItems={options}
                        menuItemsClasses="!w-44  !top-8 !px-1.5 !py-1.5"
                        labelClasses=" !text-base text-gray-500 font-normal pr-2.5 whitespace-nowrap"
                        className="!ml-0 "
                        iconClass=" !font-medium text-xl !mx-5"
                        itemsClasses=" hover:!bg-dtech-main-dark hover:!text-white"
                        dropdownIcon = "arrow"
                    />
                </div>
            </div>
        </div>
    );
};

export default TotalRecords;
