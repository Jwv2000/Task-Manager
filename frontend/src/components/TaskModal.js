import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function TaskModal({ task, date, close, onSave, onDelete }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStart(task.start);
      setEnd(task.end);
    } else if (date) {
      setTitle("");
      setStart(date + 'T09:00');
      setEnd(date + 'T10:00');
    }
  }, [task, date]);

  const handleSave = () => {
    if (!title) return;
    onSave({ title, start, end });
    close();
  };

  const handleDelete = () => {
    if (task) onDelete(task.id);
    close();
  };

  return (
    <Modal isOpen={true} onRequestClose={close} className="ReactModal__Content" overlayClassName="ReactModal__Overlay">
      <h2>{task ? 'Edit Task' : 'New Task'}</h2>
      <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
      <div style={{ marginTop: 20 }}>
        <button onClick={handleSave}>Save</button>
        {task && <button onClick={handleDelete} style={{ marginLeft: 10 }}>Delete</button>}
        <button onClick={close} style={{ marginLeft: 10 }}>Cancel</button>
      </div>
    </Modal>
  );
}
