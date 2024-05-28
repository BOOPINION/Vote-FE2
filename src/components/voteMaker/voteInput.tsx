import React from 'react';

//VoteInputProps: VoteInput 컴포넌트가 받는 props의 타입을 정의
interface VoteInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  placeholder: string;
}

const VoteInput: React.FC<VoteInputProps> = ({ value, onChange, onRemove, placeholder }) => (
  <div className="flex items-center border border-gray-300 rounded-lg p-1 my-2">
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="flex-grow p-2 rounded-l-lg border-0 focus:outline-none"
      placeholder={placeholder}
    />
    <button
      onClick={onRemove}
      className="text-red-500 bg-transparent hover:bg-red-100 p-2 rounded-full"
      aria-label="Remove item"
    >
      &ndash;
    </button>
  </div>
);

export default VoteInput;
