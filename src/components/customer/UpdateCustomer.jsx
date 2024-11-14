import { useState } from "react";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import CustomerDialog from "./CustomerDialog";
import { updateCustomer } from "../../utils/api_requests";

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
    await updateCustomer(customerURL, customer); // Wait for PUT request to finish before reloading to ensure rerender
    reloadCustomers();
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Update</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update customer info</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
