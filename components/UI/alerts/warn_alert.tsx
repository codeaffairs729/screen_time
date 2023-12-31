import clsx from "clsx";
import { ReactNode } from "react";

const WarnAlert = ({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-row items-center bg-yellow-200 p-5 rounded border-b-2 border-yellow-300",
        className
      )}
    >
      <div className="flex items-center bg-yellow-100 border-2 border-yellow-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
        <span className="text-yellow-500">
          <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <div className="ml-4">
        <div className="font-semibold text-lg text-yellow-800">Warning</div>
        <div className="text-sm text-yellow-600">{message}</div>
      </div>
    </div>
  );
};

export default WarnAlert;
