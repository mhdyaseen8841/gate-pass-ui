import React, { useState,useEffect } from "react";
import {
  Typography,
  Container,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Reports from "./Reports";
import DashboardReports from "./DashboardReports";
import CheckIn from "./CheckIn";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
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
  
 const navigate = useNavigate();
  const [view, setView] = useState("dashboard"); 

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

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
       

        <Navbar setView={setView}/>

        <Container sx={{ py: 4, flexGrow: 1 }}>
          {/* Dashboard View */}
          {view === "dashboard" && <DashboardReports />}

          {/* Check In Form */}
          {view === "checkIn" && <CheckIn setView={setView}/>}

          {/* Reports View */}
          {view === "reports" && <Reports />}
        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: "#212121", color: "white", py: 2, mt: "auto" }}>
          <Container>
            <Typography align="center">
              © 2025 Gate Pass | Current time:{" "}
              {new Date().toLocaleTimeString()}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default VisitorManagementSystem;
