import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDropdown from '../common/CustomDropdown';
import ReactModal from 'react-modal';
import { CloseButton } from 'react-bootstrap';
import AddUser from './AddUser';
import { SERVICES } from '../../utilities/Constants';
import CustomGrid from '../common/CustomGrid';

const commonActions = ['View User']

const UsersTab = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [displayNewUserForm, setDisplayNewUserForm] = useState(false);

  useEffect(() => {
    // Fetch the list of users from the backend API
    axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users`)
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'userName', headerName: 'Username', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    // Add other columns as described

    {
      field: 'actions',
      headerName: '',
      flex: 1,
      renderCell: (params) => {
        let disableEnableButton = 'Disable User';
        if (params.status !== 'ACTIVE') {
          disableEnableButton = 'Enable User';
        }
        return (<CustomDropdown actions={[...commonActions,disableEnableButton]} />)},
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ReactModal 
        isOpen={displayNewUserForm}
        ariaHideApp={false}
        contentLabel='Add User'
        onRequestClose={() => setDisplayNewUserForm(false)}
      >
        <div style={{float: 'right'}}>
          <CloseButton onClick={() => setDisplayNewUserForm(false)}/>
        </div>
        <AddUser/>
      </ReactModal>
      <div style={{ height: 400, width: '100%' }}>
        <CustomGrid
          gridActionText="New User"
          clickAction={() => setDisplayNewUserForm(true)}
          data={users}
          columns={columns} />
      </div>
    </div>
  );
};

export default UsersTab;
