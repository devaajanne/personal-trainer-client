import { useState, useEffect } from "react";
import {
  TextField,
  DialogContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { fetchCustomers } from "../../utils/api_requests";

export default function TrainingDialog({ training, handleChange }) {
  const [customers, setCustomers] = useState([]);

  const handleDateChange = (newValue) => {
    handleChange({
      // Here we convert datetime object to ISO8601 string, so we can set it to the training state
      target: { name: "date", value: newValue.toISO() },
    });
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
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale='fi'>
          <DateTimePicker
            autoFocus
            required
            name='date'
            label='Date and time'
            value={
            // Here we convert ISO8601 string to datetime, so we can place it to MUI datetime picker
              training.date ? DateTime.fromISO(training.date) : null
            }
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <TextField
          required
          name='activity'
          label='Activity'
          type='text'
          fullWidth
          variant='standard'
          value={training.activity}
          onChange={handleChange}
        />
        <TextField
          required
          name='duration'
          label='Duration'
          type='text'
          fullWidth
          variant='standard'
          value={training.duration}
          onChange={handleChange}
        />
        <FormControl fullWidth variant='standard' required>
          <InputLabel id='customer'>Customer</InputLabel>
          <Select
            labelId='customer'
            name='customer'
            value={training.customer}
            onChange={handleChange}>
            {/*This map function lists all customers into a dropdown menu */}
            {/*This way we can select a customer directly from the list */}
            {customers.map((customer) => (
              <MenuItem
                key={customer._links.self.href}
                value={customer._links.self.href}>
                {customer.firstname} {customer.lastname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
    </div>
  );
}
