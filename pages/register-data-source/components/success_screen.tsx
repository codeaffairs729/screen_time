import PrimaryBtn from "components/UI/form/primary_btn";

const SuccessScreen = ({ vm }: { vm: any }) => {
    return (
        <div className="max-w-site text-center m-auto">
            <p className="w-[350px] text-gray-700 font-semibold contents">
                Thank you for registering a new data source website and
                contributing to data discovery.
            </p>
            <PrimaryBtn
                label="Submit another data source"
                className="bg-dtech-primary-dark w-40 mb-2 mx-auto mt-16"
                onClick={vm.submitAnotherDataSource}
            />
        </div>
    );
};

export default SuccessScreen;
