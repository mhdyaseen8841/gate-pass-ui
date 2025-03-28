import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Paper
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CheckInReports from './CheckInReports';
import CurrentVisitorReports from "./CurrentVisitorReports";
import Charts from './Charts';

// TabPanel component to render content based on selected tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`visitor-tabpanel-${index}`}
      aria-labelledby={`visitor-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}

// Main component that includes the tabs
const Reports = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="visitor management tabs"
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            {/* <Tab 
              icon={<AssessmentIcon />} 
              iconPosition="start" 
              label="Reports" 
              id="visitor-tab-0" 
              aria-controls="visitor-tabpanel-0" 
            /> */}
            <Tab 
              icon={<PersonIcon />} 
              iconPosition="start" 
              label="Current Visitor" 
              id="visitor-tab-1" 
              aria-controls="visitor-tabpanel-1" 
            />
            <Tab 
              icon={<FactCheckIcon />} 
              iconPosition="start" 
              label="Check-in Reports" 
              id="visitor-tab-2" 
              aria-controls="visitor-tabpanel-2" 
            />
          </Tabs>
        </Box>
        
        {/* <TabPanel value={tabValue} index={0}>
          <Charts />
        </TabPanel> */}
        <TabPanel value={tabValue} index={0}>
          <CurrentVisitorReports />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CheckInReports />
        </TabPanel>
      </Paper>
    </Box>

  );
};

export default Reports;