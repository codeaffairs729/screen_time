import Table from "../../table";

const SearchTermSection = () => {
    const TABLE_HEADERS = ["Search term", "Count", "Last used"];
    const ROW1 = ["Nature", "Biodiversity", "Climate change", "Species"];
    const ROW2 = ["125", "65", "86", "10"];
    const ROW3 = [
        "22 minutes ago",
        "1 day ago",
        "22 minutes ago",
        "5 seconds ago",
    ];
    // const TABLE_DATA = [ROW1, ROW2, ROW3];
    const tableData = ROW2.map((data, index) => [
        index,
        ROW1[index],
        ROW2[index],
        ROW3[index],
    ]);
    return (
        <div className="ml-8 mr-24">
            <div className="text-sm text-dtech-dark-grey my-8">
                <Table
                    tableHeaders={TABLE_HEADERS}
                    tableData={tableData}
                    headerClass="text-[17px] font-medium text-gray-700 bg-[#F5F5F5] "
                    tableClass="w-full text-sm text-left text-gray-500 dark:text-gray-400 border"
                    cellPadding={20}
                    tableRow="text-[17px] text-black font-normal"
                />
            </div>
        </div>
    );
};

export default SearchTermSection;
