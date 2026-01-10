import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import './App.css';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStart, setNewTaskStart] = useState('');
  const [newTaskEnd, setNewTaskEnd] = useState('');

  // fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // open modal for new task
  const openNewTaskModal = (dateStr) => {
    setCurrentTask(null);
    setNewTaskTitle('');
    setNewTaskStart(dateStr + 'T09:00'); // default start
    setNewTaskEnd(dateStr + 'T10:00');   // default end
    setShowModal(true);
  };

  // open modal for editing task
  const openEditTaskModal = (task) => {
    setCurrentTask(task);
    setNewTaskTitle(task.title);
    setNewTaskStart(task.start);
    setNewTaskEnd(task.end);
    setShowModal(true);
  };

  // save task (new or edit)
  const saveTask = async () => {
    if (!newTaskTitle) return;
    try {
      if (currentTask) {
        await axios.put(`http://localhost:5000/tasks/${currentTask.id}`, {
          title: newTaskTitle,
          start: newTaskStart,
          end: newTaskEnd,
        });
      } else {
        await axios.post('http://localhost:5000/tasks', {
          title: newTaskTitle,
          start: newTaskStart,
          end: newTaskEnd,
        });
      }
      fetchTasks();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // delete task
  const deleteTask = async () => {
    if (!currentTask) return;
    try {
      await axios.delete(`http://localhost:5000/tasks/${currentTask.id}`);
      fetchTasks();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
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

      {/* Task Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>{currentTask ? 'Edit Task' : 'New Task'}</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          type="datetime-local"
          value={newTaskStart}
          onChange={(e) => setNewTaskStart(e.target.value)}
        />
        <input
          type="datetime-local"
          value={newTaskEnd}
          onChange={(e) => setNewTaskEnd(e.target.value)}
        />
        <div style={{ marginTop: '12px' }}>
          <button onClick={saveTask}>{currentTask ? 'Save Changes' : 'Save'}</button>
          {currentTask && <button onClick={deleteTask} style={{ marginLeft: '8px' }}>Delete</button>}
          <button onClick={() => setShowModal(false)} style={{ marginLeft: '8px' }}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
