import React, { FormEvent } from 'react';

interface VoteBoxProps {
  votes: { [key: string]: { count: number; label: string } };
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

function VoteBox({ votes, selectedOption, setSelectedOption, handleSubmit, isLoading }: VoteBoxProps) {
  return (
    <div className="votebox bg-white border border-gray-200 rounded-xl px-8 pt-6 pb-8 mb-4 shadow-sm">
      <div className="votebox_text mb-4 text-xl font-semibold text-gray-800">투표</div>
      <form onSubmit={handleSubmit}>
        {Object.entries(votes).map(([key, { label }]) => (
          <div
            key={key}
            className={`mb-4 p-2 rounded-full border-2 ${
              selectedOption === key ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            }`}
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-blue-500 h-5 w-5"
                name="vote"
                value={key}
                checked={selectedOption === key}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span className="ml-2 text-gray-700">{label}</span>
            </label>
          </div>
        ))}
        <button
          className={`w-full py-2 rounded-full font-bold flex justify-center items-center focus:outline-none focus:shadow-outline transition-colors ${
            isLoading ? 'bg-gray-300 cursor-not-allowed text-gray-700' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0H4z"
                ></path>
              </svg>
              투표 처리 중
            </>
          ) : (
            '투표하기'
          )}
        </button>
      </form>
    </div>
  );
}

export default VoteBox;
