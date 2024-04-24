import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <div className=' p-4 flex justify-center'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='p-2 rounded-md shadow-lg' placeholder='Enter task' />
        <button type="submit" className='bg-green-400 p-2 ml-2 font-semibold text-white rounded-md text-md shadow-md hover:bg-green-200'>Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;