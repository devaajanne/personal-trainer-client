import { useState } from "react";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CustomerDialog from "./CustomerDialog";
import { addCustomer } from "../../utils/api_requests";

export default function AddCustomer({ reloadCustomers }) {
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setCustomer({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      streetaddress: "",
      postcode: "",
      city: "",
    });
  };

  const handleSave = async () => {
    await addCustomer(customer); // Wait for POST request to finish before reloading to ensure rerender
    reloadCustomers();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} startIcon={<AddIcon />}>
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
