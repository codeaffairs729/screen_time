import Image from "next/image";
import { useRouter } from "next/router";

const BackBtn = () => {
  const router = useRouter();

  return (
    <button onClick={router.back} className="inline-flex items-center m-1 whitespace-nowrap">
      <Image
        src="/images/icons/arrows/up_arrow.svg"
        className="-rotate-90"
        width="10"
        height="10"
        alt="back btn"
      />
      <span className="text-sm ml-1 font-medium text-gray-500">Go back</span>
    </button>
  );
};

export default BackBtn;
