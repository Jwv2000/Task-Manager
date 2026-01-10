import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableTask({ task, employees }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "4px",
    backgroundColor: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <small>
        {task.startTime} → {task.endTime}
      </small>
      {task.assignedTo && task.assignedTo.length > 0 && (
        <p>
          Assigned to:{" "}
          {task.assignedTo
            .map((id) => employees.find((u) => u.id === id)?.username)
            .join(", ")}
        </p>
      )}
    </div>
  );
}
