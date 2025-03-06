import { CheckCheck } from "lucide-react";
import { useState } from "react";

const Toast = ({message }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      id="toast-default"
      className="fixed top-15 left-1/2  flex items-center w-full max-w-xs p-4 text-white bg-red-600 rounded-lg shadow-md dark:text-gray-400 dark:bg-gray-800 animate-fadeInUp"
      role="alert"
    >
      <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-600- bg-red-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
       <CheckCheck className="h-5 w-5 text-red-600" />
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={() => setIsVisible(false)}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
