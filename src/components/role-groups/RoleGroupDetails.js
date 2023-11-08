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
import { getRoleGroupById, getRolesInRoleGroup } from './RoleGroupService';
import '../DetailsComponent.css';
import Home from '../home/Home';

const RoleGroupDetails = (props) => {
  const { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [groupRoles, setGroupRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoleGroupById(groupId).then(
      (response) => setGroup(response)
    ).catch((error)=> {
      console.log(`Error fetching role group for id ${groupId}: `, error);
    });

    getRolesInRoleGroup(groupId)
    .then(
      (response) => {
        setGroupRoles(response);
        setLoading(false);
      }
    ).catch((error) => {
      console.log('Error fetching roles:', error);
      setLoading(false);
    });
  }, [groupId]);
  
  return (
    <div>
      <Home renderMain={false}/>
    <MDBCardBody className="p-4 main">
      <MDBTypography tag='h3'>Role Group Details</MDBTypography>

      <MDBCardText className="small">
        <MDBIcon far icon="star" size="lg" />
      </MDBCardText>
      <hr className="my-4" />
      <MDBCardBody className="p-4">
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
        
          {loading?'Loading':
          <MDBRow className="pt-1">
          <CustomGrid
            hideToolbar={true}
            data={groupRoles} columns={
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