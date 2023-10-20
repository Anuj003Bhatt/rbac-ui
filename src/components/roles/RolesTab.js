import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import CustomDropdown from '../common/CustomDropdown';
import { SERVICES } from '../../utilities/Constants';

const actions = ['View Role Details', 'Edit Role']

const RolesTab = () => {

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of roles from the backend API
    axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/roles`)
      .then((response) => {
        setRoles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
        setLoading(false);
      });
  }, []);


  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
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
        <Button variant="outlined">Create Role</Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={roles} columns={columns} />
      </div>
    </div>
  );
};

export default RolesTab;
