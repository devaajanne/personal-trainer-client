import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

import { fetchCustomers } from "../../utils/api_requests";
import AddCustomer from "./AddCustomer";
import UpdateCustomer from "./UpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";
import ExportCustomersCSV from "./ExportCustomersCSV";

import Stack from "@mui/material/Stack";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const defaultColumnDefs = {
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true,
  };

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "First name", field: "firstname" },
    { headerName: "Last name", field: "lastname" },
    { headerName: "Street address", field: "streetaddress" },
    { headerName: "Post code", field: "postcode" },
    { headerName: "City", field: "city" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    {
      headerName: "",
      field: "_links.self.href",
      sortable: false,
      filter: false,
      resizable: false,
      cellRenderer: (params) => (
        <UpdateCustomer
          currentCustomer={params.data}
          reloadCustomers={fetchCustomerData}
        />
      ),
    },
    {
      headerName: "",
      field: "_links.self.href",
      sortable: false,
      filter: false,
      resizable: false,
      cellRenderer: (params) => (
        <DeleteCustomer
          customerURL={params.data._links.self.href}
          reloadCustomers={fetchCustomerData}
        />
      ),
    },
  ]);

  const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 100,
  };

  const fetchCustomerData = async () => {
    const customerData = await fetchCustomers();
    setCustomers(customerData);
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <div>
      <Stack direction='row'>
        <AddCustomer reloadCustomers={fetchCustomerData} />
        <ExportCustomersCSV customers={customers} />
      </Stack>
      <div
        className='ag-theme-material'
        style={{ width: "100%", height: "80vh" }}>
        <AgGridReact
          rowData={customers}
          defaultColDef={defaultColumnDefs}
          columnDefs={columnDefs}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </div>
  );
}
