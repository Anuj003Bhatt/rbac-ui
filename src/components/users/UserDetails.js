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
import { Button, CloseButton, Col, Row } from 'react-bootstrap';
import { getListOfUserGroups } from '../groups/GroupsService';
import SearchBar from '../common/SearchBar';
import { getListOfRoles } from '../roles/RoleService';

const UserDetails = (props) => {

  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(()=>{
    getListOfUserGroups()
    .then( (response) => {
      setGroups(response);
    }).catch((error) => {
      console.error('Error fetching groups:', error);
    });
    getListOfRoles()
    .then( (response) => {
      setRoles(response);
    }).catch((error) => {
      console.error('Error fetching roles:', error);
    });
  }, [])

  const addUserToGroup = (event) => {
    if (selectedGroup) {
      alert('Added Group')
    } else {
      alert("No group selected")
    }
  }

  const addUserToRole = (event) => {
    if (selectedRole) {
      alert('Added Role')
    } else {
      alert("No role selected")
    }
  }

  return (
    <MDBCardBody className="p-4">
      <div style={{ float: 'right' }}>
        <CloseButton onClick={props.setDisplayUserDetails} />
      </div>
      <MDBTypography tag='h3'>User Details</MDBTypography>

      <MDBCardText className="small">
        <MDBIcon far icon="star" size="lg" />
      </MDBCardText>
      <hr className="my-4" />
      <MDBCardBody className="p-4">
        <MDBTypography tag="h6">Basic Information</MDBTypography>
        <hr className="mt-0 mb-4" />
        <MDBRow className="pt-1">
          <MDBCol size="6" className="mb-3">
            <MDBTypography tag="h6">Name</MDBTypography>
            <MDBCardText className="text-muted">{props.user.name}</MDBCardText>
          </MDBCol>
          <MDBCol size="6" className="mb-3">
            <MDBTypography tag="h6">Status</MDBTypography>
            <MDBCardText className="text-muted"><strong>{props.user.status}</strong></MDBCardText>
          </MDBCol>
        </MDBRow>
        <MDBRow className="pt-1">
          <MDBCol size="6" className="mb-3">
            <MDBTypography tag="h6">Email</MDBTypography>
            <MDBCardText className="text-muted">{props.user.email}</MDBCardText>
          </MDBCol>
          <MDBCol size="6" className="mb-3">
            <MDBTypography tag="h6">Phone</MDBTypography>
            <MDBCardText className="text-muted">{props.user.phone}</MDBCardText>
          </MDBCol>
        </MDBRow>
        <hr className="mt-0 mb-4" />
        <MDBTypography tag="h6">
          <Row>
            <Col>User Roles</Col>
            <Col>
              <Row>
                <Col><SearchBar selectAction={setSelectedRole} data={roles}/></Col>
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
            clickAction={() => alert("Here")}
            data={props.user.roles} columns={
              [
                // { field: 'id', headerName: 'ID', flex: 1 },
                { field: 'name', headerName: 'Role', flex: 1 }
              ]
            } />

        </MDBRow>

        <hr className="mt-0 mb-4" />
        <MDBTypography tag="h6">
          <Row>
            <Col>User Groups</Col>
            <Col>
              <Row>
                <Col><SearchBar selectAction={setSelectedGroup} data={groups}/></Col>
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
              clickAction={() => alert("Here")}
              data={props.user.userGroups} columns={
                [
                  // { field: 'id', headerName: 'ID', flex: 1 },
                  { field: 'name', headerName: 'Group', flex: 1 }
                ]
              } />

          </MDBRow>
        </MDBRow>

      </MDBCardBody>
    </MDBCardBody>
  );
}

export default UserDetails;