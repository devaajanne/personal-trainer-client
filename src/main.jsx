import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Customers from "./components/customer/Customers.jsx";
import Trainings from "./components/training/Trainings.jsx";
import Calendar from "./components/Calendar.jsx";
import Statistics from "./components/Statistics.jsx";
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
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/trainings",
        element: <Trainings />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
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
