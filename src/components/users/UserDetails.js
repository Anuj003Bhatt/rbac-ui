import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';
import CustomGrid from '../common/CustomGrid';
import { Button, Col, Row } from 'react-bootstrap';
import { addUserInGroups, getListOfUserGroups } from '../user-groups/UserGroupsService';
import SearchBar from '../common/SearchBar';
import { assignRoleGroupToUser, assignRoleToUser, getListOfRoles } from '../roles/RoleService';
import { AxiosError } from 'axios';
import { getUserById } from './UserService';
import { useParams } from 'react-router-dom';
import Home from '../home/Home';
import '../DetailsComponent.css';
import { getListOfRoleGroups } from '../role-groups/RoleGroupService';

const UserDetails = (props) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [roleGroups, setRoleGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedRoleGroup, setSelectedRoleGroup] = useState(null);

  const getUser = (id) => {
    getUserById(id)
      .then((response) => {
        setUser(response);
      }).catch((error) => {
        console.error('Error fetching groups:', error);
      })
  }

  const getGroups = () => {
    getListOfUserGroups()
      .then((response) => {
        setGroups(response);
      }).catch((error) => {
        console.error('Error fetching groups:', error);
      });
  }

  const getRoleGroups = () => {
    getListOfRoleGroups()
      .then((response) => {
        setRoleGroups(response);
      }).catch((error) => {
        console.error('Error fetching role groups:', error);
      });
  }

  const getRoles = () => {
    getListOfRoles()
      .then((response) => {
        setRoles(response);
      }).catch((error) => {
        console.error('Error fetching roles:', error);
      });
  }



  useEffect(() => {
    getUser(userId);
    getGroups();
    getRoles();
    getRoleGroups();
  }, [userId]);

  const addUserToGroup = (event) => {
    try {
      if (selectedGroup) {
        addUserInGroups(user.id, selectedGroup).then((response) => {
          getUser(user.id)
        }
        );

      }
    } catch (error) {
      switch (error?.code) {
        case AxiosError.ERR_NETWORK:
          alert('Error: Unable to submit request to the server');
          break;
        default:
          alert('Error: ' + error.response);
      }
    }
  }

  const assignRoleGroup = (event) => {
    try {
      if (selectedRoleGroup) {
        assignRoleGroupToUser(user.id, selectedRoleGroup).then((response) => {
          getUser(user.id)
        }
        );

      }
    } catch (error) {
      switch (error?.code) {
        case AxiosError.ERR_NETWORK:
          alert('Error: Unable to submit request to the server');
          break;
        default:
          alert('Error: ' + JSON.stringify(error));
      }
    }
  }

  const addUserToRole = (event) => {
    try {
      if (selectedRole) {
        assignRoleToUser(user.id, selectedRole).then((response) => {
          getUser(user.id);
        });
      } else {
        alert("No role selected")
      }
    } catch (error) {
      switch (error?.code) {
        case AxiosError.ERR_NETWORK:
          alert('Error: Unable to submit request to the server');
          break;
        default:
          alert('Error: ' + error.response);
      }
    }

  }

  return (
    <div >
      <Home renderMain={false} />
      <MDBCardBody className="p-4 main">
        <MDBTypography tag='h1'>User Details</MDBTypography>

        <MDBCardText className="small">
          <MDBIcon far icon="star" size="lg" />
        </MDBCardText>
        <hr className="my-4" />
        <MDBCardBody className="p-4">
          <MDBTypography tag="h3">Basic Information</MDBTypography>
          <hr className="mt-0 mb-4" />
          <MDBRow className="pt-1">
            <MDBCol size="6" className="mb-3">
              <MDBTypography tag="h6">ID</MDBTypography>
              <MDBCardText className="text-muted">{user?.id}</MDBCardText>
            </MDBCol>
            <MDBCol size="6" className="mb-3">
              <MDBTypography tag="h6">Name</MDBTypography>
              <MDBCardText className="text-muted">{user?.name}</MDBCardText>
            </MDBCol>
          </MDBRow>

          <MDBRow className="pt-1">
            <MDBCol size="6" className="mb-3">
              <MDBTypography tag="h6">Status</MDBTypography>
              <MDBCardText className="text-muted"><strong>{user?.status}</strong></MDBCardText>
            </MDBCol>
            <MDBCol size="6" className="mb-3">
              <MDBTypography tag="h6">Email</MDBTypography>
              <MDBCardText className="text-muted">{user?.email}</MDBCardText>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol size="6" className="mb-3">
              <MDBTypography tag="h6">Phone</MDBTypography>
              <MDBCardText className="text-muted">{user?.phone}</MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr className="mt-0 mb-4" />
          <MDBTypography tag="h6">
            <Row>
              <Col><MDBTypography tag="h3">User Roles</MDBTypography></Col>
              <Col>
                <Row>
                  <Col><SearchBar selectAction={setSelectedRole} data={roles} /></Col>
                  <Col><Button onClick={addUserToRole}>Add Role</Button></Col>
                </Row>
              </Col>
            </Row>
          </MDBTypography>

          <hr className="mt-0 mb-4" />
          <MDBRow className="pt-1">
            <CustomGrid
              hideToolbar={true}
              gridActionText="User Roles"
              data={user ? user.roles : []} columns={
                [
                  // { field: 'id', headerName: 'ID', flex: 1 },
                  { field: 'name', headerName: 'Role', flex: 1 }
                ]
              } />

          </MDBRow>

          <hr className="mt-0 mb-4" />
          <MDBTypography tag="h6">
            <Row>
              <Col><MDBTypography tag="h3">User Groups</MDBTypography></Col>
              <Col>
                <Row>
                  <Col><SearchBar selectAction={setSelectedGroup} data={groups} /></Col>
                  <Col><Button onClick={addUserToGroup}>Add Group</Button></Col>
                </Row>
              </Col>
            </Row>

          </MDBTypography>

          <hr className="mt-0 mb-4" />
          <MDBRow className="pt-1">
            <MDBRow className="pt-1">
              <CustomGrid
                hideToolbar={true}
                gridActionText="User Roles"
                data={user ? user.userGroups : []} columns={
                  [
                    // { field: 'id', headerName: 'ID', flex: 1 },
                    { field: 'name', headerName: 'Group', flex: 1 }
                  ]
                } />

            </MDBRow>
          </MDBRow>

          <hr className="mt-0 mb-4" />
          <MDBTypography tag="h6">
            <Row>
              <Col><MDBTypography tag="h3">Role Groups</MDBTypography></Col>
              <Col>
                <Row>
                  <Col><SearchBar selectAction={setSelectedRoleGroup} data={roleGroups} /></Col>
                  <Col><Button onClick={assignRoleGroup}>Add Role Group</Button></Col>
                </Row>
              </Col>
            </Row>

          </MDBTypography>

          <hr className="mt-0 mb-4" />
          <MDBRow className="pt-1">
            <MDBRow className="pt-1">
              <CustomGrid
                hideToolbar={true}
                gridActionText="Role Groups"
                data={user ? user.roleGroups : []} columns={
                  [
                    // { field: 'id', headerName: 'ID', flex: 1 },
                    { field: 'name', headerName: 'Role Group', flex: 1 }
                  ]
                } />

            </MDBRow>
          </MDBRow>

        </MDBCardBody>
      </MDBCardBody>
    </div>
  );
}

export default UserDetails;