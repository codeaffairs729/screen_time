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
        <div className="flex items-center">
            <input
                className="w-3 h-3 border-0 mr-2 bg-gray-300"
                type="checkbox"
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className="text-xs text-gray-600">Comment anonymously </span>
        </div>
    );
};

export default CommentAnonymous;
