import Image from "next/image";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

const StarRating = ({ rating, starClassName = "" }: { rating: number, starClassName?: string}) => {
    const roundedStars = Math.ceil((rating || 0) * 2) / 2;

    const fullStarsNo = Math.floor(roundedStars);
    const fullStars = [...Array(fullStarsNo)].map((_, i) => (
        // <Star key={`full_${i}`} type="full" />

        <div key={`full_${i}`} className="mx-[0.7px]">
            <BsStarFill className={starClassName}/>
        </div>
    ));

    const emptyStarsNo = 5 - Math.ceil(roundedStars);
    const emptyStars = [...Array(emptyStarsNo)].map((_, i) => (
        // <Star key={`empty_${i}`} type="empty" />
        <div key={`empty_${i}`} className="mx-[0.7px]">
            <BsStar className={starClassName}/>
        </div>
    ));

    const halfStars = [...Array(5 - fullStarsNo - emptyStarsNo)].map((_, i) => (
        // <Star key={`half_${i}`} type="half" />
        <div key={`half_${i}`} className="mx-[0.7px]">
            <BsStarHalf className={starClassName}/>
        </div>
    ));

    return (
        <div className="flex inline-block text-m text-[#AD1DEB]">
            {fullStars}
            {halfStars}
            {emptyStars}
        </div>
    );
};

const Star = ({ type }: { type: string }) => {
    return (
        <div className="inline-block mx-[0.5px]">
            <Image
                src={`/images/icons/star/${type}_star.svg`}
                width="14px"
                height="14px"
                alt={`${type} star`}
            />
        </div>
    );
};

export default StarRating;
