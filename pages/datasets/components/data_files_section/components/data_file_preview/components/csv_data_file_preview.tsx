import { CSVPreviewData } from "../data_file_preview.vm";
import DataFilePreview from "./components/data_file_preview";
import DataFilePreviewTable from "./components/data_file_preview_table";

const CSVDataFilePreview = ({ data }: { data: CSVPreviewData }) => {
    return <DataFilePreview data={data} />;
};

export default CSVDataFilePreview;
