import { useState, useEffect } from "react";
import { fetchTrainings } from "../utils/api_requests";
import _ from "lodash";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Label,
  LabelList,
} from "recharts";

export default function Statistics() {
  const [trainings, setTrainings] = useState([]);
  const [data, setData] = useState([]);

  const fetchTrainingData = async () => {
    const trainingsData = await fetchTrainings();
    setTrainings(trainingsData._embedded.trainings);
  };

  useEffect(() => {
    fetchTrainingData();
  }, []);

  useEffect(() => {
    if (trainings.length > 0) {
      const dataGrouped = _.groupBy(trainings, "activity");
      console.log(dataGrouped);
      const dataSummed = _.map(dataGrouped, (activityList, activityname) => ({
        activity: activityname,
        totalDuration: _.sumBy(activityList, "duration"),
      }));
      console.log(dataSummed);
      setData(dataSummed);
    }
  }, [trainings]);

  return (
    <div>
      <BarChart width={1000} height={500} data={data} margin={{top: 20, left: 10}}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='activity'></XAxis>
        <YAxis
          label={{ value: "Duration (min)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey='totalDuration' fill='#2196f3'>
          <LabelList dataKey='totalDuration' position='top' />
        </Bar>
      </BarChart>
    </div>
  );
}
