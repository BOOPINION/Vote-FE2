// import React, { useState, useEffect } from "react";
// import axios from 'axios';


// interface SetNickNameProps {
//     onSetting: (nickname: string) => void;
// }

// const SetName: React.FC<SetNickNameProps> = ({onSetting}) => {
//     const [nickname, setNickName] = useState(() => {
//         const storedNickname = localStorage.getItem("nickname");
//         //const storedName = await axios.get('api');
//         return storedNickname ? storedNickname : "boopinion";
//     });

//     useEffect(() => {
//         localStorage.setItem("nickname", nickname);
//     }, [nickname]);

//     const handleSetNickName = () => {
//         onSetting(nickname);
//     };

//     return (
//         <main className="flex size-full flex-col px-5">
//             <form className="mt-2">
//                 <div className="mb-xs flex flex-col gap-0.5">
//                     <div className="flex justify-between">
//                         <p className="whitespace-pre-line text-wrap text-[14px] font- leading-[155%] px-2">닉네임<span className="text-warning">*</span></p>
//                         <div>
//                             <span className="text-sm text-gray-600">0</span><span className="text-sm text-gray-400 pr-2">/20</span>
//                         </div>
//                     </div>
//                     <input 
//                         className="rounded-lg border border-gray-100 p-3 focus:outline-none" 
//                         value={nickname}
//                         placeholder="닉네임을 입력해 주세요" 
//                         name="nickname"
//                         maxLength={20}
//                         onChange={(e) => {setNickName(e.target.value);}}>
//                     </input>
//                     <p className="whitespace-pre-line text-wrap text-[14px] font-normal leading-[155%] text-gray-400 px-2 pb-10">닉네임을 입력해 주세요. (특수문자 제외)</p>
//                 </div>
//                 <button
//                     type="submit"
//                     className="inline-flex select-none items-center justify-center gap-5 rounded-lg px-3 py-4 text-base font-medium disabled:cursor-not-allowed bg-gray-1000 text-white disabled:bg-[#D7DBE0] disabled:text-gray-400 w-full bg-black" 
//                     disabled={!nickname}
//                     onClick={handleSetNickName}>확인</button>
//             </form>
//         </main>
//     );
// };

// export default SetName;

import React, { useState, useEffect } from "react";
import axios from 'axios';

interface SetNickNameProps {
    onSetting: (nickname: string) => void;
}

const SetName: React.FC<SetNickNameProps> = ({onSetting}) => {
    const [nickname, setNickName] = useState(() => {
        const storedNickname = localStorage.getItem("nickname");
        return storedNickname ? storedNickname : "boopinion";
    });

    useEffect(() => {
        localStorage.setItem("nickname", nickname);
    }, [nickname]);

    const handleSetNickName = async () => {
        try {
            // 사용자 이름 업데이트 요청 보내기
            await axios.patch('api', { nickname });

            // 업데이트가 성공하면 부모 컴포넌트에 새로운 닉네임을 전달합니다.
            onSetting(nickname);
            console.log('Nickname updated successfully.');
        } catch (error) {
            console.error('Error updating nickname:', error);
        }
    };

    return (
        <main className="flex size-full flex-col px-5">
            <form className="mt-2">
                <div className="mb-xs flex flex-col gap-0.5">
                    <div className="flex justify-between">
                        <p className="whitespace-pre-line text-wrap text-[14px] font- leading-[155%] px-2">닉네임<span className="text-warning">*</span></p>
                        <div>
                            <span className="text-sm text-gray-600">0</span><span className="text-sm text-gray-400 pr-2">/20</span>
                        </div>
                    </div>
                    <input 
                        className="rounded-lg border border-gray-100 p-3 focus:outline-none" 
                        value={nickname}
                        placeholder="닉네임을 입력해 주세요" 
                        name="nickname"
                        maxLength={20}
                        onChange={(e) => {setNickName(e.target.value);}}>
                    </input>
                    <p className="whitespace-pre-line text-wrap text-[14px] font-normal leading-[155%] text-gray-400 px-2 pb-10">닉네임을 입력해 주세요. (특수문자 제외)</p>
                </div>
                <button
                    type="submit" 
                    className="inline-flex select-none items-center justify-center gap-5 rounded-lg px-3 py-4 text-base font-medium disabled:cursor-not-allowed bg-gray-1000 text-white disabled:bg-[#D7DBE0] disabled:text-gray-400 w-full bg-black" 
                    disabled={!nickname}
                    onClick={handleSetNickName}>확인</button>
            </form>
        </main>
    );
};

export default SetName;

