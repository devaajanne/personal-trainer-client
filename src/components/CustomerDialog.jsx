import { TextField, DialogContent } from "@mui/material";

export default function customerDialog({ customer, handleChange }) {
  return (
    <DialogContent>
      <TextField
        autoFocus
        required
        name='firstname'
        label='First name'
        type='text'
        fullWidth
        variant='standard'
        value={customer.firstname}
        onChange={handleChange}
      />
      <TextField
        required
        name='lastname'
        label='Last name'
        type='text'
        fullWidth
        variant='standard'
        value={customer.lastname}
        onChange={handleChange}
      />
      <TextField
        required
        name='email'
        label='Email'
        type='text'
        fullWidth
        variant='standard'
        value={customer.email}
        onChange={handleChange}
      />
      <TextField
        required
        name='phone'
        label='Phone'
        type='text'
        fullWidth
        variant='standard'
        value={customer.phone}
        onChange={handleChange}
      />
      <TextField
        required
        name='streetaddress'
        label='Street address'
        type='text'
        fullWidth
        variant='standard'
        value={customer.streetaddress}
        onChange={handleChange}
      />
      <TextField
        required
        name='postcode'
        label='Post code'
        type='text'
        fullWidth
        variant='standard'
        value={customer.postcode}
        onChange={handleChange}
      />
      <TextField
        required
        name='city'
        label='City'
        type='text'
        fullWidth
        variant='standard'
        value={customer.city}
        onChange={handleChange}
      />
    </DialogContent>
  );
}
