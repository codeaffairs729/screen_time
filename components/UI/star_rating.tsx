import Image from "next/image";

const StarRating = ({ rating }: { rating: number }) => {
  const roundedStars = Math.round(rating * 2) / 2;

  const fullStarsNo = Math.floor(roundedStars);
  const fullStars = [...Array(fullStarsNo)].map((_, i) => (
    <Star key={`full_${i}`} type="full" />
  ));

  const emptyStarsNo = 5 - Math.ceil(roundedStars);
  const emptyStars = [...Array(emptyStarsNo)].map((_, i) => (
    <Star key={`empty_${i}`} type="empty" />
  ));

  const halfStars = [...Array(5 - fullStarsNo - emptyStarsNo)].map((_, i) => (
    <Star key={`half_${i}`} type="half" />
  ));

  return (
    <div className="">
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
