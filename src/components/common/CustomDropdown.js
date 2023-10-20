import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs"; 
import Button from "@mui/material/Button";
import { grey } from '@mui/material/colors';

const CustomDropdown = (props) => {
    return (
        <Dropdown variant="dark">
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ cursor: "pointer" }}>
            <BsThreeDotsVertical/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              props.actions.map(
                (item) => {
                  return (
                    <div>
                      <Dropdown.ItemText><div><Button>{item}</Button></div></Dropdown.ItemText>
                    </div>
                  );
                }
              )
            }
          </Dropdown.Menu>
        </Dropdown>
    )
};

export default CustomDropdown;
