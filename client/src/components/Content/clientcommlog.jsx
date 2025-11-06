import React, { useState } from "react";
import Calendar from "react-calendar";
import NepaliDate from "nepali-date-converter"; // or your preferred B.S. library
import "react-calendar/dist/Calendar.css";

const HybridCalendar = () => {
  const [date, setDate] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const nepDate = NepaliDate.AD2BS(date.getFullYear(), date.getMonth() + 1, date.getDate());
      return (
        <div className="text-xs mt-1">
          <div>{date.getDate()}</div>
          <div className="text-gray-500">{`${nepDate.bsYear}-${nepDate.bsMonth}-${nepDate.bsDay}`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-center font-bold text-2xl mb-4">Hybrid Calendar (A.D. / B.S.)</h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        className="rounded-xl shadow-md p-2"
      />
    </div>
  );
};

export default HybridCalendar;
