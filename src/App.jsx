import "./stylings/App.css";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/customerlist"}>Customers</Link>
        <Link to={"/traininglist"}>Trainings</Link>
        <Link to={"/trainingcalendar"}>Calendar</Link>
        <Link to={"/trainingstatistics"}>Statistics</Link>
      </nav>
      <Outlet />
    </div>
  );
}
