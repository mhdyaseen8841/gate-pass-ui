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
  Typography
} from '@mui/material';

const CurrentVisitorReports = () => {
  const [allData, setAllData] = useState([
    { visit_id: 1, name: "John Doe", company: "ABC Corp", checkInTime: "2025-03-21 10:30 AM", checkOutTime: "2025-03-21 02:00 PM", personToVisit: "Mr. Smith" },
    { visit_id: 2, name: "Jane Smith", company: "XYZ Ltd", checkInTime: "2025-03-21 09:15 AM", checkOutTime: "2025-03-21 11:45 AM", personToVisit: "Ms. Johnson" },
  ]);

  const [orderBy, setOrderBy] = useState('visit_id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setAllData([...allData]);
  }, [order, orderBy]);

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
    return isAsc ? a[orderBy] > b[orderBy] ? 1 : -1 : a[orderBy] < b[orderBy] ? 1 : -1;
  });

  const columns = [
    { id: 'visit_id', label: 'Visit ID', numeric: true },
    { id: 'name', label: 'Name', numeric: false },
    { id: 'company', label: 'Company', numeric: false },
    { id: 'checkInTime', label: 'Check-In Time', numeric: false },
    { id: 'checkOutTime', label: 'Check-Out Time', numeric: false },
    { id: 'personToVisit', label: 'Person To Visit', numeric: false },
  ];

  return (
    <Box sx={{  mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Current Visitor Reports
      </Typography>

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
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.checkInTime}</TableCell>
                  <TableCell>{row.checkOutTime}</TableCell>
                  <TableCell>{row.personToVisit}</TableCell>
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
    </Box>
  );
};

export default CurrentVisitorReports;
