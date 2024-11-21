import { useState } from "react";

import { deleteCustomer } from "../../utils/api_requests";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteCustomer({ customerURL, reloadCustomers }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // Wait for DELETE request to finish before reloading up-to-date data
    await deleteCustomer(customerURL);
    reloadCustomers();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} color='error' startIcon={<DeleteIcon />}>
        Delete
      </Button>

      {/*We use Dialog instead of alert to confirm user's intent to delete the customer */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete customer</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the customer? Note that the customers'
          trainings will also be deleted.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
