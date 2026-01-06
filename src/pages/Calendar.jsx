import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Don't forget this!
import './Calendar.css'

function CalendarPage() {
  return (
    <div className="calendarPage">
        <Calendar
            formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: "narrow" })
            }
        />
    </div>
  );
}

export default CalendarPage;