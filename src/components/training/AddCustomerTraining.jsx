import { useState } from "react";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import TrainingDialog from "./TrainingDialog";
import { addCustomerTraining } from "../../utils/api_requests";

export default function AddCustomerTraining({ reloadCustomerTrainings }) {
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: "",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setTraining({
      date: "",
      activity: "",
      duration: "",
      customer: "",
    });
  };

  const handleSave = async () => {
    // Wait for POST request to finish before reloading up-to-date data
    await addCustomerTraining(training);
    reloadCustomerTrainings();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} startIcon={<AddIcon />}>
        Add customer training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new customer training</DialogTitle>
        <TrainingDialog training={training} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
