import Image from "next/image";
import { useRouter } from "next/router";

const BackBtn = () => {
  const router = useRouter();

  return (
    <button onClick={router.back} className="flex items-center justify-center m-1">
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
