import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";

const AddDialog = ({label, stateName, addData, setData, setCurrentVisitor }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (name.trim() === "") return;
    const newData = { value: name, label: name };
    setData(prev => [...prev, newData]); // Update the list of daa
    setCurrentVisitor(prev => ({ ...prev, stateName: newData.value }));
    addData(name); 
    setName("");
    setOpen(false);
  };

 
  return (
    <>
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Button 
          variant="text" 
          size="small" 
          onClick={() => setOpen(true)}
          style={{ textTransform: "none" }}
        >
          ➕ Add {label}
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New {label}</DialogTitle>
        <DialogContent>
          <TextField
          style={{marginTop: 10}}
            autoFocus
            fullWidth
            label= {label+" Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDialog;
