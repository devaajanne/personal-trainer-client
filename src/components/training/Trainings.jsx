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
  const defaultColumnDefs = {
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true,
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Date",
      field: "date",
      valueFormatter: (params) =>
        DateTime.fromISO(params.value).toFormat("d.MM.yyyy HH:mm"),
    },
    { headerName: "Duration", field: "duration" },
    { headerName: "Activity", field: "activity" },
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

  const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 100,
  };

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
      <div className='ag-theme-material' style={{ width: "100%", height: "80vh" }}>
        <AgGridReact
          rowData={customerTrainings}
          defaultColDef={defaultColumnDefs}
          columnDefs={columnDefs}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </div>
  );
}
