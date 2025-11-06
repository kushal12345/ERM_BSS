import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import NepaliDate from "nepali-date-converter";

const CustomFullCalendar = () => {
  const [events, setEvents] = useState([]);

  // Click on a date to add a note
  const handleDateClick = (arg) => {
    const note = prompt(`Add note for ${arg.dateStr} (AD):`);
    if (note) {
      setEvents([...events, { title: note, date: arg.dateStr }]);
    }
  };

  // Render event content with AD + BS
  const renderEventContent = (eventInfo) => {
    const adDate = new Date(eventInfo.event.start);
    const nepDate = new NepaliDate(adDate);
    return (
      <div className="flex flex-col ">
        <span className="font-semibold text-black no-underline">{eventInfo.event.title}</span>
        <span className="text-md text-gray-500 ">{`${nepDate.getYear()}/${nepDate.getMonth() + 1}/${nepDate.getDate()}`}</span>
      </div>
    );
  };

  // Render day cells with AD + BS
  const renderDayCell = (arg) => {
    const adDate = new Date(arg.date);
    const nepDate = new NepaliDate(adDate);
    return (
      <div className="flex flex-col items-center">
        <span className="font-bold text-black no-underline">{adDate.getDate()}</span>
        <span className="text-[15px] text-gray-500 no-underline">{`${nepDate.getDay()}`}</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-white  h-[90vh] p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        dayCellContent={renderDayCell}
        height="100%"
        contentHeight="80%"
      />
    </div>
  );
};

export default CustomFullCalendar;
