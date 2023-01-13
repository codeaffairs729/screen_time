import dynamic from "next/dynamic";
import Table from "../../table";
const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});
const ByRegion = ({
    locations,
    downloadCounts,
    TABLE_HEADERS,
    tableData,
}: any) => {
    return (
        <div className="mt-12 ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
            <WorldMap locations={locations} counts={downloadCounts} />
            <div className="mt-8">
                <Table
                    tableHeaders={TABLE_HEADERS}
                    tableData={tableData}
                    headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                    tableClass="w-full text-sm text-left border table-fixed"
                    cellPadding={20}
                    tableRow="text-[17px] font-normal "
                />
            </div>
        </div>
    );
};
export default ByRegion;
