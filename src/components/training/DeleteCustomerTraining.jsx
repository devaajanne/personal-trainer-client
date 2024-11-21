import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../../utils/api_requests";

import { deleteCustomerTraining } from "../../utils/api_requests";

export default function DeleteCustomerTraining({
  customerTrainingId,
  reloadCustomerTrainings,
}) {
  const [open, setOpen] = useState(false);
  const customerTrainingURL = API_URL + "/trainings/" + customerTrainingId;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // Wait for DELETE request to finish before reloading up-to-date data
    await deleteCustomerTraining(customerTrainingURL);
    reloadCustomerTrainings();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} color='error' startIcon={<DeleteIcon />}>
        Delete
      </Button>

      {/*We use Dialog instead of alert to confirm user's intent to delete the customer's training */}
      <Dialog open={open} onClose={handleClose}> 
        <DialogTitle>Delete customer training</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the customer's training?
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
