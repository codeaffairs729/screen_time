import { createContext } from "react";

const DownloadMetricVM = () => {
    return {};
};

export default DownloadMetricVM;

interface IDownloadMetricVM {}

export const DownloadMetricVMContext = createContext<IDownloadMetricVM>(
    {} as IDownloadMetricVM
);
