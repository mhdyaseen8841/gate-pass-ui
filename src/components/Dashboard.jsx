import React, { useState, useEffect } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel
} from "@mui/material";
import synthiteLogo from '../assets/Synthite.png';
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import PrintIcon from "@mui/icons-material/Print";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ImageUploadComponent from "./ImageUploadComponent";
import { useReactToPrint } from "react-to-print";
import Reports from "./Reports";
import DashboardReports from "./DashboardReports";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#4caf50",
    },
  },
});

// Print Template Component
const VisitorPrintTemplate = React.forwardRef(({ visitor }, ref) => (
  <div ref={ref} style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h1 style={{ margin: "0" }}>Visitor Badge</h1>
      <p style={{ margin: "5px 0" }}>Company Name Inc.</p>
    </div>

    <div style={{ border: "2px solid #000", padding: "15px", borderRadius: "5px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <div>
          <h2 style={{ margin: "0 0 10px 0" }}>VISITOR</h2>
          <h3 style={{ margin: "0" }}>{visitor.badge}</h3>
        </div>
        <div style={{ width: "100px", height: "100px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span>Photo</span>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Name:</td>
            <td style={{ padding: "5px 0" }}>{visitor.name}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Company:</td>
            <td style={{ padding: "5px 0" }}>External Company</td>
          </tr>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>personToVisit:</td>
            <td style={{ padding: "5px 0" }}>{visitor.personToVisit}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Purpose:</td>
            <td style={{ padding: "5px 0" }}>{visitor.purpose}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Check-in Time:</td>
            <td style={{ padding: "5px 0" }}>{new Date(visitor.checkInTime).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <p style={{ margin: "0", fontSize: "12px" }}>This badge must be worn visibly at all times while on premises.</p>
        <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>Please return this badge at the reception desk when checking out.</p>
      </div>
    </div>

    <div style={{ marginTop: "20px", fontSize: "12px", textAlign: "center" }}>
      <p>For security assistance, please call 555-123-4567</p>
    </div>
  </div>
));


const VisitorManagementSystem = () => {
  // State for visitors and form



  const [visitors, setVisitors] = useState([]);
  const [currentVisitor, setCurrentVisitor] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    personToVisit: "",
    purpose: "",
    checkInTime: "",
    checkOutTime: null,
    badge: "",
  });
  const [view, setView] = useState("dashboard"); // dashboard, checkIn, checkOut, reports
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  
 
  // Load sample data
  useEffect(() => {
     const sampleVisitors = [
            { visit_id: 1, name: "John Doe", company: "ABC Corp", checkInTime: "2025-03-21 10:30 AM", checkOutTime: "2025-03-21 02:00 PM", personToVisit: "Mr. Smith" },
            { visit_id: 2, name: "Jane Smith", company: "XYZ Ltd", checkInTime: "2025-03-21 09:15 AM", checkOutTime: "2025-03-21 11:45 AM", personToVisit: "Ms. Johnson" },
            { visit_id: 3, name: "Mike Johnson", company: "Tech Solutions", checkInTime: "2025-03-21 01:00 PM", checkOutTime: "2025-03-21 05:30 PM", personToVisit: "Dr. Brown" },
            { visit_id: 4, name: "Emily Davis", company: "HealthCare Inc", checkInTime: "2025-03-21 08:45 AM", checkOutTime: "2025-03-21 12:30 PM", personToVisit: "Dr. Green" },
            { visit_id: 5, name: "Chris Wilson", company: "FinancePro", checkInTime: "2025-03-21 10:00 AM", checkOutTime: "2025-03-21 03:15 PM", personToVisit: "Mr. Adams" },
            { visit_id: 6, name: "Sophia Miller", company: "Design Studio", checkInTime: "2025-03-21 11:00 AM", checkOutTime: "2025-03-21 02:45 PM", personToVisit: "Ms. Williams" },
            { visit_id: 7, name: "Daniel Anderson", company: "Innovate Ltd", checkInTime: "2025-03-21 09:30 AM", checkOutTime: "2025-03-21 01:15 PM", personToVisit: "Dr. Parker" },
            { visit_id: 8, name: "Olivia Martin", company: "EduWorld", checkInTime: "2025-03-21 07:45 AM", checkOutTime: "2025-03-21 11:30 AM", personToVisit: "Prof. Harris" },
            { visit_id: 9, name: "Liam Harris", company: "Retail Corp", checkInTime: "2025-03-21 02:15 PM", checkOutTime: "2025-03-21 06:00 PM", personToVisit: "Mr. Thompson" },
            { visit_id: 10, name: "Emma Clark", company: "Legal Solutions", checkInTime: "2025-03-21 03:30 PM", checkOutTime: "2025-03-21 05:45 PM", personToVisit: "Ms. Carter" },
            { visit_id: 11, name: "Mason Baker", company: "IT Hub", checkInTime: "2025-03-21 10:45 AM", checkOutTime: "2025-03-21 04:30 PM", personToVisit: "Mr. Wilson" },
            { visit_id: 12, name: "Ava Scott", company: "Travel Experts", checkInTime: "2025-03-21 08:30 AM", checkOutTime: "2025-03-21 12:15 PM", personToVisit: "Ms. Phillips" },
            { visit_id: 13, name: "Ethan White", company: "Food Industry", checkInTime: "2025-03-21 01:30 PM", checkOutTime: "2025-03-21 06:45 PM", personToVisit: "Chef Gordon" },
            { visit_id: 14, name: "Isabella Lewis", company: "AutoMobiles Ltd", checkInTime: "2025-03-21 09:00 AM", checkOutTime: "2025-03-21 02:00 PM", personToVisit: "Mr. Anderson" },
            { visit_id: 15, name: "James Walker", company: "Marketing Pros", checkInTime: "2025-03-21 11:15 AM", checkOutTime: "2025-03-21 03:45 PM", personToVisit: "Ms. Rodriguez" },
            { visit_id: 16, name: "Charlotte Adams", company: "Fashion Trends", checkInTime: "2025-03-21 07:30 AM", checkOutTime: "2025-03-21 11:15 AM", personToVisit: "Mr. Cooper" },
            { visit_id: 17, name: "Benjamin Nelson", company: "Tech Startups", checkInTime: "2025-03-21 12:00 PM", checkOutTime: "2025-03-21 05:00 PM", personToVisit: "Dr. Hall" },
            { visit_id: 18, name: "Mia Carter", company: "Media Works", checkInTime: "2025-03-21 10:20 AM", checkOutTime: "2025-03-21 03:30 PM", personToVisit: "Mr. Gomez" },
            { visit_id: 19, name: "William Moore", company: "Construction Co.", checkInTime: "2025-03-21 02:45 PM", checkOutTime: "2025-03-21 07:00 PM", personToVisit: "Ms. Simmons" },
            { visit_id: 20, name: "Amelia Thomas", company: "Healthcare Plus", checkInTime: "2025-03-21 06:45 AM", checkOutTime: "2025-03-21 10:00 AM", personToVisit: "Dr. Rivera" }
          ];
    setVisitors(sampleVisitors);
    setFilteredVisitors(sampleVisitors);
  }, []);

  // Filter visitors based on search term
  useEffect(() => {
    const results = visitors.filter(
      (visitor) =>
        visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.personToVisit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.badge.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVisitors(results);
  }, [searchTerm, visitors]);

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
      id: `00${visitors.length + 1}`,
      checkInTime: new Date().toISOString(),
      badge: `V00${visitors.length + 1}`,
    };

    console.log(newVisitor)
    // setVisitors([...visitors, newVisitor]);
    // setCurrentVisitor(null);
    // setView("dashboard");
  };

  // Format date for display
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Calculate statistics
  const currentVisitors = visitors.filter((v) => !v.checkOutTime).length;
  const totalVisitorsToday = visitors.length;
  const checkedOutVisitors = visitors.filter((v) => v.checkOutTime).length;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        {/* Header */}
        <AppBar position="static">
          <Toolbar>
          {/* <img src={synthiteLogo} alt="abc" style={{width:"100px", height:"100px"}} /> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Visitor Management System
            </Typography>
            <Button
              color="inherit"
              onClick={() => setView("dashboard")}
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              onClick={() => setView("checkIn")}
              startIcon={<PersonAddIcon />}
              sx={{ mx: 1 }}
            >
              Check In
            </Button>
            <Button
              color="inherit"
              onClick={() => setView("reports")}
              startIcon={<AssessmentIcon />}
            >
              Reports
            </Button>

          
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container sx={{ py: 4, flexGrow: 1 }}>
          {/* Dashboard View */}
          {view === "dashboard" && (
           <DashboardReports/>
          )}

          {/* Check In Form */}
          {view === "checkIn" && (
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
          )}

          {/* Reports View */}
          {view === "reports" && (
           <Reports/>
          )}
         
        </Container>


        {/* Footer */}
        <Box sx={{ bgcolor: "#212121", color: "white", py: 2, mt: "auto" }}>
          <Container>
            <Typography align="center">
              © 2025 Visitor Management System | Current time:{" "}
              {new Date().toLocaleTimeString()}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default VisitorManagementSystem;