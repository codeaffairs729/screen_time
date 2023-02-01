import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { getAge } from "pages/workspace/notification.vm";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import { useContext } from "react";
import Table from "../../table";
const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});
const TABLE_HEADERS = ["Region", "Count", "Last used"];
const ByRegion = () => {
    const { downloadMetrics } = useContext(OrganisationDetailVMContext);

    const { regions = [] } = downloadMetrics || {};

    // const locations: Array<LatLngExpression> = regions.map((region: any) => [
    //     region?.location?.lat,
    //     region?.location?.long,
    // ]);
    const loc: any = [];
    const downloadCounts :any =[];
    regions?.map((region: any) => {
        region["location"]?.map(
            (location: any) => {
                loc.push([location?.lat, location?.long])
                downloadCounts.push(1);
            }
        );
    });
    const tableData = regions.map((region: any) => [
        region?.name,
        region?.count,
        getAge(region.date),
    ]);
    // const downloadCounts = regions.map((region: any) => region?.count);

    return (
        <div className="mt-12 ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
            <WorldMap locations={loc} counts={downloadCounts} />
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
