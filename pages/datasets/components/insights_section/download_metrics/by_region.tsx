import dynamic from "next/dynamic";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext } from "react";
const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});
const ByRegion = () => {
    const { downloadMetrics } = useContext(DatasetDetailVMContext);

    const { regions = [] } = downloadMetrics || {};
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
    return (
        <div className="w-[90%]">
            <WorldMap locations={loc} counts={downloadCounts} />
            <span>By Region</span>
        </div>
    );
};
export default ByRegion;
