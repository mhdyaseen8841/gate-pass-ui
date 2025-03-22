import React from 'react';
import { Typography, Paper, Grid, Box, Button } from '@mui/material';

const Charts = () => {
  return (
    <div>
       <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Visitor Reports
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={1}
                    sx={{ p: 2, border: "1px solid #e0e0e0", height: "100%" }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Visit Purposes
                    </Typography>
                    <Box
                      sx={{
                        height: 200,
                        bgcolor: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                      }}
                    >
                      <Typography color="text.secondary">
                        Pie chart visualization would go here
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={1}
                    sx={{ p: 2, border: "1px solid #e0e0e0", height: "100%" }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Visitor Traffic by Hour
                    </Typography>
                    <Box
                      sx={{
                        height: 200,
                        bgcolor: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                      }}
                    >
                      <Typography color="text.secondary">
                        Bar chart visualization would go here
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    elevation={1}
                    sx={{ p: 2, border: "1px solid #e0e0e0" }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Most Frequent personToVisits
                    </Typography>
                    <Box
                      sx={{
                        height: 200,
                        bgcolor: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                      }}
                    >
                      <Typography color="text.secondary">
                        Table visualization would go here
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" color="primary">
                  Export Data
                </Button>
              </Box>
            </Paper>
    </div>
  )
}

export default Charts
