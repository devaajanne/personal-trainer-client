import { useState } from "react";

import CustomerDialog from "./CustomerDialog";
import { updateCustomer } from "../../utils/api_requests";

import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

export default function UpdateCustomer({ currentCustomer, reloadCustomers }) {
  const [customer, setCustomer] = useState(currentCustomer);
  const [open, setOpen] = useState(false);

  const customerURL = currentCustomer._links.self.href;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // Wait for PUT request to finish before reloading up-to-date data
    await updateCustomer(customerURL, customer);
    reloadCustomers();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} startIcon={<EditIcon />}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update customer info</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
