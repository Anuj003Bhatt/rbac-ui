import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import CustomDropdown from '../common/CustomDropdown';
import ReactModal from 'react-modal';
import { CloseButton } from 'react-bootstrap';
import AddUser from './AddUser';

const actions = ['View User', 'Edit User']

const UsersTab = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [displayNewUserForm, setDisplayNewUserForm] = useState(false);

  useEffect(() => {
    // Fetch the list of users from the backend API
    axios.get('http://localhost:8002/users')
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
        setLoading(false);
      });
  }, []);


  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'userName', headerName: 'Username', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    // Add other columns as described

    {
      field: 'actions',
      headerName: '',
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
      <ReactModal 
        isOpen={displayNewUserForm}
        contentLabel='Add New User'
        onRequestClose={() => setDisplayNewUserForm(false)}
      >
        <CloseButton onClick={() => setDisplayNewUserForm(false)}>X</CloseButton>
        <AddUser/>
      </ReactModal>
      <div>
        <Button onClick={setDisplayNewUserForm} variant="outlined">Create User</Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={users} columns={columns} />
      </div>
    </div>
  );
};

export default UsersTab;
