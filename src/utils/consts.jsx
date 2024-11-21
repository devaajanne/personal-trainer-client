import { Views } from "react-big-calendar";

// These are for the calendar view on Calendar page
const defaultView = Views.WEEK;
const views = [Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA];

// These are for the calendar view on Home page
const homeDefaultView = Views.AGENDA;
const homeViews = [Views.AGENDA];

export {defaultView, views, homeDefaultView, homeViews};