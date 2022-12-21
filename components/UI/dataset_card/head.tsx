import Link from "next/link";
import MetaRating from "components/UI/metaRating";
import DatasetAction from "components/UI/dataset_action";
import { Dataset } from ".";
import { useRouter } from "next/router";

const CardHead = ({
    href = "",
    dataset,
    onFavourite,
    handleBookmark,
    handleShare,
    handleFAQClick,
}: {
    href: string;
    dataset: Dataset;
    onFavourite: Function;
    handleBookmark: Function;
    handleShare: Function;
    handleFAQClick?: Function;
}) => {
    const { title, dataQuality, buttonTags /*favourite, bookmark*/ } = dataset;
    const router = useRouter();
    return (
        <div className="flex items-center justify-between w-full p-[10px]">
            <div className="flex items-center">
                {/* {dataset.featured && (
                    <span className="border border-1 bg-dtech-notification-alert-secondary text-sm px-1 h-6 text-white mr-4 ml-[-12px] rounded-md  ">
                        Featured
                    </span>
                )} */}
                <Link href={href}>
                    <a className="font-medium font-roboto text-md my-3 text-dtech-main-dark text-[17px] ml-[-8px] cursor-pointer">
                        {title}
                    </a>
                </Link>
                <MetaRating
                    dataQuality={dataQuality}
                    displayContext={"displayContext"}
                    labelClass="font-normal"
                    handleFAQClick={() => {
                        router.push({
                            pathname: `/faq`,
                        });
                    }}
                />
                {buttonTags.map((tag: string, index: number) => (
                    <span
                        key={index}
                        className="select-none px-6 text-m font-normal border border-dtech-main-dark rounded ml-8 text-dtech-main-dark"
                    >
                        {`${tag[0].toUpperCase()}${tag.slice(1)}`}
                    </span>
                ))}
            </div>
            <DatasetAction
                // favourite={favourite}
                // bookmark={bookmark}
                // onFavourite={onFavourite}
                // handleBookmark={handleBookmark}
                handleShare={handleShare}
            />
        </div>
    );
};

export default CardHead;
