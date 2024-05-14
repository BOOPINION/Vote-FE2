import React from "react";

const VoteHistory: React.FC = () => {
    return (
        <div>
            <nav className="no-scrollbar flex shrink-0 gap-3 border-b border-gray-100 px-2">
                <a className="cursor-pointer min-w-fit border-b-2 px-5 pb-2 border-gray-1000" href="?tab=vote">내 투표 조회</a>
                <a className="cursor-pointer min-w-fit border-b-2 px-5 pb-2 text-gray-400 border-white" href="?tab=test">지난 테스트 결과</a>
            </nav>
            <main className="flex size-full flex-col px-2">
                <div className="flex size-full flex-col items-center justify-center gap-xs">
                        <p className="whitespace-pre-line text-wrap text-[16px] font-medium leading-[155%] whitespace-pre-line text-center">아직 투표가 없어요</p>
                        <a className="rounded-full bg-black px-6 py-2 font-semibold text-white" href="/voteHome">투표 만들기</a>
                </div>
            </main>
        </div>
    );
};

export default VoteHistory;
