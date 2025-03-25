import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TableSortLabel,
  TablePagination,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem
} from '@mui/material';
import { getCurrentVisitor } from '../services/VisitorAPI';
import { exportToExcel, exportToPDF } from '../utils/ExportUtils';

const CurrentVisitorReports = () => {
  const [allData, setAllData] = useState([]);
  const [orderBy, setOrderBy] = useState('visit_id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exportType, setExportType] = useState('pdf');

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const data = await getCurrentVisitor();
      setAllData(data);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };


  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = allData.sort((a, b) => {
    const isAsc = order === 'asc';
    return isAsc ? (a[orderBy] > b[orderBy] ? 1 : -1) : (a[orderBy] < b[orderBy] ? 1 : -1);
  });

  const columns = [
    { id: 'visit_id', label: 'Visit ID', numeric: true },
    { id: 'name', label: 'Name', numeric: false },
    { id: 'company', label: 'Company', numeric: false },
    { id: 'personToVisit', label: 'Person To Visit', numeric: false },
    { id: 'purpose', label: 'Purpose', numeric: false },
    { id: 'checkInTime', label: 'Check-In Time', numeric: false },
  ];


   const headers = ['Visit ID', 'Name', 'Company', 'Person To Visit', 'Purpose', 'Check-In Time'];
  
    const handleExport = () => {
      const formattedData = sortedData.map(row => ({
        'Visit ID': row.visit_id,
        'Name': row.visitor_name,
        'Company': row.company,
        'Person To Visit': row.person_to_visit,
        'Purpose': row.purpose,
        'Check-In Time': row.check_in_time,
      }));
    
      if (exportType === 'pdf') {
        exportToPDF({
          data: formattedData,
          headers,
          title: 'Check-In Reports',
          fileName: 'visitor_report.pdf'
        });
      } else if (exportType === 'excel') {
        exportToExcel({
          data: formattedData,
          headers,
          title: 'Check-In Reports',
          fileName: 'visitor_report.xlsx'
        });
      }
    };
    

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
   

        <Grid container spacing={2} alignItems="center">
                  

                  <Grid item xs={12} sm={4} md={8}>
                      <Typography variant="h5" gutterBottom component="div">
        Current Visitor Reports
      </Typography>
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

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.numeric ? 'right' : 'left'}>
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover key={row.visit_id}>
                    <TableCell align="right">{row.visit_id}</TableCell>
                    <TableCell>{row.visitor_name}</TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.person_to_visit}</TableCell>
                    <TableCell>{row.purpose}</TableCell>
                    <TableCell>{row.check_in_time}</TableCell>
                    <TableCell>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sortedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default CurrentVisitorReports;
