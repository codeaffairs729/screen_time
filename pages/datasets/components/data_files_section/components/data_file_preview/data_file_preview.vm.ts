import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useEffect } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { getHttpErrorMsg } from "common/util";

enum PreviewFileTypes {
    CSV = "csv",
    XLS = "xls",
}

type PreviewTableData = {
    index: string[];
    columns: string[];
    data: string[][];
};

export type PreviewData = {
    describe: PreviewTableData;
    head: PreviewTableData;
};

export type CSVPreviewData = PreviewData & {
    type: PreviewFileTypes.CSV;
};

export type XLSPreviewData = {
    type: PreviewFileTypes.XLS;
    sheet_data: PreviewData[];
    sheets: string[];
};

const DataFilePreviewVM = (dataFileId: number) => {
    const { data, error, isLoading } = useSWR(
        `/v1/dataset-preview/data-files/${dataFileId}`,
        (url: string) =>
            Http.get<{ data: CSVPreviewData | XLSPreviewData }>(url, {
                baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
            })
                .then((res) => res?.data)
                .catch(async (e) => {
                    throw await getHttpErrorMsg(e);
                })
    );
    return { data, error, isLoading };
};

export default DataFilePreviewVM;
