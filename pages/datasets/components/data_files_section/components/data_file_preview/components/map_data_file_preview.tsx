import { MapPreviewData, PreviewData } from "../data_file_preview.vm";
import DataFilePreviewMap from "./components/data_file_preview_map";
import DataFilePreviewTable from "./components/data_file_preview_table";

const MapDataFilePreview = ({ data }: { data: MapPreviewData }) => {
    return (
        <>
            <h4 className="font-semibold text-gray-700 text-lg mb-1.5">
                Data File Sample
            </h4>
            <DataFilePreviewTable
                index={data?.head?.index}
                className="mb-10"
                columns={["", ...data?.head?.columns]}
                data={data?.head?.data}
            />
            <h4 className="font-semibold text-gray-700 text-xl mb-1.5">
                Data File Summary
            </h4>
            <DataFilePreviewTable
                index={data?.describe?.index}
                className="mb-2"
                columns={["", ...data?.describe?.columns]}
                data={data?.describe?.data}
            />
            <DataFilePreviewMap className="w-full" mapData={data.mapData} totalBounds={data.totalBounds}/>
        </>
    );
};

export default MapDataFilePreview;
