import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import { fetchCustomers } from "../utils/api_requests";
import AddCustomer from "./AddCustomer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "First name",
      field: "firstname",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Last name",
      field: "lastname",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Street address",
      field: "streetaddress",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Post code",
      field: "postcode",
      filter: true,
      floatingFilter: true,
    },
    { headerName: "City", field: "city", filter: true, floatingFilter: true },
    { headerName: "Email", field: "email", filter: true, floatingFilter: true },
    { headerName: "Phone", field: "phone", filter: true, floatingFilter: true },
  ]);

  const fetchCustomerData = async () => {
    const customerData = await fetchCustomers();
    setCustomers(customerData);
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <div>
      <AddCustomer reloadCustomers={fetchCustomerData} />
      <div className='ag-theme-material' style={{ width: 1500, height: 1500 }}>
        <AgGridReact rowData={customers} columnDefs={columnDefs} />
      </div>
    </div>
  );
}
