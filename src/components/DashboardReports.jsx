import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem, Select, FormControl, InputLabel 
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getVisitorDashboard, visitorCheckout } from "../services/VisitorAPI"; 
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import {formatDateToIST} from "../utils/DateUtils"
import './printStyles.css';
import VisitorPrintTemplate from "../components/VisitorPrintTemplate"; // adjust path as needed
import VisitorDetailsPopup from "../components/VisitorDetailsPopup"; // adjust path as needed





const DashboardReports = () => {
  const [currentVisitors, setCurrentVisitors] = useState(0);
  const [totalVisitorsToday, setTotalVisitorsToday] = useState(0);
  const [checkedOutVisitors, setCheckedOutVisitors] = useState(0);
  const [visitorList, setVisitorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  const [filterType, setFilterType] = useState("all");

const handleFilterChange = (event) => {
  setFilterType(event.target.value);
};

// Modify the filteredVisitors list based on the filterType
const filteredVisitors = visitorList.filter((visitor) => {
  const matchesSearch = [visitor.visitor_name, visitor.person_to_visit,visitor.visit_id]
    .join(" ")
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  if (filterType === "current") {
    return matchesSearch && visitor.check_out_time === null;
  }
  return matchesSearch;
});
  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getVisitorDashboard();
      const currentVisitors = data.filter(visitor => visitor.check_out_time === null).length;
      const checkedOutVisitors = data.filter(visitor => visitor.check_out_time !== null).length;
      const totalVisitorsToday = data.length; 
  
      setCurrentVisitors(currentVisitors || 0);
      setCheckedOutVisitors(checkedOutVisitors || 0);
      setTotalVisitorsToday(totalVisitorsToday  || 0);
      setVisitorList(data || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  // Open confirmation dialog
  const handleOpenDialog = (id) => {
    setSelectedVisitorId(id);
    setOpenDialog(true);
  };

  // Close confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVisitorId(null);
  };

  const handleConfirmCheckOut = async () => {
    if (!selectedVisitorId) return;

    try {
      // Call API to update check-out status in the backend
      const response = await visitorCheckout({ user: "admin", visit_id: selectedVisitorId });

      if (response) {
        toast.success("Visitor checked out successfully!");
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Failed to check out visitor:", error);
    }

    handleCloseDialog(); // Close dialog after checkout
  };

//   const filteredVisitors = visitorList.filter((visitor) =>
//     [visitor.visitor_name, visitor.person_to_visit]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );


   const handlePrintVisitor = (visitor) => {
    setSelectedVisitor(visitor);
    setPrintDialogOpen(true);
  };

    const printComponentRef = useRef();
    const reactToPrintFn = useReactToPrint({
      content: () => printComponentRef.current,
    });
  

   
   const handlePrint = useReactToPrint({
    documentTitle: 'Title',
    contentRef: printComponentRef,
    pageStyle: `
      @page {
        size: auto;
        margin: 0;
      }
        @media print {
      body {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin: 0;
        padding-left: 20px;
      }
      html {
        height: 100%;
      }
    }
    `,
  });

   
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Stats Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Current Visitors
              </Typography>
              <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
                {currentVisitors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Visitors Today
              </Typography>
              <Typography variant="h4" color="secondary" sx={{ mt: 1 }}>
                {totalVisitorsToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Checked Out
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, color: "#9c27b0" }}>
                {checkedOutVisitors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search Box */}
      <TextField
        fullWidth
        placeholder="Search visitors by name/id or person to visit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Visitors Table */}
      <Paper elevation={2}>
      <Box sx={{ display: "flex",px:5,py:2, alignItems:'center', justifyContent: "space-between", mb: 2 }}>
  <Typography variant="h6">Visitor Logs</Typography>

  <FormControl sx={{ minWidth: 150 }}>
    <InputLabel>Filter</InputLabel>
    <Select value={filterType} onChange={handleFilterChange} label="Filter">
      <MenuItem value="all">All Visitors</MenuItem>
      <MenuItem value="current">Current Visitors</MenuItem>
    </Select>
  </FormControl>
</Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Visit No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Person To Visit</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVisitors.map((visitor) => (
                <TableRow
                  key={visitor.visit_id}
                  sx={{
                    bgcolor: !visitor.check_out_time ? "#e3f2fd" : "inherit",
                  }}
                >
                  <TableCell>{visitor.visit_id}</TableCell>
                  <TableCell>{visitor.visitor_name}</TableCell>
                  <TableCell>{visitor.company}</TableCell>
                  <TableCell>{visitor.person_to_visit}</TableCell>
                  <TableCell>{visitor.purpose}</TableCell>
                  <TableCell>{formatDateToIST(visitor.check_in_time)}</TableCell>
                  <TableCell>{visitor.check_out_time ? formatDateToIST(visitor.check_out_time) : "-"}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<LogoutIcon />}
                        disabled={visitor.check_out_time !== null}
                        sx={{
                          bgcolor: "#9c27b0",
                          "&:hover": { bgcolor: "#7b1fa2" },
                        }}
                        onClick={() => handleOpenDialog(visitor.visit_id)}
                      >
                        Check Out
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => handlePrintVisitor(visitor)}
                      >
                        <MoreHorizIcon />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Checkout Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Checkout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to check out this visitor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmCheckOut} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog 
  open={printDialogOpen} 
  onClose={() => setPrintDialogOpen(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6">Visitor Details</Typography>
      <Button
        variant="contained"
        startIcon={<PrintIcon />}
        onClick={handlePrint}
      >
        Print
      </Button>
    </Box>
  </DialogTitle>
  <DialogContent>
    {selectedVisitor && (
      <>
        {/* Visible visitor dialog UI */}
        <VisitorDetailsPopup visitor={selectedVisitor} />

        {/* Hidden printable content */}
        <div style={{ display: "none" }}>
          <VisitorPrintTemplate ref={printComponentRef} visitor={selectedVisitor} />
            </div>

      </>
    )}
  </DialogContent>
</Dialog>



    </Box>
  );
};

export default DashboardReports;
