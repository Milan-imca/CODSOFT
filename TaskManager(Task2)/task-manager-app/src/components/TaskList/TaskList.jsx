// import React from 'react';
// import Task from '../Task/Task';

// const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => (
//   <div>
//     {tasks.map((task) => (
//       <Task
//         key={task.id}
//         task={task}
//         onDelete={onDelete}
//         onToggleComplete={onToggleComplete}
//         onEdit={onEdit}
//       />
//     ))}
//   </div>
// );

// export default TaskList;

import React from 'react';
import Task from '../Task/Task';

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => (
  <div className=' flex flex-wrap justify-center'>
    {tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        onDelete={onDelete}
        onToggleComplete={onToggleComplete}
        onEdit={onEdit}
      />
    ))}
  </div>
);

export default TaskList;
