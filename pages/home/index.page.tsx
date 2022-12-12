import DatasetSearchInput from "components/UI/dataset_search_input";
import Image from "next/image";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/default";
import { usereventSearchQuery } from "services/usermetrics.service";

const HomePage = () => {
    const router = useRouter();

    return (
        <DefaultLayout showLogo={false}>
            <div className="h-[calc(100vh-var(--nav-height))] flex items-center justify-center mx-2">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <Image
                        src="/images/logo/dtechtive_logo_strapline.png"
                        width="315"
                        height="155"
                        alt="Dtechtive logo"
                    />
                    <div className="mt-6 max-w-xl mx-auto w-[575px]">
                        <DatasetSearchInput
                            onChange={(option) => {
                                if (!option) return;

                                router.push({
                                    pathname: "/search",
                                    query: { q: option.value },
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
