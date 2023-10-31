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