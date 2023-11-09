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
import { useParams } from 'react-router-dom';
import { getRoleGroupById } from './RoleGroupService';
import '../DetailsComponent.css';
import Home from '../home/Home';
import { addRoleToRoleGroup, getListOfRoles } from '../roles/RoleService';
import { Button, Col, Row } from 'react-bootstrap';
import SearchBar from '../common/SearchBar';
import { AxiosError } from 'axios';

const RoleGroupDetails = (props) => {
  const { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const getRoleGroup = (id) => {
    getRoleGroupById(id).then(
      (response) => {
        setGroup(response)
        setLoading(false);
      }
    ).catch((error)=> {
      console.log(`Error fetching role group for id ${id}: `, error);
    });
  }

  const getAllRoles = () => {
    getListOfRoles().then(
      (response) => {
        setRoles(response)
      }
    ).catch((error) => {
      console.log(`Error fetching roles: `, error);
    })
  }

  const addRoleToGroup = (event) => {
    try {
      if (selectedRole) {
        addRoleToRoleGroup(selectedRole, group.id).then((response) => {
          getRoleGroup(group.id)
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

  useEffect(() => {
    getRoleGroup(groupId);
    getAllRoles();
  }, [groupId]);
  
  return (
    <div>
      <Home renderMain={false}/>
    <MDBCardBody className="p-4 main">
      <MDBTypography tag='h1'>Role Group Details</MDBTypography>

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
              <Col><MDBTypography tag="h3">Roles</MDBTypography></Col>
              <Col>
                <Row>
                  <Col><SearchBar selectAction={setSelectedRole} data={roles} /></Col>
                  <Col><Button onClick={addRoleToGroup}>Add Role</Button></Col>
                </Row>
              </Col>
            </Row>
            </MDBTypography>
        
          {loading?'Loading':
          <MDBRow className="pt-1">
          <CustomGrid
            hideToolbar={true}
            data={group.roles} columns={
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

export default RoleGroupDetails;