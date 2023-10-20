import { Dropdown } from 'react-bootstrap';

const CustomDropdown = (props) => {
    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ cursor: "pointer" }}>
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu popperConfig={{strategy: 'fixed'}} r>
            {
              props.actions.map(
                (item) => {
                  return (
                    <div>
                      <Dropdown.ItemText><div>{item}</div></Dropdown.ItemText>
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
