import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';
import CustomGrid from '../common/CustomGrid';

const UserDetails = (props) => {
    return (
        <section className="vh-100" >
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol xl="10">
                <MDBCard className="mb-5" style={{ borderRadius: '15px' }}>
                  <MDBCardBody className="p-4">
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
                        }/>

                    </MDBRow>

                    <hr className="mt-0 mb-4" />
                    <MDBTypography tag="h6">User Groups</MDBTypography>
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
                        }/>

                    </MDBRow>
                    </MDBRow>

                  </MDBCardBody>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      );
}

export default UserDetails;