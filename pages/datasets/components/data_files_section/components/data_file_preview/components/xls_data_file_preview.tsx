import { Tab } from "@headlessui/react";
import { PreviewData, XLSPreviewData } from "../data_file_preview.vm";
import { ReactNode } from "react";
import clsx from "clsx";
import DataFilePreviewTable from "./components/data_file_preview_table";

const XLSDataFilePreview = ({ data }: { data: XLSPreviewData }) => {
    return (
        <>
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-dtech-light-grey2 p-1">
                    {data.sheets.map((sheetName, i) => (
                        <SheetTab key={i}>{sheetName}</SheetTab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {data.sheet_data.map((sheetData, i) => (
                        <SheetPanel key={i} data={sheetData} />
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </>
    );
};

const SheetTab = ({ children }: { children: ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                clsx(
                    "w-full rounded-lg p-2.5 text-sm font-medium leading-5 uppercase ",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                        ? "bg-dtech-new-main-light text-white"
                        : "text-dtech-dark-grey2 hover:bg-dtech-new-main-light hover:text-white"
                )
            }
        >
            {children}
        </Tab>
    );
};

const SheetPanel = ({ data }: { data: PreviewData }) => {
    return (
        <Tab.Panel>
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
        </Tab.Panel>
    );
};

export default XLSDataFilePreview;
