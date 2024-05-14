import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="sticky z-50 h-[68px] flex w-full items-center justify-between py-3 px-5 bg-white">
            <Link to="/myPage">
                <button type="button" className="inline-flex select-none items-center justify-center gap-5xs rounded-lg px-3 py-4 text-base font-medium disabled:cursor-not-allowed bg-transparent disabled:text-gray-50 w-fit min-w-fit !p-0">
                    <svg width="20" height="20" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg" color="#151719">
                        <path d="M9 1.5L1 9.5L9 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </Link>
            <p className="whitespace-pre-line text-wrap text-[20px] font-bold leading-[155%]">내 정보</p>
            <a href="/mypage/settings">
                <svg width="27" height="27" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" color="#151719">
                    <path d="M8.46424 2.95753C8.85511 1.34749 11.1449 1.34749 11.5358 2.95753C11.7883 3.9976 12.9799 4.49118 13.8938 3.93428C15.3087 3.07219 16.9278 4.69131 16.0657 6.10617C15.5088 7.02015 16.0024 8.21175 17.0425 8.46424C18.6525 8.85511 18.6525 11.1449 17.0425 11.5358C16.0024 11.7883 15.5088 12.9799 16.0657 13.8938C16.9278 15.3087 15.3087 16.9278 13.8938 16.0657C12.9799 15.5088 11.7883 16.0024 11.5358 17.0425C11.1449 18.6525 8.85511 18.6525 8.46424 17.0425C8.21175 16.0024 7.02015 15.5088 6.10617 16.0657C4.69131 16.9278 3.07219 15.3087 3.93428 13.8938C4.49118 12.9799 3.9976 11.7883 2.95753 11.5358C1.34749 11.1449 1.34749 8.85511 2.95753 8.46424C3.9976 8.21175 4.49118 7.02015 3.93428 6.10617C3.07219 4.69131 4.69131 3.07219 6.10617 3.93428C7.02015 4.49118 8.21175 3.9976 8.46424 2.95753Z" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12.75 10C12.75 11.5188 11.5188 12.75 10 12.75C8.48122 12.75 7.25 11.5188 7.25 10C7.25 8.48122 8.48122 7.25 10 7.25C11.5188 7.25 12.75 8.48122 12.75 10Z" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </a>
        </header>
    );
  };
  
  export default Header;