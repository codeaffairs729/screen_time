import Table from "../../table";

const DownloadSection = () => {
    const TABLE_HEADERS = ["Region", "Count", "Last used"];
    const ROW1 = ["Manchester", "London", "Edinburgh", "Bristol"];
    const ROW2 = ["125", "64", "87", "34"];
    const ROW3 = [
        "22 minutes ago",
        "1 day ago",
        "22 minutes ago",
        "22 minutes ago",
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
            <Table
                tableHeaders={TABLE_HEADERS}
                tableData={tableData}
                headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                tableClass="w-full text-sm text-left border table-fixed"
                cellPadding={20}
                tableRow="text-[17px] font-normal "
            />
        </div>
    );
};

export default DownloadSection;
