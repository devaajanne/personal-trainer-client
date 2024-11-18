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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/fi";
import { fetchCustomers } from "../../utils/api_requests";

export default function TrainingDialog({ training, handleChange }) {
  const [customers, setCustomers] = useState([]);
  const handleDateChange = (newValue) => {
    handleChange({
      target: { name: "date", value: dayjs(newValue).toISOString() },
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
          <DateTimePicker
            autoFocus
            required
            name='date'
            label='Date and time'
            value={training.date ? dayjs(training.date) : null}
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
