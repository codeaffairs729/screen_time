import { useContext, useEffect} from "react";
import Loader from "components/UI/loader";
import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import ByRegion from "./byRegion";
import ByTime from "./byTime";
import ByUsecase from "./byUsecase";

const DownloadSection = () => {
    const {
        selectedDownload: selectedLabel,
        isLoading,
        fetchDownloadMetrics,
    } = useContext(OrganisationDetailVMContext);

    useEffect(() => {
        fetchDownloadMetrics();
    }, []);

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            {selectedLabel == 0 && <ByRegion />}
            {selectedLabel == 1 && <ByTime />}
            {selectedLabel == 2 && <ByUsecase />}
        </div>
    );
};

export default DownloadSection;
