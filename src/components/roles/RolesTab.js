import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDropdown from '../common/CustomDropdown';
import { SERVICES } from '../../utilities/Constants';
import CustomGrid from '../common/CustomGrid';
import ReactModal from 'react-modal';
import { CloseButton } from 'react-bootstrap';

const actions = ['View Role Details', 'Edit Role']

const RolesTab = () => {

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayNewRoleForm, setDisplayNewRoleForm] = useState(false);

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
      <ReactModal
        isOpen={displayNewRoleForm}
        ariaHideApp={false}
        contentLabel='Add Role'
        onRequestClose={() => setDisplayNewRoleForm(false)}
      >
        <div style={{float: 'right'}}>
          <CloseButton onClick={() => setDisplayNewRoleForm(false)}/>
        </div>
        New role form
      </ReactModal>
      <div style={{ height: 400, width: '100%' }}>
      <CustomGrid
          gridActionText="Add Role"
          clickAction={() => setDisplayNewRoleForm(true)}
          data={roles}
          columns={columns} />
      </div>
    </div>
  );
};

export default RolesTab;
