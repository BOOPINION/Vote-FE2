import React from "react";
import { Link } from "react-router-dom";


const UserProfile: React.FC = () => {
    return (
        <div>
            <section className="flex items-center gap-4 px-5 py-7">
                <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" color="#E0E8EF" className="shrink-0">
                    <g clip-path="url(#a)">
                        <rect width="32" height="32" rx="16" fill="currentColor"></rect>
                        <path d="M22.533 14.534a6.534 6.534 0 1 1-13.068 0 6.534 6.534 0 0 1 13.068 0Zm-1.491 6.702A8.34 8.34 0 0 1 16 22.934c-1.895 0-3.64-.64-5.047-1.7C7.153 22.907 4.8 28.118 4.8 30.4L16 32.5l11.2-2.1c0-2.261-2.427-7.472-6.158-9.164Z" fill="#fff"></path>
                    </g>
                    <rect x=".75" y=".75" width="30.5" height="30.5" rx="15.25" stroke="currentColor" stroke-width="1.5"></rect>
                    <defs>
                        <clipPath id="a">
                            <rect width="32" height="32" rx="16" fill="#fff"></rect>
                        </clipPath>
                    </defs>
                </svg>
                <p className="whitespace-pre-line text-wrap text-[16px] font-medium leading-[155%] grow text-gray-600">이름제대로 넣기</p>
                <Link to='/Setting'>
                    <a className="shrink-0 rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-1000" href="/mypage/info">수정</a>
                </Link>
            </section>
        </div>
    );
};

export default UserProfile;
