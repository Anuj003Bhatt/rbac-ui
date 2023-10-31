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