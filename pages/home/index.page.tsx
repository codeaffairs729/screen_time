import DatasetSearchInput from "components/UI/dataset_search_input";
import Image from "next/image";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/default";

const HomePage = () => {
  const router = useRouter();

  return (
    <DefaultLayout showLogo={false}>
      <div className="h-[calc(100vh-62px)] flex items-center justify-center mx-2">
        <div className="max-w-3xl mx-auto">
          <Image
            src="/images/logo_withtagline.png"
            width="2000"
            height="411"
            alt="Dtechtive logo"
          />
          <div className="mt-6 max-w-xl mx-auto">
            <DatasetSearchInput
              onClickOption={(option) =>
                router.push({ pathname: "/search", query: { q: option.value } })
              }
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
