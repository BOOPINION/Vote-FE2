import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface VoteOption {
    count: number;
    label: string;
}

interface PollResult {
    date: string;
    details: { [key: string]: VoteOption };
}

interface PollData {
    pollTitle: string;
    pollDescription: string;
    username: string;
    viewCount: number;
    results: PollResult[];
}

function VoteResult() {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [votes, setVotes] = useState<{ [key: string]: VoteOption }>({});
    const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);
    const [pollData, setPollData] = useState<PollData>({
        pollTitle: '',
        pollDescription: '',
        username: '',
        viewCount: 0,
        results: []
    });

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/mockdata.json');
            const data = await response.json();
            setVotes(data.options);
            setPollData({
                pollTitle: data.pollTitle,
                pollDescription: data.pollDescription,
                username: data.username,
                viewCount: data.viewCount,
                results: data.results
            });
        }

        fetchData();
    }, []);

    const totalVotes: number = Object.values(votes).reduce((acc, option) => acc + option.count, 0);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        
        console.log(`Voted for: ${selectedOption}`);
        setTimeout(() => {
            setVotes((prevVotes) => ({
                ...prevVotes,
                [selectedOption]: {
                    ...prevVotes[selectedOption],
                    count: prevVotes[selectedOption].count + 1
                }
            }));

            setIsLoading(false);
            setVoteSubmitted(true);
        }, 1000);
    };

    return (
        <div className="max-w-sm mx-auto p-4">
            <div className="header mt-4 mb-8">
                <button className="text-blue-500">뒤로가기</button>
            </div>
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                <div className="text-sm">
                    <p className="text-gray-900 leading-none">{pollData.username}</p>
                    <p className="text-gray-600">{pollData.viewCount}명 조회</p>
                </div>
            </div>
            <div className="voteText text-lg mb-4">{pollData.pollTitle}</div>
    
            {voteSubmitted ? (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                    {Object.entries(votes).map(([key, { count, label }]) => (
                        <div key={key} className="mb-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-gray-800">{label}</div>
                                <div className="text-xs font-semibold text-pink-500">
                                    {count}표 / {((count / totalVotes) * 100).toFixed(0)}%
                                </div>
                            </div>
                            <motion.div
                                className="w-full bg-pink-500 rounded-full h-6 overflow-hidden my-2"
                                initial={{ width: 0 }}
                                animate={{ width: `${(count / totalVotes) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{ width: `${(count / totalVotes) * 100}%` }}
                            />
                        </div>
                    ))}
                    <button
                        className="w-full bg-gray-200 text-gray-700 py-2 rounded-full shadow-md hover:bg-gray-300 transition-colors"
                        onClick={() => setVoteSubmitted(false)}
                    >
                        다시 투표하기
                    </button>
                </div>
            ) : (
                <div className="votebox bg-white border border-gray-200 rounded-xl px-8 pt-6 pb-8 mb-4 shadow-sm">
                    <div className="votebox_text mb-4 text-xl font-semibold text-gray-800">
                        투표
                    </div>
                    <form onSubmit={handleSubmit}>
                        {Object.entries(votes).map(([key, { label }]) => (
                            <div
                                key={key}
                                className={`mb-4 p-2 rounded-full border-2 ${
                                    selectedOption === key ? "bg-pink-100 border-pink-500" : "border-gray-300"
                                }`}
                            >
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        className="form-radio text-pink-500 h-5 w-5"
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
                                isLoading ? "bg-gray-300 cursor-not-allowed text-gray-700" : "bg-pink-500 hover:bg-pink-600 text-white"
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
                                "투표하기"
                            )}
                        </button>
                    </form>
                </div>
            )}
    
        </div>
    );
    
}

export default VoteResult;