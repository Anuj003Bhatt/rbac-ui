import { SERVICES } from '../../utilities/Constants';
import axios, { AxiosError } from 'axios';

export const getListOfUsers = async () => {
    // Fetch the list of users from the backend API
    return await axios.get(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
}

export const disableUser = async (user) => {
    return await axios.patch(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users/${user.id}/disable`)
    .catch((error) => {
      switch (error?.code) {
          case AxiosError.ERR_NETWORK:
            console.error('Error: Unable to submit request to the server');
            break;
          default:
            console.error(`Error: ${error.response}`);
          }
        }
      );
  }
  
  export const enableUser = async (user) => {
    return await axios.patch(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users/${user.id}/enable`)
    .catch((error) => {
      switch (error?.code) {
          case AxiosError.ERR_NETWORK:
            console.error('Error: Unable to submit request to the server');
            break;
          default:
            console.error(`Error: ${error.response}`);
          }
        }
      );
  }