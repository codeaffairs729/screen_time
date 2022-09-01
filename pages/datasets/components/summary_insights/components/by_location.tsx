import dynamic from "next/dynamic";

const ByLocation = ({ data }: { data: any }) => {
    const LocationsView = dynamic(() => import("./LocationsView"), {
        loading: () => <p>A map is loading</p>,
        ssr: false, // This line is important. It's what prevents server-side render
    });

    return (
        <div>
            <div className="text-xs font-light text-gray-500">
                The graph below displays the number of downloads per region.
                Zoom in to get a high resolution view.
            </div>
            <div className="flex p-1 mt-10">
                <LocationsView data={data} />
            </div>
        </div>
    );
};

export default ByLocation;
