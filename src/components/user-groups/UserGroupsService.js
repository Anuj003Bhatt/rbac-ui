import { SERVICES } from "../../utilities/Constants";
import axios from "axios";

export const getListOfUserGroups = async () => {
    // Fetch the list of user groups from the backend API
    return axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users/groups`)
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          throw error
        });
}

export const getUserGroupById = async (id) => {
  // Get User group by ID
  return axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users/groups/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error
      });
}

export const getListOfUserInGroups = async (id) => {
    // Fetch the list of user groups from the backend API
    return axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users/_byGroup/${id}`)
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          throw error
        });
}

export const addUserInGroups = async (userId, groupId) => {
  return await axios
  .put(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/assignments/user/${userId}/userGroup/${groupId}`,null,{
    headers:{
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then((response) => response.data)
  .catch((error) => {
          throw error
        });
}