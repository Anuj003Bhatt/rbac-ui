// src/UsersTab.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import CustomDropdown from './common/CustomDropdown';

const actions = ['View User', 'Edit User']

const UsersTab = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of users from the backend API
    axios.get('http://localhost:8002/users')
      .then((response) => {
        console.log("Here setting response");
        setUsers(response.data.data);
        console.log(users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
        setLoading(false);
      });
  }, []);


  const columns = [
    { field: 'id', headerName: 'User ID', flex: 1 },
    { field: 'userName', headerName: 'Username', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    // Add other columns as described

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <CustomDropdown actions={actions}/>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Button variant="outlined">Create User</Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={users} columns={columns} />
      </div>
    </div>
  );
};

export default UsersTab;
