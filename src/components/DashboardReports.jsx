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

// const VisitorPrintTemplate = React.forwardRef(({ visitor }, ref) => 
//     {
//     return(
//   <div ref={ref} style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
//     <div style={{ textAlign: "center", marginBottom: "20px" }}>
//       <h1 style={{ margin: "0" }}>Visitor Badge</h1>
//       <p style={{ margin: "5px 0" }}>Syntite</p>
//     </div>

//     <div style={{ border: "2px solid #000", padding: "15px", borderRadius: "5px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
//         <div>
//           <h2 style={{ margin: "0 0 10px 0" }}>VISITOR</h2>
//           <h3 style={{ margin: "0" }}>{visitor.badge}</h3>
//         </div>
//         <div style={{ width: "100px", height: "100px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
//           {visitor.photo ? (
//             <img src={visitor.photo} alt="Visitor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//           ) : (
//             <span>Photo</span>
//           )}
//         </div>
//       </div>

//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <tbody>
//         <tr>
//             <td style={{ padding: "5px 0", fontWeight: "bold" }}>Visit No:</td>
//             <td style={{ padding: "5px 0" }}>{visitor.visit_id}</td>
//           </tr>
//           <tr>
//             <td style={{ padding: "5px 0", fontWeight: "bold" }}>Name:</td>
//             <td style={{ padding: "5px 0" }}>{visitor.visitor_name}</td>
//           </tr>
//           <tr>
//             <td style={{ padding: "5px 0", fontWeight: "bold" }}>Company:</td>
//             <td style={{ padding: "5px 0" }}>{visitor.company}</td>
//           </tr>
//           <tr>
//             <td style={{ padding: "5px 0", fontWeight: "bold" }}>personToVisit:</td>
//             <td style={{ padding: "5px 0" }}>{visitor.person_to_visit}</td>
//           </tr>
//           <tr>
//             <td style={{ padding: "5px 0", fontWeight: "bold" }}>Purpose:</td>
//             <td style={{ padding: "5px 0" }}>{visitor.purpose}</td>
//           </tr>
//           <tr>
//             <td style={{ padding: "5px 0", fontWeight: "bold" }}>Check-in Time:</td>
//             <td style={{ padding: "5px 0" }}>{new Date(visitor.check_in_time).toLocaleString()}</td>
//           </tr>

//           <tr>
//             <td style={{ padding: "5px 0", fontWeight: "bold" }}>Check-out Time:</td>
//             <td style={{ padding: "5px 0" }}>{new Date(visitor.check_out_time).toLocaleString()}</td>
//           </tr>
//         </tbody>
//       </table>

//       <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
//         <p style={{ margin: "0", fontSize: "12px" }}>This badge must be worn visibly at all times while on premises.</p>
//         <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>Please return this badge at the reception desk when checking out.</p>
//       </div>
//     </div>

//     <div style={{ marginTop: "20px", fontSize: "12px", textAlign: "center" }}>
//       <p>For security assistance, please call 555-123-4567</p>
//     </div>
//   </div>
// )});

const VisitorPrintTemplate = React.forwardRef(({ visitor }, ref) => {
  return (
    <div ref={ref} className="font-size" style={{ 
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',  // This centers vertically
      alignItems: 'flex-start', // This keeps left alignment    // Add some left padding
      boxSizing: 'border-box',
      
    }}>
<Grid container spacing={2}>

<Grid style={{paddingLeft:'20px'}} item xs={12} md={4}>
  
  <div style={{paddingTop:"45px"}}>
<p  >Pass No : {visitor.visit_id}</p>
  <p >Check In : {formatDateToIST(visitor.check_in_time)}</p> 
  </div>


  <div style={{ marginBottom: '12px',marginLeft: '155px',marginTop:'32px' }}>
          {visitor.photo ? (
            <img
              src={visitor.photo}
              alt="Visitor"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '5px',
                border: '1px solid #000',
              }}
            />
          ) : (
            <div
              style={{
                width: '80px',
                height: '80px',
                border: '1px dashed #aaa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#777',
                fontSize: '12px',
              }}
            >
              No Photo
            </div>
          )}
        </div>


  <table >
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td>{visitor.visitor_name}</td>
            </tr>
            <tr>
              <td><strong>Address:</strong></td>
              <td>{visitor.address}</td>
            </tr>
            <tr>
              <td><strong>Company:</strong></td>
              <td>{visitor.company}</td>
            </tr>
            <tr>
              <td><strong>Person To Visit:</strong></td>
              <td>{visitor.person_to_visit}</td>
            </tr>
            <tr>
              <td><strong>Purpose:</strong></td>
              <td>{visitor.purpose}</td>
            </tr>
          
           
          </tbody>
        </table>
  </Grid>
<Grid container xs={12} md={4} style={{paddingTop: 10,paddingLeft:'20px'}}>
    <Grid item md={6} style={{paddingTop:10,paddingLeft:10}} >
    <p>{formatDateToIST(visitor.check_in_time)}</p> 
  <p style={{paddingTop:'10px',paddingLeft:'20px'}}> {visitor.visit_id}</p>
  <p style={{paddingTop:'10px',paddingLeft:'60px'}}> {visitor.visitor_name}</p>
  <p  style={{paddingTop:'10px',paddingLeft:'60px'}}>  {visitor.person_to_visit}</p>


  {/* <p> Pupose of visit : {visitor.purpose}</p> */}
    </Grid>


    <Grid item md={6} style={{paddingTop:'20px'}} >
   
  <p>Address: {visitor.address}</p>
  <p style={{paddingTop:'18px'}}>Company: {visitor.company}</p>
  <p style={{paddingTop:'10px'}}> Pupose of visit : {visitor.purpose}</p>
    </Grid>

  </Grid>


  </Grid>

<div>

</div>

    </div>
    
  )})

