import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Customers from "./components/customer/Customers.jsx";
import Trainings from "./components/training/Trainings.jsx";
import TrainingCalendar from "./components/TrainingCalendar.jsx";
import Statistics from "./components/Statistics.jsx";
import Error from "./components/Error.jsx";
import {defaultView, views} from "./utils/consts.jsx"

const router = createHashRouter([
  {
    path: "/",
    basename: "/personal-trainer-client",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/trainings",
        element: <Trainings />,
      },
      {
        path: "/calendar",
        // Here we pass imported props, because this component shows different calendar views
        // on Home and Calendar pages
        element: <TrainingCalendar defaultView={defaultView} views={views}/>,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
