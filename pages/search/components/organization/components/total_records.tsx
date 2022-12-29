import Dropdown from "components/UI/drop_down";

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
    const options = OPTIONS.map((option) => ({
        label: `${option.label}`,
        onClick: () => {
            setPageSize(option.label);
        },
    }));

    return (
        <div className="flex">
            <span className="ml-2 mt-1 pr-2 font-medium text-sm">Display</span>
            <div className="flex justify-center items-center space-x-1 h-[28px] border border-dtech-main-dark rounded  h-7 px-7 pr-1.5">
                <Dropdown
                    label={`${pageSize} results`}
                    menuItems={options}
                    menuItemsClasses="!w-32 border border-dtech-main-dark"
                    labelClasses=" text-m font-normal pr-2.5 "
                    className="!ml-0 "
                    iconClass="text-dtech-main-dark !ml-2.5"
                />
            </div>
            <div className="text-sm mt-1 ml-1">
                <span className=" pl-2 font-medium ">Total:</span>
                <span className=" font-normal text-sm ">{` ${totalRecords} results`}</span>
            </div>
        </div>
    );
};

export default TotalRecords;
