import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const openNewTaskModal = (info) => {
    setCurrentTask(null);
    setNewTaskData({
      title: "",
      startTime: info.dateStr,
      endTime: info.dateStr,
    });
    setModalIsOpen(true);
  };

  const openEditTaskModal = (info) => {
    const task = tasks.find((t) => t.id.toString() === info.event.id);
    if (!task) return;
    setCurrentTask(task);
    setNewTaskData({
      title: task.title,
      startTime: task.start,
      endTime: task.end,
    });
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTaskData({ ...newTaskData, [name]: value });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewTaskData({ title: "", startTime: "", endTime: "" });
    setCurrentTask(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTask) {
      fetch(`http://localhost:3000/tasks/${currentTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskData),
      })
        .then((res) => res.json())
        .then((updatedTask) => {
          setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
          closeModal();
        });
    } else {
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskData),
      })
        .then((res) => res.json())
        .then((newTask) => {
          setTasks([...tasks, newTask]);
          closeModal();
        });
    }
  };

  const handleDelete = () => {
    if (!currentTask) return;
    fetch(`http://localhost:3000/tasks/${currentTask.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== currentTask.id));
        closeModal();
      });
  };

  return (
    <div className="dashboard-frame">
      <header>
        <div className="header-text">
          <h1>PHEASANT COUNTRY TASK MANAGER</h1>
          <p>Legacy Dashboard</p>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="calendar-shell">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            allDaySlot={false}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            events={tasks.map((t) => ({
              id: t.id.toString(),
              title: t.title,
              start: t.startTime,
              end: t.endTime,
            }))}
            dateClick={openNewTaskModal}
            eventClick={openEditTaskModal}
          />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Task Modal"
      >
        <h2>{currentTask ? "Edit Task" : "New Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={newTaskData.title}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={newTaskData.startTime}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={newTaskData.endTime}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "18px" }}>
            {currentTask && (
              <button type="button" onClick={handleDelete} style={{ background: "#d9534f", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px" }}>
                Delete
              </button>
            )}
            <div style={{ marginLeft: "auto" }}>
              <button type="submit" style={{ background: "#17362a", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px" }}>
                {currentTask ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;
