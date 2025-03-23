import React,{useState} from 'react'

import { getCompany,getPerson,getPurpose,addPerson,addPurpose, visitEntry } from '../services/VisitorAPI';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import ImageUploadComponent from './ImageUploadComponent';
const CheckIn = () => {

    const [currentVisitor, setCurrentVisitor] = useState({});


    // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVisitor({ ...currentVisitor, [name]: value });
  };

  const handleImageChange = (data,url) =>{
    console.log(data)
    console.log(url)
    setCurrentVisitor({ ...currentVisitor, image: data });
  }
  // Handle check-in submission
  const handleCheckIn = () => {
    const newVisitor = {
      ...currentVisitor,
    };

    console.log(newVisitor)
    // setVisitors([...visitors, newVisitor]);
    // setCurrentVisitor(null);
    // setView("dashboard");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
    <Grid container>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
           
            <Typography variant="h5" sx={{ mb: 3 }}>
              Visitor Check-In
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={currentVisitor.name}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={currentVisitor.email}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={currentVisitor.phone}
            onChange={handleInputChange}
            required
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <ImageUploadComponent handleImageChange={handleImageChange} />
      </Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Visitor Type</FormLabel>
          <RadioGroup
            row
            name="visitorType"

            // value={visitorType}
            // onChange={handleRadioChange}
          >
            <FormControlLabel
              value="individual"
              control={<Radio />}
              label="Individual"
            />
            <FormControlLabel
              value="group"
              control={<Radio />}
              label="Group"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={currentVisitor.address}
          onChange={handleInputChange}
          multiline
          rows={4}
          placeholder="Enter additional details..."
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Purpose of Visit</InputLabel>
          <Select
            name="purpose"
            value={currentVisitor.purpose}
            label="Purpose of Visit"
            onChange={handleInputChange}
          >
            <MenuItem value="Meeting">Meeting</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Delivery">Delivery</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Company</InputLabel>
          <Select
            name="company"
            value={currentVisitor.Company}
            label="Company"
            onChange={handleInputChange}
          >
            <MenuItem value="ABC">ABC</MenuItem>
            <MenuItem value="LMB">LMB</MenuItem>
            <MenuItem value="LLP">LLP</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Person to Visit</InputLabel>
          <Select
            name="personToVisit"
            value={currentVisitor.personToVisit}
            label="Person to Visit"
            onChange={handleInputChange}
          >
            <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
            <MenuItem value="David Williams">David Williams</MenuItem>
            <MenuItem value="Lisa Anderson">Lisa Anderson</MenuItem>
            <MenuItem value="Michael Brown">Michael Brown</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          placeholder="Remarks"
          name="remarks"
          label="Remarks"
          value={currentVisitor.remarks}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />
      </Grid>
    </Grid>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 4,
        gap: 2,
      }}
    >
      <Button variant="outlined" onClick={() => setView("dashboard")}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCheckIn}
        disabled={
          !currentVisitor.name ||
          !currentVisitor.personToVisit ||
          !currentVisitor.purpose
        }
      >
        Complete Check-In
      </Button>
    </Box>
  </Paper>
  )
}

export default CheckIn
