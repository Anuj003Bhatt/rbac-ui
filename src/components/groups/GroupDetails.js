import React from 'react';
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

const UserGroupDetails = (props) => {
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
        {/* <MDBRow className="pt-1">
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

        </MDBRow> */}
      </MDBCardBody>
    </MDBCardBody>
  );
}

export default UserGroupDetails;