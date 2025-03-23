import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import synthiteLogo from "../assets/Synthite.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Reports from "./Reports";
import DashboardReports from "./DashboardReports";
import CheckIn from "./CheckIn";

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

const VisitorManagementSystem = () => {
  // State for visitors and form

  const [view, setView] = useState("dashboard"); 

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
          {view === "dashboard" && <DashboardReports />}

          {/* Check In Form */}
          {view === "checkIn" && <CheckIn />}

          {/* Reports View */}
          {view === "reports" && <Reports />}
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
