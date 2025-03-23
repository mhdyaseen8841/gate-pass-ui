import React, { useState, useEffect } from 'react';
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
  Select
} from '@mui/material';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getVisitorReport } from '../services/VisitorAPI';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

const CheckInReports = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [visitorData, setVisitorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('visit_id');
  const [order, setOrder] = useState('asc');
  const [exportType, setExportType] = useState('pdf');

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
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleExport = () => {
    switch (exportType) {
      case 'pdf':
        exportToPDF();
        break;
      case 'excel':
        exportToExcel();
        break;
      case 'csv':
        exportToCSV();
        break;
      default:
        break;
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title to the PDF
    doc.setFontSize(16);
    doc.text('Check In Reports', 14, 15);
    
    // Generate table
    autoTable(doc, {
      startY: 25,
      head: [['Visit ID', 'Name', 'Company','Person To Visit', 'Purson', 'Check-In Time', 'Check-Out Time' ]],
      body: filteredData.map(row => [
        row.visit_id,
        row.visitor_name,
        row.company,
        row.check_in_time,
        row.check_out_time,
        row.person_to_visit
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 3
      }
    });
  
    doc.save('visitor_report.pdf');
  };

  const exportToExcel = () => {
    // Truncate or split text in cells that exceed Excel's limit
    const formattedData = filteredData.map(row => ({
      'Visit ID': row.visit_id,
      'Name': row.visitor_name,
      'Company': row.company,
      'Person To Visit': row.person_to_visit,
    'Purpose': row.purpose,
      'Check-In Time': row.check_in_time,
      'Check-Out Time': row.check_out_time,
    })).map(row => {
      // Truncate or split text in each cell if it exceeds 32767 characters
      const maxLength = 32767;
      return Object.keys(row).reduce((acc, key) => {
        const value = row[key];
        if (typeof value === 'string' && value.length > maxLength) {
          acc[key] = value.substring(0, maxLength); // Truncate to max length
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    });
  
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Visitor Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'visitor_report.xlsx');
  };
  const exportToCSV = () => {
    const csvData = filteredData.map(row => ({
      'Visit ID': row.visit_id,
      'Name': row.visitor_name,
      'Company': row.company,
      'Person To Visit': row.person_to_visit,
        'Purpose': row.purpose,
      'Check-In Time': row.check_in_time,
      'Check-Out Time': row.check_out_time,
    }));
    return csvData;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mx: 'auto', p: 2 }}>
        <Typography variant="h5" gutterBottom>Check-In Reports</Typography>
        
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="From Date"
                value={dayjs(fromDate)}
                onChange={(newValue) => setFromDate(newValue ? newValue.format("YYYY-MM-DD") : "")}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="To Date"
                value={dayjs(toDate)}
                onChange={(newValue) => setToDate(newValue ? newValue.format("YYYY-MM-DD") : "")}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Button variant="contained" onClick={handleApplyFilters} fullWidth>
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
        
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection={orderBy === 'visit_id' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'visit_id'}
                      direction={orderBy === 'visit_id' ? order : 'asc'}
                      onClick={() => handleRequestSort('visit_id')}
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
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.visit_id} hover>
                    <TableCell>{row.visit_id}</TableCell>
                    <TableCell>{row.visitor_name}</TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.person_to_visit}</TableCell>
                    <TableCell>{row.purpose}</TableCell>
                    <TableCell>{row.check_in_time}</TableCell>
                    <TableCell>{row.check_out_time}</TableCell>
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
            onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
          />
        </Paper>

        <CSVLink data={exportToCSV()} filename={"visitor_report.csv"} style={{ textDecoration: 'none', display: 'none' }} id="csvLink" />
      </Box>
    </LocalizationProvider>
  );
};

export default CheckInReports;