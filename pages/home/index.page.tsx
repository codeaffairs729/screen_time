import Image from "next/image";
import DefaultLayout from "../../components/layouts/default";

const HomePage = () => {
  return (
    <DefaultLayout showLogo={false}>
      <div className="h-[calc(100vh-62px)] flex items-center justify-center">
        <div className="max-w-3xl mx-auto">
          <Image
            src="/images/logo_withtagline.png"
            width="2000"
            height="411"
            alt="Dtechtive logo"
          />
          Search bar
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
