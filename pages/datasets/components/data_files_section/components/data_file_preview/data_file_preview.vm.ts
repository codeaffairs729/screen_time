import Http from "common/http";
import useSWR from "swr";
import { getHttpErrorMsg } from "common/util";
import { FeatureCollection } from "geojson";

export enum DataFileFormat {
    CSV = "csv",
    XLS = "xls",
    XLSX = "xlsx",
    // DOC --start
    PDF = "pdf",
    // DOC --end
    // MAP --start
    GEOJSON = "geojson",
    SHP = "shp",
    KML = "kml",
    // MAP --end
}

export class DataFileFormatType {
    static CSV = [DataFileFormat.CSV] as const;
    static EXCEL = [DataFileFormat.XLS, DataFileFormat.XLSX] as const;
    static MAP = [DataFileFormat.GEOJSON, DataFileFormat.SHP, DataFileFormat.KML] as const;
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

export type MapPreviewData = PreviewData & {
    type: (typeof DataFileFormatType.MAP)[number];
    totalBounds: number[];
    mapData: FeatureCollection;
};

export type CSVPreviewData = PreviewData & {
    type: (typeof DataFileFormatType.CSV)[number];
};

export type XLSPreviewData = {
    type: (typeof DataFileFormatType.EXCEL)[number];
    sheet_data: PreviewData[];
    sheets: string[];
};

const DataFilePreviewVM = (dataFileId: number) => {
    const { data, error, isLoading } = useSWR(
        `/v1/dataset-preview/data-files/${dataFileId}`,
        (url: string) =>
            Http.get<{
                data: CSVPreviewData | XLSPreviewData | MapPreviewData;
            }>(url, {
                baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
            })
                .then((res) => {
                    if ("map_data" in res?.data) {
                        const data = res?.data as any;
                        data["mapData"] = data["map_data"];
                        data["totalBounds"] = data["total_bounds"];
                        delete data["map_data"];
                        return data as MapPreviewData;
                    }
                    return res?.data;
                })
                .catch(async (e) => {
                    console.error(e);
                    throw await getHttpErrorMsg(e);
                })
    );
    return { data, error, isLoading };
};

export default DataFilePreviewVM;
