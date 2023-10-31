import axios from "axios";
import { SERVICES } from "../../utilities/Constants";

export const getListOfRoles = async () => {
    // Fetch the list of roles from the backend API
    return await axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/roles`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
}

export const assignRoleToUser = async (userId, roleId) => {
  return await axios.put(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/assignments/user/${userId}/role/${roleId}`,null,{
    headers:{
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then((response) => response.data)
  .catch((error) => {throw error;});
}