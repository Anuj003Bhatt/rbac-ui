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
import { addUserInGroups, getListOfUserInGroups, getUserGroupById } from './UserGroupsService';
import { useParams } from 'react-router-dom';
import '../DetailsComponent.css';
import Home from '../home/Home';
import { Button, Col, Row } from 'react-bootstrap';
import SearchBar from '../common/SearchBar';
import { AxiosError } from 'axios';
import { getListOfUsers } from '../users/UserService';

const UserGroupDetails = (props) => {
  const { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [groupUsers, setGroupUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);

  const getUsers = () => {
    getListOfUsers()
      .then((response) => {
        setUsers(response);
      }).catch((error) => {
        console.error('Error fetching users:', error);
      })
  }

  const addUserToGroup = (event) => {
    try {
      if (selectedUser) {
        addUserInGroups(selectedUser, group.id).then((response) => {
          getUserGroup(group.id)
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

  const getUserGroup = (id) => {
    getUserGroupById(id).then(
      (response) => setGroup(response)
    ).catch((error) => {
      console.log(`Error fetching user group for id ${id}: `, error);
    })
  }

  useEffect(() => {
    getUserGroup(groupId);
    getListOfUserInGroups(groupId)
      .then(
        (response) => {
          setGroupUsers(response);
          setLoading(false);
        }
      ).catch((error) => {
        console.log('Error fetching users:', error);
        setLoading(false);
      });
    getUsers();
  }, [groupId]);

  return (
    <div>
      <Home renderMain={false} />
      <MDBCardBody className="p-4 main">
        <MDBTypography tag='h1'>User Group Details</MDBTypography>

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
              <MDBCardText className="text-muted">{group.id}</MDBCardText>
            </MDBCol>
            <MDBCol size="6" className="mb-3">
              <MDBTypography tag="h6">Name</MDBTypography>
              <MDBCardText className="text-muted">{group.name}</MDBCardText>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size="6" className="mb-3">
              <MDBTypography tag="h6">Description</MDBTypography>
              <MDBCardText className="text-muted">{group.description}</MDBCardText>
            </MDBCol>
          </MDBRow>

          <hr className="mt-0 mb-4" />
          <MDBTypography tag="h6">
            <Row>
              <Col><MDBTypography tag="h3">Users</MDBTypography></Col>
              <Col>
                <Row>
                  <Col><SearchBar selectAction={setSelectedUser} data={users} /></Col>
                  <Col><Button onClick={addUserToGroup}>Add User</Button></Col>
                </Row>
              </Col>
            </Row>
            </MDBTypography>

          {loading ? 'Loading' :
            <MDBRow className="pt-1">
              <CustomGrid
                hideToolbar={true}
                data={groupUsers} columns={
                  [
                    { field: 'id', headerName: 'ID', flex: 1 },
                    { field: 'name', headerName: 'Name', flex: 1 }
                  ]
                } />

            </MDBRow>
          }


        </MDBCardBody>
      </MDBCardBody>
    </div>
  );
}

export default UserGroupDetails;