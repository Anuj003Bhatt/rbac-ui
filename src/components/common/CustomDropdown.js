import { Dropdown } from 'react-bootstrap';

const CustomDropdown = (props) => {
    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ cursor: "pointer" }}>
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu style={{position:'fixed'}} popperConfig={{strategy: 'fixed'}}>
          {
            Object.keys(props.actions).map( (item, index) => {
                  return (
                      <Dropdown.Item onClick={props.actions[item]} key={`i-${index}`}>{item}</Dropdown.Item>
                  );
                }
              )
            }
          </Dropdown.Menu>
        </Dropdown>
    )
};

export default CustomDropdown;
