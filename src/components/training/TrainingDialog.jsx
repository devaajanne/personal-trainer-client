import { TextField, DialogContent } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/fi";

export default function TrainingDialog({ training, handleChange }) {
  const handleDateChange = (newValue) => {
    handleChange({
      target: { name: "date", value: dayjs(newValue).toISOString() },
    });
  };

  return (
    <div>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
          <DateTimePicker
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
        <TextField
          required
          name='customer'
          label='Customer'
          type='text'
          fullWidth
          variant='standard'
          value={training.customer}
          onChange={handleChange}
        />
      </DialogContent>
    </div>
  );
}
