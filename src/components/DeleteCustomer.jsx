import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";

import { deleteCustomer } from "../utils/api_requests";

export default function DeleteCustomer({ customerURL, reloadCustomers }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteCustomer(customerURL); // Wait for DELETE request to finish before reloading to ensure rerender
    reloadCustomers();
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Delete</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete customer</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the customer? Note that the customers' trainings
          will also be deleted.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
