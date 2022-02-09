import Image from "next/image";

const InfoIcon = ({ tooltip }: { tooltip: string }) => {
  return (
    <span>
      <Image src="/images/info.svg" alt={tooltip} />
    </span>
  );
};

export default InfoIcon;
