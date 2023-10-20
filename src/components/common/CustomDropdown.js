import { Dropdown } from 'react-bootstrap';

const CustomDropdown = (props) => {
    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ cursor: "pointer" }}>
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu popperConfig={{strategy: 'fixed'}}>
          {
              props.actions.map(
                (item, index) => {
                  return (
                      <Dropdown.Item key={`i-${index}`}>{item}</Dropdown.Item>
                  );
                }
              )
            }
          </Dropdown.Menu>
        </Dropdown>
    )
};

export default CustomDropdown;