// const VisitorPrintTemplate1 = React.forwardRef(({ visitor }, ref) => {
//   return (
//     <div ref={ref} className="visitor-badge-print" style={{ width: '100%', height: '100%' }}>
//       <div
//         style={{
//           width: '90mm',              // Width of the VISITORS PASS area (adjust as needed)
//           height: '100%',             // Full height of the page
//           padding: '10mm 8mm',        // Top-bottom, side paddings
//           boxSizing: 'border-box',
//           fontFamily: 'Arial, sans-serif',
//         }}
//       >
       

//         {/* Visitor Photo */}
//         <p>Pass No : {visitor.visit_id}</p>  <p>Check In : {formatDateToIST(visitor.check_in_time)}</p> 
//         <div style={{ marginBottom: '12px',marginLeft: '145px' }}>
//           {visitor.photo ? (
//             <img
//               src={visitor.photo}
//               alt="Visitor"
//               style={{
//                 width: '80px',
//                 height: '80px',
//                 objectFit: 'cover',
//                 borderRadius: '5px',
//                 border: '1px solid #000',
//               }}
//             />
//           ) : (
//             <div
//               style={{
//                 width: '80px',
//                 height: '80px',
//                 border: '1px dashed #aaa',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: '#777',
//                 fontSize: '12px',
//               }}
//             >
//               No Photo
//             </div>
//           )}
//         </div>

//         {/* Visitor Info Table */}
//         <table style={{ width: '100%', fontSize: '12px', borderSpacing: '4px 2px' }}>
//           <tbody>
//             <tr>
//               <td><strong>Name:</strong></td>
//               <td>{visitor.visitor_name}</td>
//             </tr>
//             <tr>
//               <td><strong>Address:</strong></td>
//               <td>{visitor.address}</td>
//             </tr>
//             <tr>
//               <td><strong>Company:</strong></td>
//               <td>{visitor.company}</td>
//             </tr>
//             <tr>
//               <td><strong>To Visit:</strong></td>
//               <td>{visitor.person_to_visit}</td>
//             </tr>
//             <tr>
//               <td><strong>Purpose:</strong></td>
//               <td>{visitor.purpose}</td>
//             </tr>
          
           
//           </tbody>
//         </table>
//       </div>

//       <div
//         style={{
//           width: '90mm',              // Width of the VISITORS PASS area (adjust as needed)
//           height: '100%',             // Full height of the page
//           padding: '10mm 8mm',        // Top-bottom, side paddings
//           boxSizing: 'border-box',
//           fontFamily: 'Arial, sans-serif',
//         }}
//       >

//         <p>Pass No : {visitor.visit_id}</p>  <p>Check Out : {formatDateToIST(visitor.check_out_time)}</p>

//         </div>
//     </div>
//   );
// });

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
  
  //   const handlePrint = useReactToPrint({
  //     documentTitle: 'Title',
  //     contentRef: printComponentRef,
  //     pageStyle: '@media print { @page { size: landscape; } }',
  //  })
   
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
      <Typography variant="h6">Print Visitor Slip</Typography>
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
    <div id="printable-content">
      {selectedVisitor && (
        <VisitorPrintTemplate ref={printComponentRef} visitor={selectedVisitor} />
      )}
    </div>
  </DialogContent>
</Dialog>
    </Box>
  );
};

export default DashboardReports;
