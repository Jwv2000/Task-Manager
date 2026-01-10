// frontend/src/components/Calendar.js
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

export default function Calendar({ tasks, onDateClick, onEventClick }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={tasks.map(t => ({
        id: t.id,
        title: t.title,
        start: t.start,
        end: t.end
      }))}
      dateClick={e => onDateClick(e.dateStr)}
      eventClick={e => onEventClick(tasks.find(t => t.id === Number(e.event.id)))}
      height="75vh"
    />
  );
}
