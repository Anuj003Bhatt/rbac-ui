import React, { useState, useEffect } from 'react';
import CustomDropdown from '../common/CustomDropdown';
import CustomGrid from '../common/CustomGrid';
import ReactModal from 'react-modal';
import { CloseButton } from 'react-bootstrap';
import AddUserGroup from './AddUserGroup';
import { getListOfUserGroups } from './UserGroupsService';
import { useNavigate } from 'react-router-dom';

const UserGroupsTab = () => {

  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [displayNewUserGroupForm, setDisplayNewUserGroupForm] = useState(false);

  const getActionsForGroup = (group) => {
    return {
      'View Group': () => renderUserGroupDetail(group)
    }
  }

  const renderUserGroupDetail = (group) => {
    navigate(`/userGroup/${group.id}`);
  }

  useEffect(() => {
    getListOfUserGroups()
    .then( (response) => {
      setGroups(response);
      setLoading(false);
    }).catch((error) => {
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
      renderCell: (params) => <CustomDropdown actions={getActionsForGroup(params.row)} />,
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
      <div style={{ height: 'auto', width: '100%' }}>
        <CustomGrid
          gridActionText="Add User Group"
          clickAction={() => setDisplayNewUserGroupForm(true)}
          data={groups}
          columns={columns} />
      </div>
    </div>
  );
};

export default UserGroupsTab;
