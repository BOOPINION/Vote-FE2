// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import Header from "../components/home/Header";
// import { Link } from "react-router-dom";
// import { FaVoteYea } from 'react-icons/fa';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import { useInView } from 'react-intersection-observer';
// import TopicSelector from "../components/voteMaker/topicSelector";

// interface VoteItem {
//   id: number;
//   title: string;
//   description: string;
//   totalVotes: number;
//   options: string[];
//   participants: number;
//   likes: number;
// }

// const initialVotes: VoteItem[] = [
//   {
//     id: 1,
//     title: "수명을 선택",
//     description: "어느 것이 더 좋습니까?",
//     totalVotes: 100,
//     options: ["20년 엄청 부자로 살다죽기", "70년 복불복으로 살기"],
//     participants: 50,
//     likes: 60,
//   },
//   {
//     id: 2,
//     title: "어떤 직장이 좋을까",
//     description: "~~",
//     totalVotes: 100,
//     options: ["좋아하는 일 하는데 끔찍한 상사", "일은 싫은데 좋은 상사"],
//     participants: 34,
//     likes: 60,
//   },
//   {
//     id: 3,
//     title: "더 화나는 일은???",
//     description: ".",
//     totalVotes: 100,
//     options: ["에어팟 한쪽만 잃어버림", "휴대폰 액정 파손"],
//     participants: 34,
//     likes: 75,
//   },
//   {
//     id: 4,
//     title: "민초반민초 ",
//     description: ".",
//     totalVotes: 100,
//     options: ["민초", "반민초", "둘다 ㄴ"],
//     participants: 34,
//     likes: 60,
//   },
//   {
//     id: 5,
//     title: "당신의 선택은?",
//     description: ".",
//     totalVotes: 100,
//     options: ["연인과의 100일 기념일", "오랜친구의 생일"],
//     participants: 34,
//     likes: 65,
//   },
//   // 추가적인 투표 아이템들...
// ];

// const fetchMoreVotes = (): VoteItem[] => [
//   {
//     id: 6,
//     title: "새로운 투표 제목",
//     description: "새로운 투표 설명",
//     totalVotes: 100,
//     options: ["옵션 1", "옵션 2"],
//     participants: 20,
//     likes: 10,
//   },
//   {
//     id: 7,
//     title: "또 다른 투표 제목",
//     description: "또 다른 투표 설명",
//     totalVotes: 100,
//     options: ["옵션 A", "옵션 B"],
//     participants: 30,
//     likes: 20,
//   },
// ];

// const App = () => {
//   const [votes, setVotes] = useState<VoteItem[]>(initialVotes);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchMore = () => {
//     const moreVotes = fetchMoreVotes();
//     if (moreVotes.length === 0) {
//       setHasMore(false);
//     } else {
//       setVotes(prevVotes => [...prevVotes, ...moreVotes]);
//     }
//   };

//   const { ref, inView } = useInView({
//     threshold: 0.1,
//   });

//   useEffect(() => {
//     if (inView && hasMore) {
//       fetchMore();
//     }
//   }, [inView, hasMore]);

