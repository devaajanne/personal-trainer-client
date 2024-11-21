import { useState, useEffect } from "react";

import { fetchCustomerTrainings } from "../utils/api_requests";

import { Calendar, luxonLocalizer} from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TrainingCalendar({ defaultView, views }) {
  const [calendarObjects, setCalendarObjects] = useState([]);
  const lLocalizer = luxonLocalizer(DateTime, {
    firstDayOfWeek: 1,
  });

  const fetchCustomerTrainingData = async () => {
    const customerTrainingsData = await fetchCustomerTrainings();
    customerTrainingCalendarObjects(customerTrainingsData);
  };

  useEffect(() => {
    fetchCustomerTrainingData();
  }, []);

  const customerTrainingCalendarObjects = (customerTrainingsData) => {
    const newCalendarObjects = customerTrainingsData.map(
      (customerTraining) => ({
        title: `${customerTraining.activity} / ${customerTraining.customer.firstname} ${customerTraining.customer.lastname}`,
        start: DateTime.fromISO(customerTraining.date).toJSDate(),
        end: DateTime.fromISO(customerTraining.date)
          .plus({ minutes: customerTraining.duration })
          .toJSDate(),
      })
    );
    setCalendarObjects(newCalendarObjects);
  };

  return (
    <div style={{ height: 700, marginTop: 10 }}>
      <Calendar
        localizer={lLocalizer}
        events={calendarObjects}
        startAccessor='start'
        endAccessor='end'
        // defaultView and views are set depending on are we rendering the calendar on the Calendar page (all views) or on the Home page (only agenda view)
        defaultView={defaultView}
        views={views}
        min={new Date(2000, 0, 1, 8, 0, 0)}
        max={new Date(2000, 0, 1, 20, 0, 0)}
      />
    </div>
  );
}
