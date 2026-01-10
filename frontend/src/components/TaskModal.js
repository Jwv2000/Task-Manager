import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function TaskModal({ date, close, refresh }) {
  const [title, setTitle] = useState("");

  const saveTask = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/tasks",
      { title, start: date, end: date },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    refresh();
    close();
  };

  return (
    <Modal isOpen={true} onRequestClose={close} className="ReactModal__Content" overlayClassName="ReactModal__Overlay">
      <h2>New Task</h2>
      <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div style={{ marginTop: 20 }}>
        <button onClick={saveTask}>Save</button>
        <button onClick={close} style={{ marginLeft: 10 }}>Cancel</button>
      </div>
    </Modal>
  );
}
