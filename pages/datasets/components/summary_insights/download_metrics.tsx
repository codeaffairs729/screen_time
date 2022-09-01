import OptionDropdown from "./components/option_dropdown";
import { useState } from "react";
import ByLocation from "./components/by_location";
import ByRole from "./components/by_role";
import ByTime from "./components/by_time";
import { MetricsData } from "./dataset_metrics.vm";

const RenderMetrics = ({
    view,
    metricsData,
}: {
    view: string;
    metricsData: MetricsData;
}) => {
    const switchView = (view: string) => {
        switch (view) {
            case "Downloads by time":
                if (
                    "downloads_by_time" in metricsData &&
                    Object.keys(metricsData.downloads_by_time).length > 0
                ) {
                    return <ByTime data={metricsData.downloads_by_time} />;
                } else {
                    return <div>Unavailable</div>;
                }
            case "Downloads by location":
                if (
                    "downloads_by_location" in metricsData &&
                    metricsData.downloads_by_location.length > 0
                ) {
                    return (
                        <ByLocation data={metricsData.downloads_by_location} />
                    );
                } else {
                    return <div>Unavailable</div>;
                }
            case "Downloads by role":
                if (
                    "downloads_by_role" in metricsData &&
                    Object.keys(metricsData.downloads_by_role).length > 0
                ) {
                    return <ByRole data={metricsData.downloads_by_role} />;
                } else {
                    return <div>Unavailable</div>;
                }
            default:
                return <div>O</div>;
        }
    };
    return <div>{switchView(view)}</div>;
};

const DownloadMetrics = ({ metricsData }: { metricsData: MetricsData }) => {
    const options = [
        "Downloads by time",
        "Downloads by location",
        "Downloads by role",
    ];
    const [activeOption, setActiveOption] = useState<string>(options[0]);
    return (
        <div>
            <OptionDropdown
                items={options}
                activeItem={activeOption}
                changeFunc={(d) => {
                    setActiveOption(d);
                }}
            />
            <div className="p-3">
                <RenderMetrics view={activeOption} metricsData={metricsData} />
            </div>
        </div>
    );
};

export default DownloadMetrics;
