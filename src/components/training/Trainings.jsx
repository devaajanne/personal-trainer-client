import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import { fetchCustomerTrainings } from "../../utils/api_requests";
import { DateTime } from "luxon";
import AddCustomerTraining from "./AddCustomerTraining";
import DeleteCustomerTraining from "./DeleteCustomerTraining";
import Stack from "@mui/material/Stack";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Trainings() {
  const [customerTrainings, setCustomerTrainings] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Date",
      field: "date",
      valueFormatter: (params) =>
        DateTime.fromISO(params.value).toFormat("d.MM.yyyy HH:mm"),
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
    {
      headerName: "",
      field: "_links.self.href",
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <DeleteCustomerTraining
          customerTrainingId={params.data.id}
          reloadCustomerTrainings={fetchCustomerTrainingData}
        />
      ),
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
      <Stack direction='row'>
        <AddCustomerTraining
          reloadCustomerTrainings={fetchCustomerTrainingData}
        />
      </Stack>
      <div className='ag-theme-material' style={{ width: 1500, height: 1500 }}>
        <AgGridReact rowData={customerTrainings} columnDefs={columnDefs} />
      </div>
    </div>
  );
}
