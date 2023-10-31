import React, { useState, useEffect } from 'react';
import CustomDropdown from '../common/CustomDropdown';
import ReactModal from 'react-modal';
import { CloseButton } from 'react-bootstrap';
import AddUser from './AddUser';
import CustomGrid from '../common/CustomGrid';
import { disableUser, enableUser, getListOfUsers } from './UserService';
import UserDetails from './UserDetails';

const UsersTab = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayNewUserForm, setDisplayNewUserForm] = useState(false);
  const [displayUserDetails, setDisplayUserDetails] = useState(false);

  useEffect(() => {
      getListOfUsers()
      .then(
        (response) => {
          setUsers(response);
          setLoading(false);
        }
      ).catch((error) => {
        console.log('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const getActionsForUser = (user) => {
    const commonActions = {
      'View User':() => viewUserDetailPage(user)
    }
    if (user.status === 'ACTIVE') {
      return {
        ...commonActions,
        'Disable User': () => disableUser(user)
      }
    } else {
      return {
        ...commonActions,
        'Enable User': () => enableUser(user)
      };
    }
  }

  const viewUserDetailPage = (user) => {
    setSelectedUser(user);
    setDisplayUserDetails(true);
  }

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
      renderCell: (params) => <CustomDropdown actions={getActionsForUser(params.row)} />,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{height:'100%', minHeight:'100%'}}>
      <ReactModal
        isOpen={displayUserDetails}
        ariaHideApp={false}
        contentLabel='User Details'
        onRequestClose={() => setDisplayUserDetails(false)}>
        <UserDetails setDisplayUserDetails={() => setDisplayUserDetails(false)} user={selectedUser}/>
      </ReactModal>
      <ReactModal
        isOpen={displayNewUserForm}
        ariaHideApp={false}
        contentLabel='Add User'
        onRequestClose={() => setDisplayNewUserForm(false)}>
        <div style={{ float: 'right' }}>
          <CloseButton onClick={() => setDisplayNewUserForm(false)} />
        </div>
        <AddUser />
      </ReactModal>
      <div style={{ height:'100%', width: '100%' }}>
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
