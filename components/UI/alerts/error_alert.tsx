import clsx from "clsx";

const ErrorAlert = ({ message, className="" }: { message: string, className?: string }) => {
  return (
    <div data-selector="error-alert" className={clsx("flex flex-row items-center bg-red-200 px-3 py-1 scroll-py-11 border-b-2 border-red-300", className)}>
      <div className="flex items-center bg-red-100 border-2 border-red-500 justify-center h-7 w-7 flex-shrink-0 rounded-full">
        <span className="text-red-400">
          <svg fill="currentColor" viewBox="0 0 20 20" className="h-3 w-3">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <div className="ml-3">
        <div className="font-semibold text-red-800">
          Error
        </div>
        <div className="text-sm text-red-700">{message}</div>
      </div>
    </div>
  );
};

export default ErrorAlert;
