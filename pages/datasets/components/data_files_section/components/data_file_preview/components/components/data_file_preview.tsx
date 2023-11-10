import { PreviewData } from "../../data_file_preview.vm";
import DataFilePreviewTable from "./data_file_preview_table";

// Layout of data file preview of xls and csv are similar
const DataFilePreview = ({ data }: { data: PreviewData }) => {
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
        </>
    );
};

export default DataFilePreview;
