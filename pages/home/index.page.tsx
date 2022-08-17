import DatasetSearchInput from "components/UI/dataset_search_input";
import Image from "next/image";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/default";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { usereventSearchQuery } from "services/ga";

const HomePage = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <DefaultLayout showLogo={false}>
            <div className="h-[calc(100vh-var(--nav-height))] flex items-center justify-center mx-2">
                <div className="max-w-3xl mx-auto">
                    <Image
                        src="/images/logo_withtagline.png"
                        width="2000"
                        height="411"
                        alt="Dtechtive logo"
                    />
                    <div className="mt-6 max-w-xl mx-auto">
                        <DatasetSearchInput
                            onChange={(option) => {
                                if (!option) return;

                                // gtag: record the search query by the user if they are logged in, if not, use anonymous.
                                usereventSearchQuery(option.value, user);
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
