import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs"; 
import Button from "@mui/material/Button";

const CustomDropdown = (props) => {
    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ cursor: "pointer" }}>
            <BsThreeDotsVertical/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {
              props.actions.map(
                (item) => {
                  return <Dropdown.Item><Button>{item}</Button></Dropdown.Item>
                }
              )
            }
          </Dropdown.Menu>
        </Dropdown>
    )
};

export default CustomDropdown;
