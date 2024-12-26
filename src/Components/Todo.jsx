import { useState, useEffect } from "react";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === '') return;
    if (isEditing) {
      const updatedTasks = tasks.map((t, i) =>
        i === currentTaskIndex ? { ...t, name: task } : t
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      setTasks([...tasks, { name: task, completed: false }]);
    }
    setTask('');
  };

  const handleEditTask = (index) => {
    setTask(tasks[index].name);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg border ${
                t.completed ? 'bg-green-100' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggleComplete(index)}
                  className="w-5 h-5"
                />
                <span className={`${t.completed ? 'line-through text-gray-500' : ''}`}>
                  {t.name}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTask(index)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
