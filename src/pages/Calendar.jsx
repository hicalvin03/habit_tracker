import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Don't forget this!
import './Calendar.css'
import { useState } from 'react';
import { jsx } from 'react/jsx-runtime';




function DisplayTasks({history,date}){
  
const tasksOnDate = history[date] || []; // If empty use empty array
  return (
    <div className='listDisplay'>

      <h2 className=''>
        tasks done on {date}
      </h2>
      <ol>
        {tasksOnDate.map((task) => (
          <li>
            <span>{task}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function colourClass(count) {
  if (count === 0) return "task-lvl-0";
  if (count <= 3)  return "task-lvl-1";
  if (count <= 6) return "task-lvl-2";
  if (count <= 10) return "task-lvl-3";
  if (count <= 15) return "task-lvl-4"
  return "task-lvl-5";
}

function CalendarPage({history, setHistory, convertToYYYYMMDD}) {
  const [date, setDate] = useState(() => convertToYYYYMMDD(new Date()));

  const displayTileColour = ({ date, view }) => {

    if (view === 'month') {
      const dateString = convertToYYYYMMDD(date);
      const tasksOnDate = history[dateString] || []; 
      return colourClass(tasksOnDate.length);
    }
  };

  return (
    <div className="calendarPage">
        <Calendar
            formatShortWeekday={(locale, date) =>
              date.toLocaleDateString(locale, { weekday: "narrow" })
            }
            value={new Date(date)}
            tileClassName={displayTileColour} 
            onChange={(selectedDate) => {
              const formatted = convertToYYYYMMDD(selectedDate); 
              setDate(formatted);
            }}
        />
        <DisplayTasks history={history} date={date} />
    </div>
  );
}

export default CalendarPage;