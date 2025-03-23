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
  Typography
} from '@mui/material';


import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getVisitorReport } from '../services/VisitorAPI';

const CheckInReports = () => {
    const today = dayjs().format("YYYY-MM-DD");;
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [visitorData, setVisitorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('visit_id');
  const [order, setOrder] = useState('asc');


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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mx: 'auto', p: 2 }}>
        <Typography variant="h5" gutterBottom>Check-In Reports</Typography>
        
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
            <DatePicker
  label="From Date"
  value={dayjs(fromDate)} // Ensure it's a dayjs object
  onChange={(newValue) => setFromDate(newValue ? newValue.format("YYYY-MM-DD") : "")}
  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
/>


            </Grid>
            <Grid item xs={12} sm={4} md={3}>
            <DatePicker
  label="To Date"
  value={dayjs(toDate)} // Ensure it's a dayjs object
  onChange={(newValue) => setToDate(newValue ? newValue.format("YYYY-MM-DD") : "")}
  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
/>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Button variant="contained" onClick={handleApplyFilters} fullWidth>
                Apply
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
                  <TableCell>Check-In Time</TableCell>
                  <TableCell>Check-Out Time</TableCell>
                  <TableCell>Person To Visit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.visit_id} hover>
                    <TableCell>{row.visit_id}</TableCell>
                    <TableCell>{row.visitor_name}</TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.check_in_time}</TableCell>
                    <TableCell>{row.check_out_time}</TableCell>
                    <TableCell>{row.person_to_visit}</TableCell>
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
      </Box>
    </LocalizationProvider>
  );
};

export default CheckInReports;
