import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDropdown from '../common/CustomDropdown';
import { SERVICES } from '../../utilities/Constants';
import CustomGrid from '../common/CustomGrid';
import { CloseButton } from 'react-bootstrap';
import ReactModal from 'react-modal';
import AddPermission from './AddPermission';

const PermissionsTab = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayNewPermissionForm, setDisplayNewPermissionForm] = useState(false);

  const getActionsForPermissions = (permission) => {
    return {
      'View Permission': () => viewPermissionDetailsPage(permission)
    }
  } 

  const viewPermissionDetailsPage = (permission) => {
    window.open(`permission/${permission.id}`,'_blank');
  }
  useEffect(() => {
    // Fetch the list of roles from the backend API
    axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/permissions`)
      .then((response) => {
        setPermissions(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching permissions:', error);
        setLoading(false);
      });
  }, []);


  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'accessType', headerName: 'Type of access', flex: 1 },
    // Add other columns as described

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <CustomDropdown actions={getActionsForPermissions(params.row)}/>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ReactModal
        isOpen={displayNewPermissionForm}
        ariaHideApp={false}
        contentLabel='Add Permission'
        onRequestClose={() => setDisplayNewPermissionForm(false)}
      >
        <div style={{float: 'right'}}>
          <CloseButton onClick={() => setDisplayNewPermissionForm(false)}/>
        </div>
        <AddPermission/>
      </ReactModal>
      <div>
        <CustomGrid
          gridActionText="Add Permission"
          clickAction={() => setDisplayNewPermissionForm(true)}
          data={permissions}
          columns={columns} />
      </div>
    </div>
  );
};

export default PermissionsTab;
