import { TagCloud } from "react-tagcloud";

const displayCloud = (tag: any, size: any) => {
    return (
        <div
            key={`${tag.value}_${size}`}
            style={{
                fontSize: `${size / 30}em `,
            }}
            className={`tag-${size} !text-dtech-main-dark !pr-12  inline-block `}
        >
            {tag.value}
        </div>
    );
};
const TagsCloud = ({ row, row2 }: any) => {
    const data = row.map((r: string, index: any) => ({
        value: r,
        count: (20 + index * 5) % 80,
    }));
    return (
        <TagCloud
            minSize={20}
            maxSize={80}
            tags={data}
            shuffle={true}
            disableRandomColor={true}
            renderer={displayCloud}
            className={`flex flex-wrap justify-between text-center m-2 p-2 mt-11 cursor-pointer`}
        />
    );
};

export default TagsCloud;