//   return (
//     <div className="p-4">
//       <Header />
//       <div className="mt-8 flex justify-between items-center pl-2 pr-2">
//         <Autocomplete
//           multiple
//           id="multiple-limit-tags"
//           options={["연애", "일상", "취미", "학업", "취업"]}
//           renderInput={(params) => (
//             <TextField {...params} label="무엇이 고민인가요?" placeholder="해시태그 작성" />
//           )}
//           sx={{ width: '500px' }}
//         />
//         <div className="flex space-x-2 pl-2">
//           <Link to="/vote-maker">
//             <button className="createVote bg-gray-200 text-gray-700 px-4 py-4 rounded-full hover:bg-gray-300">
//               <FaVoteYea />
//             </button>
//           </Link>
//         </div>
//       </div>
//       <div className="overflow-auto max-h-[calc(100vh-160px)]">
//         <motion.ul
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="pt-4"
//         >
//           {votes.map((vote, index) => {
//             if (votes.length === index + 1) {
//               return (
//                 <Link to={`/vote-result`} key={vote.id}>
//                   <motion.li
//                     ref={ref}
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="p-4 m-2 shadow rounded-lg mb-4"
//                   >
//                     <h3 className="text-lg font-bold">{vote.title}</h3>
//                     <div className="mt-2">
//                       {vote.options.map((option, optionIndex) => (
//                         <motion.div
//                           key={optionIndex}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.1 * optionIndex }}
//                           className="flex items-center justify-between p-2 bg-gray-100 rounded-lg my-1"
//                         >
//                           <span>{option}</span>
//                         </motion.div>
//                       ))}
//                     </div>
//                     <div className="flex justify-center mt-4">
//                       <button className="text-sm bg-gray-800 text-white border px-16 py-2 rounded-xl">
//                         투표하고 결과보기
//                       </button>
//                     </div>
//                   </motion.li>
//                 </Link>
//               );
//             } else {
//               return (
//                 <Link to={`/vote-result`} key={vote.id}>
//                   <motion.li
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="p-4 m-2 shadow rounded-lg mb-4"
//                   >
//                     <h3 className="text-lg font-bold">{vote.title}</h3>
//                     <div className="mt-2">
//                       {vote.options.map((option, optionIndex) => (
//                         <motion.div
//                           key={optionIndex}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.1 * optionIndex }}
//                           className="flex items-center justify-between p-2 bg-gray-100 rounded-lg my-1"
//                         >
//                           <span>{option}</span>
//                         </motion.div>
//                       ))}
//                     </div>
//                     <div className="flex justify-center mt-4">
//                       <button className="text-sm bg-gray-800 text-white border px-16 py-2 rounded-xl">
//                         투표하고 결과보기
//                       </button>
//                     </div>
//                   </motion.li>
//                 </Link>
//               );
//             }
//           })}
//         </motion.ul>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/home/Header";
import { Link } from "react-router-dom";
import { FaVoteYea } from 'react-icons/fa';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useInView } from 'react-intersection-observer';
import axios from 'axios'; // Axios를 사용하여 API 호출

interface Author {
  id: number;
  name: string;
}

interface Hashtag {
  id: number;
  name: string;
}

interface VoteItem {
  id: number;
  title: string;
  createdAt: string;
  lastModifiedAt: string;
  author: Author;
  content: string;
  hashtags: Hashtag[];
}

const App = () => {
  const [votes, setVotes] = useState<VoteItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreVotes = async () => {
    try {
      const response = await axios.get('votes', {
        params: {
          page,
          number: 50,
        },
      });

      const newVotes = response.data.votes;
      if (newVotes.length === 0) {
        setHasMore(false);
      } else {
        setVotes((prevVotes) => [...prevVotes, ...newVotes]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to fetch votes:", error);
    }
  };

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreVotes();
    }
  }, [inView, hasMore]);

  return (
    <div className="p-4">
      <Header />
      <div className="mt-8 flex justify-between items-center pl-2 pr-2">
        <Autocomplete
          multiple
          id="multiple-limit-tags"
          options={["연애", "일상", "취미", "학업", "취업"]}
          renderInput={(params) => (
            <TextField {...params} label="무엇이 고민인가요?" placeholder="해시태그 작성" />
          )}
          sx={{ width: '500px' }}
        />
        <div className="flex space-x-2 pl-2">
          <Link to="/vote-maker">
            <button className="createVote bg-gray-200 text-gray-700 px-4 py-4 rounded-full hover:bg-gray-300">
              <FaVoteYea />
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-auto max-h-[calc(100vh-160px)]">
        <motion.ul
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pt-4"
        >
          {votes.map((vote, index) => {
            const voteElement = (
              <Link to={`/vote-result`} key={vote.id}>
                <motion.li
                  ref={index === votes.length - 1 ? ref : null}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 m-2 shadow rounded-lg mb-4"
                >
                  <h3 className="text-lg font-bold">{vote.title}</h3>
                  <p>{vote.content}</p>
                  <div className="mt-2">
                    {vote.hashtags.map((hashtag, hashtagIndex) => (
                      <span key={hashtag.id} className="mr-2 text-sm text-gray-600">#{hashtag.name}</span>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <button className="text-sm bg-gray-800 text-white border px-16 py-2 rounded-xl">
                      투표하고 결과보기
                    </button>
                  </div>
                </motion.li>
              </Link>
            );

            return voteElement;
          })}
        </motion.ul>
      </div>
    </div>
  );
};

export default App;

