import React from "react";
import { useController } from "react-hook-form";

const CommentAnonymous = ({ vm }: { vm: any }) => {
    const formControl = {
        control: vm.form.control,
        name: "comment_anonymous",
        rules: {},
    };

    const {
        fieldState: { error },
        field: { onChange, name },
    } = useController({
        ...formControl,
        defaultValue: false,
    });

    return (
        <div className="flex items-center ml-2">
            <input
                className="w-6 h-6 border-2 border-[#333333] mr-2  text-dtech-main-dark"
                type="checkbox"
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className="text-sm text-[#333333]">Comment anonymously </span>
        </div>
    );
};

export default CommentAnonymous;
