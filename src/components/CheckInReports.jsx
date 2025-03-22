import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  FormControl,
  Grid, 
  MenuItem,
  Paper,
  Select,
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
  Chip
} from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import {  DatePicker } from '@mui/x-date-pickers';

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { format } from 'date-fns';

const CheckInReports = () => {
 
    const [allData, setAllData] = useState([
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
      ]);
      
  // State variables
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    let result = [...allData];

    // Apply date filters
    if (fromDate) {
      result = result.filter(item => new Date(item.checkInTime) >= fromDate);
    }
    if (toDate) {
      result = result.filter(item => new Date(item.checkOutTime) <= toDate);
    }

    // Apply sorting
    result.sort((a, b) => {
      const isAsc = order === 'asc';
      
      let valueA = a[orderBy];
      let valueB = b[orderBy];
      
      // Handle date comparison
      if (orderBy === 'date') {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      }
      
      if (valueA < valueB) {
        return isAsc ? -1 : 1;
      }
      if (valueA > valueB) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(result);
    setPage(0); // Reset to first page when filters change
  }, [allData, fromDate, toDate, order, orderBy]);

  // Handle sort header click
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Reset filters
  const resetFilters = () => {
    setFromDate(null);
    setToDate(null);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'primary';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Define column headers
  const columns = [
    { id: 'visit_id', label: 'Visit ID', numeric: true },
    { id: 'name', label: 'Name', numeric: false },
    { id: 'company', label: 'Company', numeric: false },
    { id: 'checkInTime', label: 'Date', numeric: false },
    { id: 'checkOutTime', label: 'Date', numeric: false },
    { id: 'personToVisit', label: 'Person To Visit', numeric: false },
    // { id: 'status', label: 'Status', numeric: false },
    // { id: 'amount', label: 'Amount', numeric: true },
  ];

  // Calculate empty rows for maintaining consistent page height
  const emptyRows = page > 0 
    ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) 
    : 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{  mx: 'auto', p: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Data Table with Filters
        </Typography>
        
        {/* Date filters */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </Grid>
            
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />

              
            </Grid>
            
            <Grid item xs={12} sm={4} md={2}>
              <Button 
                variant="outlined"
                onClick={resetFilters}
                fullWidth
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Results summary */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredData.length} results
            {fromDate && ` from ${format(fromDate, 'MMM dd, yyyy')}`}
            {toDate && ` to ${format(toDate, 'MMM dd, yyyy')}`}
          </Typography>
        </Box>
        
        {/* Table */}
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  {columns.map((column,key) => (
                    <TableCell
                      key={key}
                      align={column.numeric ? 'right' : 'left'}
                      sortDirection={orderBy === column.visit_id? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.visit_id}
                        direction={orderBy === column.visit_id ? order : 'asc'}
                        onClick={() => handleRequestSort(column.visit_id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.visit_id}
                      >
                        <TableCell align="right">{row.visit_id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{formatDisplayDate(row.company)}</TableCell>
                        <TableCell>{formatDisplayDate(row.checkInTime)}</TableCell>
                        <TableCell>{formatDisplayDate(row.checkOutTime)}</TableCell>
                        {/* <TableCell>
                          <Chip 
                            label={row.status} 
                            color={getStatusColor(row.status)} 
                            size="small"
                          />
                        </TableCell> */}
                        <TableCell>{formatDisplayDate(row.personToVisit)}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No records found matching your filters.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default CheckInReports;