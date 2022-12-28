const Preview = ({ convertedContent }: { convertedContent: string }) => {
    console.log("convertedContent :", convertedContent);

    return (
        <div
            className="min-w-[700px] min-h-[656px] shadow-paper-shadow mt-4 w-2/3 bg-[#F8F8F8] border-none p-4  editor_preview"
            dangerouslySetInnerHTML={{
                __html: convertedContent,
            }}
        ></div>
    );
};

export default Preview;
