import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import { fetchCustomerTrainings } from "../../utils/api_requests";
import dayjs from "dayjs";
import AddCustomerTraining from "./AddCustomerTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Trainings() {
  const [customerTrainings, setCustomerTrainings] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Date",
      field: "date",
      valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY HH:mm"),
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Duration",
      field: "duration",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Activity",
      field: "activity",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Customer",
      field: "customer",
      valueGetter: (params) => {
        return `${params.data.customer.firstname} ${params.data.customer.lastname}`;
      },
      filter: true,
      floatingFilter: true,
    },
  ]);

  const fetchCustomerTrainingData = async () => {
    const customerTrainingsData = await fetchCustomerTrainings();
    setCustomerTrainings(customerTrainingsData);
  };

  useEffect(() => {
    fetchCustomerTrainingData();
  }, []);

  return (
    <div>
      <AddCustomerTraining
        reloadCustomerTrainings={fetchCustomerTrainingData}
      />
      <div className='ag-theme-material' style={{ width: 1500, height: 1500 }}>
        <AgGridReact rowData={customerTrainings} columnDefs={columnDefs} />
      </div>
    </div>
  );
}
