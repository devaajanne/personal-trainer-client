import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./components/Home.jsx";
import CustomerList from "./components/CustomerList.jsx";
import TrainingList from "./components/TrainingList.jsx";
import TrainingCalendar from "./components/TrainingCalendar.jsx";
import TrainingStatistics from "./components/TrainingStatistics.jsx";
import Error from "./components/Error.jsx";

import "./Stylings/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "/customerlist",
        element: <CustomerList />,
      },
      {
        path: "/traininglist",
        element: <TrainingList />,
      },
      {
        path: "/trainingcalendar",
        element: <TrainingCalendar />,
      },
      {
        path: "/trainingstatistics",
        element: <TrainingStatistics />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
