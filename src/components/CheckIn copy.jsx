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
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Person, Email, Phone, LocationOn, Business, Category, Notes } from '@mui/icons-material';
import ImageUploadComponent from "./ImageUploadComponent";
import AddDialog from "./AddDialog";
import DropdownSearch from "./DropDownSearch";

const CheckIn = () => {
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

  async function addPurpose(purpose_name) {
    const data = await addPurpose(purpose_name);
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
    <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f0f2f5' 
    }}
  >
    <Card 
      sx={{ 
        width: '100%', 
        maxWidth: 900, 
        borderRadius: 3, 
        boxShadow: 3 
      }}
    >
      <CardContent sx={{ p: 4 }}>
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

        <Grid container spacing={3}>
          {/* Personal Information Section */}
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: '#34495e',
                display: 'flex', 
                alignItems: 'center' 
              }}
            >
              <Person sx={{ mr: 2, color: '#3498db' }} />
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={currentVisitor.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Person sx={{ color: 'action.active', mr: 1 }} />
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={currentVisitor.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={currentVisitor.phone}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Phone sx={{ color: 'action.active', mr: 1 }} />
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Image Upload Section */}
          <Grid item xs={12} md={6} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center' 
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: '#34495e',
                display: 'flex', 
                alignItems: 'center' 
              }}
            >
              <Category sx={{ mr: 2, color: '#3498db' }} />
              Visitor Photo
            </Typography>
            <ImageUploadComponent handleImageChange={handleImageChange} />
          </Grid>

          {/* Additional Details */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>Additional Details</Divider>
          </Grid>

          {/* Visitor Type */}
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" fullWidth>
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

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={currentVisitor.address}
              onChange={handleInputChange}
              multiline
              rows={3}
              placeholder="Enter additional details..."
              variant="outlined"
              InputProps={{
                startAdornment: <LocationOn sx={{ color: 'action.active', mr: 1 }} />
              }}
            />
          </Grid>

          {/* Purpose of Visit */}
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
                addData={addPurpose}
                setData={setPurpose}
                setCurrentVisitor={setCurrentVisitor}
              />
            </FormControl>
          </Grid>

          {/* Company and Person to Visit */}
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

          {/* Remarks */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarks"
              name="remarks"
              value={currentVisitor.remarks}
              onChange={handleInputChange}
              multiline
              rows={2}
              variant="outlined"
              InputProps={{
                startAdornment: <Notes sx={{ color: 'action.active', mr: 1 }} />
              }}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            gap: 2,
          }}
        >
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => setView("dashboard")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckIn}
            disabled={
              !currentVisitor.name ||
              !currentVisitor.personToVisit ||
              !currentVisitor.purpose
            }
            sx={{ 
              px: 3, 
              py: 1.5 
            }}
          >
            Complete Check-In
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Box>
  );
};

export default CheckIn;
