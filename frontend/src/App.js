import React, { useState, useContext } from 'react';
import Calendar from './components/Calendar';
import TaskModal from './components/TaskModal';
import Login from './components/Login';
import { useTasks } from './hooks/useTasks';
import { AuthContext } from './context/AuthContext';
import './App.css';

function App() {
  const { user } = useContext(AuthContext);
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  if (!user) {
    return <Login />;
  }

  const openNewTaskModal = (dateStr) => {
    setCurrentTask(null);
    setSelectedDate(dateStr);
    setShowModal(true);
  };

  const openEditTaskModal = (task) => {
    setCurrentTask(task);
    setSelectedDate(null);
    setShowModal(true);
  };

  const handleSaveTask = async (taskData) => {
    if (currentTask) {
      await updateTask(currentTask.id, taskData);
    } else {
      await addTask(taskData);
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
  };

  return (
    <div className="dashboard-frame">
      <header>
        <div className="header-inner">
          <div className="header-text">
            <h1>PHEASANT COUNTRY TASK MANAGER</h1>
            <p>Legacy Dashboard</p>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Left Boxes */}
        <div className="box weather">Weather</div>
        <div className="box working">Who is Working Today</div>
        <div className="box emergencies">Emergencies / Concerns</div>

        {/* Calendar */}
        <div className="calendar-center">
          <Calendar
            tasks={tasks}
            onDateClick={openNewTaskModal}
            onEventClick={openEditTaskModal}
          />
        </div>

        {/* Right Boxes */}
        <div className="box fertilizer">Fertilizer Notifications</div>
        <div className="box chemical">Chemical Notifications</div>
        <div className="box projects">Upcoming Projects / Tasks</div>
      </div>

      {showModal && (
        <TaskModal
          task={currentTask}
          date={selectedDate}
          close={() => setShowModal(false)}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
