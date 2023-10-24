import React, { useState } from 'react';
import { Tab, Box } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from "@mui/lab/TabContext"; 
import UsersTab from './components/users/UsersTab';
import GroupsTab from './components/groups/GroupsTab';
import { TabList } from '@mui/lab';
import RolesTab from './components/roles/RolesTab';
import PermissionsTab from './components/permissions/PermissionsTab';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('1');
  const [showBasic, setShowBasic] = useState(true);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <MDBNavbar expand='lg' light bgColor='white'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            onClick={() => setShowBasic(!showBasic)}
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <MDBCollapse show={showBasic}>
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
              <MDBNavbarItem active>
                <MDBNavbarLink aria-current='page' href='#'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Features</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>About</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
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
              <Tab label="Roles" value="3" />
              <Tab label="Permissions" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <UsersTab/>
          </TabPanel>
          <TabPanel value="2">
            <GroupsTab/>
          </TabPanel>
          <TabPanel value="3">
            <RolesTab/>
          </TabPanel>
          <TabPanel value="4">
            <PermissionsTab/>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default App;
