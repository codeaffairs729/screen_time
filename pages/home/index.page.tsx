import DatasetSearchInput from "components/UI/dataset_search_input";
import Image from "next/image";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/default";
import { usereventSearchQuery } from "services/usermetrics.service";
import SearchBar from "components/UI/search_bar";

const HomePage = () => {
    const router = useRouter();

    return (
        <DefaultLayout showLogo={false} showSearchBar={false}>
            <div className="h-[calc(100vh-var(--nav-height))] flex items-center justify-center mx-2">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <span>
                        <Image
                            src="/images/logo/dtechtive_without_tagline.svg"
                            width="315"
                            height="155"
                            alt="Dtechtive logo"
                        />
                        <p className="text-[#c1c1c1] text-[11px] font-medium select-none mt-[-10px]">
                            Discovering the data that other search engines
                            cannot reach
                        </p>
                    </span>
                    <div className="mt-6 max-w-xl mx-auto w-[575px]">
                        <SearchBar
                            onChange={(type: string, option: any) => {
                                if (!option) return;
                                const searchType =
                                    type === "dataset" ? "" : type;

                                router.push({
                                    pathname: `/search/${searchType}`,
                                    query: { q: option.value },
                                });
                            }}
                            selectClasses="border border-dtech-main-dark !bg-transparent h-15"
                        />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
