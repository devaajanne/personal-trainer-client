import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import { fetchCustomerTrainings } from "../../utils/api_requests";
import dayjs from "dayjs";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Trainings() {
  const [customerTrainings, setCustomerTrainings] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Date",
      field: "date",
      valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY hh:mm"),
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

  useEffect(() => {
    const fetchData = async () => {
      const customerTrainingData = await fetchCustomerTrainings();
      setCustomerTrainings(customerTrainingData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>Trainings</p>
      <div className='ag-theme-material' style={{ width: 1500, height: 1500 }}>
        <AgGridReact rowData={customerTrainings} columnDefs={columnDefs} />
      </div>
    </div>
  );
}
