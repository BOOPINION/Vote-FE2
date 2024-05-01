import React from "react";

const ProgressBar: React.FC<{ current: number; total: number }> = ({
  current,
  total,
}) => {
  return (
    <div className="w-full bg-gray-200 rounded-full">
      <div
        className="bg-blue-700 text-xs leading-none py-1 text-center text-white rounded-full duration-300"
        style={{ width: `${(current / total) * 100}%` }}
      >
        {current}/{total}
      </div>
    </div>
  );
};

export default ProgressBar;
