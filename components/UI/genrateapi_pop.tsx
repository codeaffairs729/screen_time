import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PrimaryBtn from "./form/primary_btn";

const GenerateApi = () => {
    let [isOpen, setIsOpen] = useState(true);
    const [istable, setIstable] = useState(false);
    const [apiData, setApiData] = useState([
      {
        name: "Dataset xydfsd",
        key: "sdfsdf323fsdsdfsdff",
        create: "123",
        lastused: "123",
    },
    {
        name: "Quality sdfsd",
        key: "Dfsdfw4r23wdfw4",
        create: "123",
        lastused: "123",
    },
    {
        name: "fdsdfs",
        key: "dsf324dsf3466wer",
        create: "123",
        lastused: "123",
    },
    {
        name: "sdgsdsd",
        key: "435423sdfwef",
        create: "123",
        lastused: "123",
    },
  ]);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    // const apiData = [
    //     {
    //         name: "Dataset xydfsd",
    //         key: "sdfsdf323fsdsdfsdff",
    //         create: "123",
    //         lastused: "123",
    //     },
    //     {
    //         name: "Quality sdfsd",
    //         key: "Dfsdfw4r23wdfw4",
    //         create: "123",
    //         lastused: "123",
    //     },
    //     {
    //         name: "fdsdfs",
    //         key: "dsf324dsf3466wer",
    //         create: "123",
    //         lastused: "123",
    //     },
    //     {
    //         name: "sdgsdsd",
    //         key: "435423sdfwef",
    //         create: "123",
    //         lastused: "123",
    //     },
    // ];

    const handleCopyClick = () => {
        // Create a textarea element and set its value to the citation text
        const textArea = document.createElement("textarea");
        textArea.value = apiData[0].key;

        // Append the textarea to the document
        document.body.appendChild(textArea);

        // Select the text inside the textarea
        textArea.select();

        // Copy the selected text to the clipboard
        document.execCommand("copy");

        // Remove the textarea from the document
        document.body.removeChild(textArea);

        // Provide some visual feedback to the user (optional)
        alert("Api key is copied");
    };

    const handleDeleteClick = (index: number) => {
      const updatedApiData = [...apiData];
      updatedApiData.splice(index, 1);
      setApiData(updatedApiData);
  };
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div
                                    className="w-[60%] transform overflow-hidden border-[2px] border-dtech-light-teal rounded-[10px] bg-white p-14 text-left align-middle shadow-xl transition-all"
                                >
                                    <div className="mt-2">
                                        <p className="text-19 font-normal text-[#2D2D32]">
                                            Your API keys are listed below.
                                            Please note that we do not display
                                            your secret API keys again after you
                                            generate them.
                                        </p>
                                        <p className="text-19 font-normal text-[#2D2D32] mt-3">
                                            Protecting your API key is important
                                            to ensure the security of your data.
                                            Never share your API key with anyone
                                            unless absolutely necessary, and
                                            make sure to transmit it securely
                                            when required. Avoid hardcoding your
                                            API key into your code or storing it
                                            in public repositories
                                        </p>
                                    </div>

                                    {istable && (
                                        <div>
                                            <table className="p-1 w-full">
                                                <thead>
                                                    <tr className="text-sm">
                                                        <th>NAME</th>
                                                        <th>KEY</th>
                                                        <th>CREATE</th>
                                                        <th>LAST USED</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {apiData?.map(
                                                        (item, index) => {
                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className="text-sm text-dtech-light-grey3 border-t-2"
                                                                >
                                                                    <td>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item.key
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item.create
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item.lastused
                                                                        }
                                                                    </td>
                                                                    <div className="flex">
                                                                        <button onClick={()=>{handleDeleteClick(index)}}>
                                                                            <img
                                                                                src="/images/deletebtn.svg"
                                                                                alt="delbtn"
                                                                            />
                                                                        </button>

                                                                        <p className="text-dtech-light-grey3">
                                                                            Delete
                                                                        </p>
                                                                    </div>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <PrimaryBtn
                                            className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-[120px] sm:w-[170px] !p-[10px] sm:!p-[16px] rounded-[30px] mt-5 mb-2 text-xs sm:text-[16px]"
                                            label="Generate API key"
                                            onClick={() => {
                                                setIstable(true);
                                            }}
                                        />
                                    </div>

                                    {istable && (
                                        <div>
                                            <div className="flex space-x-2">
                                                <h1 className="text-dtech-new-main-light">
                                                    {apiData[0].key}
                                                </h1>

                                                <div className="flex">
                                                    <img
                                                        src="/images/icons/copy.svg"
                                                        alt="copy"
                                                        className="ml-20 cursor-pointer"
                                                        onClick={
                                                            handleCopyClick
                                                        }
                                                    />
                                                    <p className="text-dtech-light-grey3 ml-2">
                                                        Copy
                                                    </p>
                                                </div>
                                            </div>

                                            <h1>
                                                Please save this secret key
                                                somewhere safe and accessible.
                                                For security reasons, you won&apos;t
                                                be able to view it again through
                                                your account. If you lose this
                                                secret key, you&apos;ll need to
                                                generate a new one.
                                            </h1>
                                        </div>
                                    )}

                                    <div className="top-2 right-5 absolute ">
                                        <button
                                            className="text-black"
                                            onClick={closeModal}
                                        >
                                            <img
                                                src="/images/crosslogo.png"
                                                alt="crosslogo"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default GenerateApi;
