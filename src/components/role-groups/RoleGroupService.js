import { SERVICES } from "../../utilities/Constants";
import axios from "axios";

export const getListOfRoleGroups = async () => {
    // Fetch the list of user groups from the backend API
    return axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/roles/groups`)
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          throw error
        });
}

export const getRoleGroupById = async (id) => {
  return axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/roles/groups/${id}`)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw error
  });
}

export const getRolesInRoleGroup = async (id) => {
  return axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/roles/groups/_byRoleGroup/${id}`)
  .then((response) => {
    return response.data.data;
  })
  .catch((error) => {
    throw error
  });
}