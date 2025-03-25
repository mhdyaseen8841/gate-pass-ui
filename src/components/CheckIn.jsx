import React, { useEffect, useState } from "react";

import {
  getCompany,
  getPerson,
  getPurpose,
  addPerson,
  addPurpose,
  visitEntry,
} from "../services/VisitorAPI";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ImageUploadComponent from "./ImageUploadComponent";
import AddDialog from "./AddDialog";
import DropdownSearch from "./DropDownSearch";
import { Business, Email, Person, Phone } from "@mui/icons-material";

const CheckIn = ({setView}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [currentVisitor, setCurrentVisitor] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    personToVisit: "",
    purpose: "",
    remarks: "",
    image: "",
    visitorType: "individual",
  });
  const [companies, setCompanies] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [person, setPerson] = useState([]);

  async function addPersonDetails(person_name) {
    const data = await addPerson(selectedCompanyId, person_name);
    getPersonByCompanyId(selectedCompanyId);
  }

  async function addPurposeName(purpose_name) {
   await addPurpose(purpose_name);
    fetchPurpose();
  }

  async function getPersonByCompanyId(companyId = null) {
    const data = await getPerson(companyId);
    setPerson(data);
  }

  async function fetchCompanies() {
    const data = await getCompany();
    setCompanies(data);
  }

  async function fetchPurpose() {
    const data = await getPurpose();
    setPurpose(data);
  }

  useEffect(() => {
    fetchCompanies();
    fetchPurpose();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCurrentVisitor({ ...currentVisitor, [name]: value });
  };

  const handleImageChange = (data, url) => {
    console.log(data);
    console.log(url);
    setCurrentVisitor({ ...currentVisitor, image: data });
  };
  // Handle check-in submission
  const handleCheckIn = () => {
    const newVisitor = {
      ...currentVisitor,
    };

    console.log(newVisitor);
    // setVisitors([...visitors, newVisitor]);
    // setCurrentVisitor(null);
    // setView("dashboard");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 600, 
            color: '#2c3e50',
            mb: 4 
          }}
        >
          Visitor Check-In
        </Typography>
      <Grid container spacing={2} flexDirection={{ xs: "column-reverse", md: "row" }}>
        
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} direction="column">
            <Grid item>
            
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={currentVisitor.name}
                onChange={handleInputChange}
                required
                  InputProps={{
                                    startAdornment: <Person sx={{ color: 'action.active', mr: 1 }} />
                                  }}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={currentVisitor.email}
                onChange={handleInputChange}
                 InputProps={{
                  startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />
                   }}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={currentVisitor.phone}
                onChange={handleInputChange}
                required
                 InputProps={{
                    startAdornment: <Phone sx={{ color: 'action.active', mr: 1 }} />
                   }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} >
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

             value={currentVisitor.visitorType}
             onChange={handleInputChange}
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
            <DropdownSearch
              options={purpose || []}
              label="Purpose To Visit"
              onChange={(selected) =>
                setCurrentVisitor({
                  ...currentVisitor,
                  purpose: selected?.value,
                })
              }
            />
            <AddDialog
              label="purpose"
              stateName="purpose"
              addData={addPurposeName}
              setData={setPurpose}
              setCurrentVisitor={setCurrentVisitor}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Company</InputLabel>
            <Select
              name="company"
              value={currentVisitor.company}
              label="Company"
              onChange={(e) => {
                const selectedCompany = companies.find(
                  (c) => c.company_name === e.target.value
                );
                console.log(selectedCompany);
                setSelectedCompanyId(selectedCompany.company_id);
                getPersonByCompanyId(selectedCompany.company_id);
                handleInputChange(e);
              }}
              startAdornment={<Business />}
            >
              {companies.map((c) => (
                <MenuItem key={c.company_id} value={c.company_name}>
                  {c.company_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <DropdownSearch
              options={person || []}
              label="Person To Visit"
              onChange={(selected) =>
                setCurrentVisitor({
                  ...currentVisitor,
                  personToVisit: selected?.value,
                })
              }
              //  disabled={!selectedCompanyId}
            />
            <AddDialog
              label="person"
              stateName="personToVisit"
              addData={addPersonDetails}
              setData={setPerson}
              setCurrentVisitor={setCurrentVisitor}
            />
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
  );
};

export default CheckIn;
