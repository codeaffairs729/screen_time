import Image from "next/image";

const InfoIcon = ({ title }: { title: string }) => {
  return (
    <>
      <Image
        data-tip={title}
        src="/images/icons/info.svg"
        width="16px"
        height="16px"
        alt={title}
      />
    </>
  );
};

export default InfoIcon;
