import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";

export default function ExportCustomersCSV({ customers }) {
  const headers = [
    { label: "First name", key: "firstname" },
    { label: "Last name", key: "lastname" },
    { label: "Street address", key: "streetaddress" },
    { label: "Post code", key: "postcode" },
    { label: "City", key: "city" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Link self", key: "_links.self.href" },
    { label: "Link customer", key: "_links.customer.href" },
    { label: "Link trainings", key: "_links.trainings.href" },
  ];

  return (
    <div>
      <Button
        component={CSVLink}
        headers={headers}
        data={customers}
        separator={";"}>
        Export
      </Button>
    </div>
  );
}
