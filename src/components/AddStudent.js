import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddStudent = ({ onAdd, onClose }) => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: ''
  });

  const InputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const Submit = () => {
    fetch(`http://localhost:8080/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((addedStudent) => {
        onAdd(addedStudent);
      })
      .catch((error) => console.error('Error adding student:', error));
  };

  return (
    <Dialog open={true} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Student</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          name="name"
          value={newStudent.name}
          onChange={InputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          name="email"
          value={newStudent.email}
          onChange={InputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={Submit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudent;
