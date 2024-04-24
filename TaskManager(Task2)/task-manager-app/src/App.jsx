import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/Task/TaskForm';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const addTask = (text, completionDate) => {
    const newTask = { id: Date.now(), text, completed: false, createdDate: Date.now(), completedDate: completionDate || null };
    setTasks([...tasks, newTask]);
    toast.success('Task added successfully!');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setCompletedTasks(completedTasks.filter((task) => task.id !== id));
    toast.success('Task deleted successfully!');
  };

  const toggleComplete = (id) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed, completedDate: task.completed ? null : Date.now() } : task
  );

  const completedTask = updatedTasks.find((task) => task.id === id);
  if (completedTask.completed) {
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success('Task completed successfully!');
  } else {
    setCompletedTasks(completedTasks.filter((task) => task.id !== id));
    setTasks(updatedTasks);
  }
};

  const editTask = (id, newText, newCompletionDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, completedDate: newCompletionDate } : task
      )
    );
    toast.success('Task edited successfully!');
    setCompletedTasks(
      completedTasks.map((task) =>
        task.id === id ? { ...task, text: newText, completedDate: newCompletionDate } : task
      )
    );
  };

  return (
    <div>
      <Toaster />
      <h1 className='text-3xl mt-3  text-center text-blue-700 font-bold'>Task Manager</h1>
      <TaskForm onSubmit={addTask} />
      <h2 className='text-lg text-center text-blue-700 font-semibold'>Incomplete Tasks</h2>
     
      <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          onEdit={editTask}
        />
      <h2 className='text-lg text-center text-blue-700 font-semibold'>Completed Tasks</h2>
      <TaskList
        tasks={completedTasks}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
        onEdit={editTask}
      />
    </div>
  );
};

export default App;
