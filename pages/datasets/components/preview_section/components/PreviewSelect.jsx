const PreviewSelect = ({ options, previewID, handleChangePreviewID }) => {
    const handleIDChange = (event) => {
        handleChangePreviewID(event.target.value);
    };

    return (
        <div className="w-full px-3 items-start flex items-center">
            <label
                className="tracking-wide text-gray-700 font-bold mb-2 mt-6 mr-5"
                htmlFor="ds-id"
            >
                Select a dataset file
            </label>
            <div className="">
                <select
                    value={previewID}
                    onChange={handleIDChange}
                    className="border-0 bg-gray-200 text-gray-700 pr-12 rounded leading-tight focus:outline-none mt-4"
                    id="ds-id"
                >
                    {options.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default PreviewSelect;
