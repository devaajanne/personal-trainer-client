import TrainingCalendar from "./TrainingCalendar";
import { homeDefaultView, homeViews } from "../utils/consts.jsx";

export default function Home() {
  return (
    <div>
      <h3>Welcome!</h3>
      <p>Here is your upcoming agenda:</p>
      <TrainingCalendar defaultView={homeDefaultView} views={homeViews} />
    </div>
  );
}
