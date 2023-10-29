import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDropdown from '../common/CustomDropdown';
import { SERVICES } from '../../utilities/Constants';
import CustomGrid from '../common/CustomGrid';
import ReactModal from 'react-modal';
import { CloseButton } from 'react-bootstrap';
import AddUserGroup from './AddUserGroup';

const GroupsTab = () => {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayNewUserGroupForm, setDisplayNewUserGroupForm] = useState(false);

  const getActionsForGroup = (group) => {
    return {
      'View Group': () => displayUserGroupDetail(group), 
      'Edit Group': () => displayEditUserGroup(group)
    }
  }

  const displayUserGroupDetail = (group) => {
    alert("User Group Detail: " + group.id);
  }

  const displayEditUserGroup = (group) => {
    alert("Edit User group: " + group.id);
  }

  useEffect(() => {
    // Fetch the list of users from the backend API
    axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users/groups`)
      .then((response) => {
        setGroups(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
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
      renderCell: (params) => <CustomDropdown actions={getActionsForGroup(params)} />,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ReactModal
        isOpen={displayNewUserGroupForm}
        ariaHideApp={false}
        contentLabel='Add New User Group'
        onRequestClose={() => setDisplayNewUserGroupForm(false)}
      >
        <div style={{ float: 'right' }}>
          <CloseButton onClick={() => setDisplayNewUserGroupForm(false)} />
        </div>
        <AddUserGroup />
      </ReactModal>
      <div style={{ height: 400, width: '100%' }}>
        <CustomGrid
          gridActionText="Add User Group"
          clickAction={() => setDisplayNewUserGroupForm(true)}
          data={groups}
          columns={columns} />
      </div>
    </div>
  );
};

export default GroupsTab;
