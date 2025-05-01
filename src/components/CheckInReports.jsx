import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  Typography,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { exportToPDF, exportToExcel } from "../utils/ExportUtils";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getVisitorReport } from "../services/VisitorAPI";

import {formatDateToIST} from "../utils/DateUtils"
import SearchIcon from '@mui/icons-material/Search';


import VisitorDetailsPopup from './VisitorDetailsPopup';
import VisibilityIcon from '@mui/icons-material/Visibility';



const CheckInReports = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [visitorData, setVisitorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("visit_id");
  const [order, setOrder] = useState("asc");
  const [exportType, setExportType] = useState("pdf");


const [selectedVisitor, setSelectedVisitor] = useState(null);
const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const fetchVisitors = async (fromDate, toDate) => {
    try {
      const data = await getVisitorReport(fromDate, toDate);
      setVisitorData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  useEffect(() => {
    fetchVisitors(fromDate, toDate);
  }, []); // Call API initially with today’s date

  const handleApplyFilters = () => {
    fetchVisitors(fromDate, toDate);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const headers = [
    "Visit ID",
    "Name",
    "Company",
    "Person To Visit",
    "Purpose",
    "Check-In Time",
    "Check-Out Time",
  ];

  const handleExport = () => {

    const currentDateTime = new Date();
        const offsetIST = 5.5 * 60;  // IST is UTC +5:30 hours (5.5 hours)
        const currentDateTimeIST = new Date(currentDateTime.getTime() + offsetIST * 60 * 1000);
        
        // Format the IST date and time
        const formattedDateTime = currentDateTimeIST
          .toISOString()
          .replace('T', '_')
          .replace(/\..+/, '')
          .replace(/-/g, '_');
        

    const formattedData = filteredData.map((row) => ({
      "Visit ID": row.visit_id,
      "Name": row.visitor_name,
      "Company": row.company,
      "Person To Visit": row.person_to_visit,
      "Purpose": row.purpose,
      "Check-In Time": row.check_in_time ? formatDateToIST(row.check_in_time) : "",
      "Check-Out Time": row.check_out_time ? formatDateToIST(row.check_out_time) : "",
    }));

    if (exportType === "pdf") {
      exportToPDF({
        data: formattedData,
        headers,
        title: "Check-In Reports",
        fileName : `check_in_report_${formattedDateTime}.pdf`
      });
    } else if (exportType === "excel") {
      exportToExcel({
        data: formattedData,
        headers,
        title: "Check-In Reports",
        fileName : `check_in_report_${formattedDateTime}.xlsx`
      });
    }
  };

  const handleViewDetails = (visitor) => {
    setSelectedVisitor(visitor);
    setDetailsDialogOpen(true);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mx: "auto", p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Check-In Reports
        </Typography>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="From Date"
                value={dayjs(fromDate)}
                onChange={(newValue) =>
                  setFromDate(newValue ? newValue.format("YYYY-MM-DD") : "")
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="To Date"
                value={dayjs(toDate)}
                onChange={(newValue) =>
                  setToDate(newValue ? newValue.format("YYYY-MM-DD") : "")
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                fullWidth
              >
                <SearchIcon style={{ marginRight: '8px' }} />
                Apply
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Select
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                fullWidth
                size="small"
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Button variant="contained" onClick={handleExport} fullWidth>
                Export
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sortDirection={orderBy === "visit_id" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "visit_id"}
                      direction={orderBy === "visit_id" ? order : "asc"}
                      onClick={() => handleRequestSort("visit_id")}
                    >
                      Visit ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Person To Visit</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Check-In Time</TableCell>
                  <TableCell>Check-Out Time</TableCell>
                  <TableCell>
Actions
</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.visit_id} hover>
                      <TableCell>{row.visit_id}</TableCell>
                      <TableCell>{row.visitor_name}</TableCell>
                      <TableCell>{row.company}</TableCell>
                      <TableCell>{row.person_to_visit}</TableCell>
                      <TableCell>{row.purpose}</TableCell>
                      <TableCell>{formatDateToIST(row.check_in_time)}</TableCell>
                      <TableCell>{row.check_out_time ? formatDateToIST(row.check_out_time) : "-"}</TableCell>
                      <TableCell>
  <Button
    variant="contained"
    size="small"
    startIcon={<VisibilityIcon />}
    onClick={() => handleViewDetails(row)}
    sx={{
      bgcolor: "#1976d2",
      "&:hover": { bgcolor: "#1565c0" }
    }}
  >
    View
  </Button>
</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

         
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) =>
              setRowsPerPage(parseInt(event.target.value, 10))
            }
          />
        </Paper>
      </Box>
    
      <Dialog 
  open={detailsDialogOpen} 
  onClose={() => setDetailsDialogOpen(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6">Visitor Details</Typography>
      <Button
        variant="outlined"
        onClick={() => setDetailsDialogOpen(false)}
      >
        Close
      </Button>
    </Box>
  </DialogTitle>
  <DialogContent>
    {selectedVisitor && (
      <VisitorDetailsPopup visitor={selectedVisitor} />
    )}
  </DialogContent>
</Dialog>

    </LocalizationProvider>
  );
};

export default CheckInReports;
