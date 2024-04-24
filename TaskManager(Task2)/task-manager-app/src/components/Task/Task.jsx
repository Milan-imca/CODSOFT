import React, { useState } from 'react';

const Task = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDate, setEditDate] = useState(task.completedDate || '');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(task.id, editText, editDate);
    setIsEditing(false);
  };

  return (
    <div className='border-2  rounded-lg p-3 m-2 shadow-xl w-[300px] flex flex-col justify-center hover:shadow-2xl'>
      <div className='p-3'>
        <span className='text-right text-lg font-medium'>
          {task.text}
        </span>
        <div className='mt-5 text-sm '>Created: {new Date(task.createdDate).toLocaleString()}</div>
        {task.completed && (
          <div className=' text-sm '>
            Completed: {new Date(task.completedDate).toLocaleString()}
          </div>
        )}
      </div>
      <div className=' flex justify-end '>
        {!task.completed && (
          <button className='bg-red-300 p-1 rounded-md m-1  pt-1 pb-1 pr-2 pl-2 font-medium hover:bg-red-100 hover:text-white' onClick={() => onToggleComplete(task.id)}>
            Mark Complete
          </button>
        )}
        {!task.completed && <button className="bg-purple-500 pt-1 pb-1 pr-2 pl-2 rounded-md m-1 font-medium hover:bg-purple-300 hover:text-white" onClick={handleEdit}>Edit</button>}
        <button className='bg-green-400 p-1 rounded-md  m-1  pt-1 pb-1 pr-2 pl-2 font-medium hover:bg-green-300 hover:text-white' onClick={() => onDelete(task.id)}>Delete</button>
      </div>
      {isEditing && (
        <div className=' p-3'>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className='p-1 rounded-md mr-2 shadow-md border-2 border-transparent'
          />

          <button onClick={handleSaveEdit} className='bg-green-300 pt-1 pb-1 pr-2 pl-2 rounded-md hover:bg-green-400 '>Save</button>
        </div>
      )}
    </div>
  );
};

export default Task;
