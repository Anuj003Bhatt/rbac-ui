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
import { CloseButton } from 'react-bootstrap';
import { getListOfUserInGroups } from './GroupsService';
import { getListOfUsers } from '../users/UserService';

const UserGroupDetails = (props) => {
  const [groupUsers, setGroupUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(true);

  useEffect(() => {
    getListOfUserInGroups(props.group.id)
    .then(
      (response) => {
        setGroupUsers(response);
        setLoading(false);
      }
    ).catch((error) => {
      console.log('Error fetching users:', error);
      setLoading(false);
    });
  }, [props.group.id]);
  
  return (
    <MDBCardBody className="p-4">
      <div style={{ float: 'right' }}>
        <CloseButton onClick={props.setDisplayUserGroupDetails} />
      </div>
      <MDBTypography tag='h3'>User Group Details</MDBTypography>

      <MDBCardText className="small">
        <MDBIcon far icon="star" size="lg" />
      </MDBCardText>
      <hr className="my-4" />
      <MDBCardBody className="p-4">
        <MDBRow className="pt-1">
          <MDBCol size="6" className="mb-3">
            <MDBTypography tag="h6">Name</MDBTypography>
            <MDBCardText className="text-muted">{props.group.name}</MDBCardText>
          </MDBCol>
          <MDBCol size="6" className="mb-3">
            <MDBTypography tag="h6">Description</MDBTypography>
            <MDBCardText className="text-muted">{props.group.description}</MDBCardText>
          </MDBCol>
        </MDBRow>
        
        <hr className="mt-0 mb-4" />
        
          {loading?'Loading':
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
  );
}

export default UserGroupDetails;