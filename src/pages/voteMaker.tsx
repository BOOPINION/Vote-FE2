import React, { useState } from 'react';

type TodoItem = {
  id: number;
  text: string;
};

const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    { id: Date.now(), text: '' },
    { id: Date.now() + 1, text: '' },
  ]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const topics = ['20대', '30대', '연애', 'MBTI'];

  const handleAddTodo = () => {
    if (todoItems.length < 5) {
      const newItem: TodoItem = {
        id: Date.now(),
        text: '',
      };
      setTodoItems([...todoItems, newItem]);
    }
  };

  const handleTodoChange = (id: number, text: string) => {
    setTodoItems(
      todoItems.map(item => (item.id === id ? { ...item, text } : item))
    );
  };

  const handleRemoveTodo = (id: number) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  const formattedEndDate = endDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="flex flex-col items-center justify-center p-4 pl-8 pr-8 bg-white rounded-lg shadow">
      <div className="p-2 flex justify-between items-center w-full">
        <button className="text-2xl">x</button>
        투표 만들기
        <button>완료</button>
      </div>
      <div className="mt-4 w-full">
        <select
          value={selectedTopic}
          onChange={handleTopicChange}
          className="w-full rounded-lg border-2 p-2 mb-4"
        >
          <option value="">주제를 선택해주세요</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="제목 내용을 입력해 주세요"
        className="mt-4 w-full rounded-lg border-2 p-2 mb-2"
      />
      <input
        type="text"
        placeholder="투표 내용을 입력해 주세요"
        className="mt-4 w-full rounded-lg border-2 p-2 mb-4 "
      />

      <div className="flex items-center justify-center  w-full overflow-y-hidden">
        <div className="w-full max-w-md bg-white shadow-md">
          <div className="p-4 ">
            <h2 className="text-lg font-semibold text-center">투표</h2>
            {todoItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center border border-gray-300 rounded-lg p-3 my-4"
              >
                <input
                  type="text"
                  value={item.text}
                  onChange={e => handleTodoChange(item.id, e.target.value)}
                  className="flex-grow p-2 rounded-l-lg border-0 focus:outline-none"
                  placeholder={`투표 항목 #${index + 1}`}
                />
                <button
                  onClick={() => handleRemoveTodo(item.id)}
                  className="text-red-500 bg-transparent hover:bg-red-100 p-2 rounded-full"
                  aria-label="Remove item"
                >
                  &ndash;
                </button>
              </div>
            ))}
            <button
              onClick={handleAddTodo}
              className="w-full bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
              disabled={todoItems.length >= 5}
            >
              + 항목 추가
            </button>
            <div className="text-gray-500 pt-4 text-center">
              종료일 : {formattedEndDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
