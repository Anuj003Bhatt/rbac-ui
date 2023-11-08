import React, { useState, useEffect } from 'react';
import CustomDropdown from '../common/CustomDropdown';
import CustomGrid from '../common/CustomGrid';
import ReactModal from 'react-modal';
import { CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getListOfRoleGroups } from './RoleGroupService';
import AddRoleGroup from './AddRoleGroup';

const RoleGroupsTab = () => {

  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [displayNewRoleGroupForm, setDisplayNewRoleGroupForm] = useState(false);

  const getActionsForGroup = (group) => {
    return {
      'View Group': () => renderRoleGroupDetail(group)
    }
  }

  const renderRoleGroupDetail = (group) => {
    navigate(`/roleGroup/${group.id}`);
  }

  useEffect(() => {
    getListOfRoleGroups()
    .then( (response) => {
      setGroups(response);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching role groups:', error);
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
        isOpen={displayNewRoleGroupForm}
        ariaHideApp={false}
        contentLabel='Add New Role Group'
        onRequestClose={() => setDisplayNewRoleGroupForm(false)}
      >
        <div style={{ float: 'right' }}>
          <CloseButton onClick={() => setDisplayNewRoleGroupForm(false)} />
        </div>
        <AddRoleGroup />
      </ReactModal>
      <div style={{ height: 'auto', width: '100%' }}>
        <CustomGrid
          gridActionText="Add Role Group"
          clickAction={() => setDisplayNewRoleGroupForm(true)}
          data={groups}
          columns={columns} />
      </div>
    </div>
  );
};

export default RoleGroupsTab;
