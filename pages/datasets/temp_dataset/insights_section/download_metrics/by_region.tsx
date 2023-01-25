import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});
const ByRegion = () => {
    return (
        <div className="w-[90%]">
            <WorldMap locations={[[41.8819, -87.6278]]} counts={["125"]} />
            <span>By Region</span>
        </div>
    );
};
export default ByRegion;
