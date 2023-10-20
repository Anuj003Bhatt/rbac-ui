import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from "@mui/lab/TabContext"; 
import UsersTab from './UsersTab';
import GroupsTab from './GroupsTab';
import { TabList } from '@mui/lab';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('1');
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
       <div 
        style={{ 
          width: "fit-content", 
          padding: 20,
          fontSize: 51,
          margin: "auto",
        }} 
      > 
        <strong>Access Control</strong> 
      </div> 
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Users" value="1" />
              <Tab label="Groups" value="2" />
              <Tab label="Permissions" value="3" />
              <Tab label="Roles" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1"><UsersTab/></TabPanel>
          <TabPanel value="2"><GroupsTab/></TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item Four</TabPanel>
        </TabContext>
      </Box>
      
    </div>
  );
};

export default App;
