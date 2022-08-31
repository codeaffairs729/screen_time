import OptionDropdown from "./components/option_dropdown";
import { useState } from "react";
import ByLocation from "./components/by_location";
import ByRole from "./components/by_role";
import ByTime from "./components/by_time";

const RenderMetrics = ({ view }: { view: string }) => {
    const switchView = (view: string) => {
        switch (view) {
            case "Downloads by time":
                return <ByTime />;
            case "Downloads by location":
                return <ByLocation />;
            case "Downloads by role":
                return <ByRole />;
            default:
                return <div>O</div>;
        }
    };
    return <div>{switchView(view)}</div>;
};

const DownloadMetrics = () => {
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
                <RenderMetrics view={activeOption} />
            </div>
        </div>
    );
};

export default DownloadMetrics;
