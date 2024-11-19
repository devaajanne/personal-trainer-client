// Big Calendar
// https://jquense.github.io/react-big-calendar/examples/

import { useState, useEffect } from "react";
import { fetchCustomerTrainings } from "../utils/api_requests";
import { Calendar, luxonLocalizer, Views } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TrainingCalendar() {
  const [calendarObjects, setCalendarObjects] = useState([]);
  const lLocalizer = luxonLocalizer(DateTime);

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
        defaultView={Views.WEEK}
        views={[Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]}
        min={new Date(2000, 0, 1, 8, 0, 0)}
        max={new Date(2000, 0, 1, 20, 0, 0)}
      />
    </div>
  );
}
