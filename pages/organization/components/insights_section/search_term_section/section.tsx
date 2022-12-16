import Table from "../../table";
import TagsCloud from "./tagCloud";

const SearchTermSection = () => {
    const TABLE_HEADERS = ["Search term", "Count", "Last used"];
    const ROW1 = ["Nature", "Biodiversity", "Climate change", "Species","Ecology","Indicators","Agroecology","Scotland","Environment","Health","Nature", "Biodiversity", "Climate change", "Species","Ecology","Indicators","Agroecology","Scotland","Environment","Health"];
    const ROW2 = ["125", "125", "86", "10","74","20","43","20","40","60","125", "125", "86", "10","74","20","43","20","40","60"];
    const ROW3 = [
        "22 minutes ago",
        "1 day ago",
        "22 minutes ago",
        "5 seconds ago",
        "22 minutes ago",
        "5 seconds ago",
        "5 seconds ago",
        "5 seconds ago",
        "5 seconds ago",
        "5 seconds ago",
        "22 minutes ago",
        "5 seconds ago",
        "22 minutes ago",
        "5 seconds ago",
        "5 seconds ago",
        "5 seconds ago",
        "5 seconds ago",
        "5 seconds ago",
        "22 minutes ago",
        "1 day ago",
    ];
    // const TABLE_DATA = [ROW1, ROW2, ROW3];
    const tableData = ROW2.map((data, index) => [
        index,
        ROW1[index],
        ROW2[index],
        ROW3[index],
    ]);
    return (
        <div className="ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
            <TagsCloud row={ROW1} row2={ROW2}/>
            <div className="text-sm text-dtech-dark-grey my-8 ">
                <Table
                    tableHeaders={TABLE_HEADERS}
                    tableData={tableData}
                    headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                    tableClass="w-full text-sm text-left border table-fixed"
                    cellPadding={20}
                    tableRow="text-[17px] text-black font-normal"
                />
            </div>
        </div>
    );
};

export default SearchTermSection;
