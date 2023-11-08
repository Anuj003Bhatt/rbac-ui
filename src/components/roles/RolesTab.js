import React, { useState, useEffect } from 'react';
import CustomDropdown from '../common/CustomDropdown';
import CustomGrid from '../common/CustomGrid';
import ReactModal from 'react-modal';
import { CloseButton } from 'react-bootstrap';
import AddRole from './AddRole';
import { getListOfRoles } from './RoleService';

const RolesTab = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayNewRoleForm, setDisplayNewRoleForm] = useState(false);

  const getActionsForRole = (role) => {
    return {
      'View Role Details': () => viewRoleDetailsPage(role)
    }
  }
  
  const viewRoleDetailsPage = (role) => {
    window.open(`/role/${role.id}`, '_blank');
  }
  
  useEffect(() => {
    // Fetch the list of roles from the backend API
    getListOfRoles()
      .then((response) => {
        setRoles(response);
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
        <CustomDropdown actions={getActionsForRole(params.row)}/>
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
        <AddRole/>
      </ReactModal>
      <div style={{ height: 'auto', width: '100%' }}>
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
