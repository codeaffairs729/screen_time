import React, { useState } from "react";

const SwitchBtn = () => {
    const [checked, setChecked] = useState(true);

    const handleToggle = () => {
        setChecked(!checked);
    };

    return (
        <div>
            <label className="relative inline-flex items-center cursor-pointer m-auto">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer focus:ring-0"
                    onClick={handleToggle}
                    checked={checked}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dtech-main-dark"></div>
                {checked ? (
                    <span className="ml-3 text-sm font-medium text-ds-main-dark">
                        ON
                    </span>
                ) : (
                    <span className="ml-3 text-sm font-medium text-[#727272]">
                        OFF
                    </span>
                )}
            </label>
        </div>
    );
};

export default SwitchBtn;
