import { useState } from "react";
import { Row, Alert } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import axios, { AxiosError } from "axios";
import { SERVICES } from '../../utilities/Constants';
import { Divider } from "@mui/material";

const AddRole = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [roleDetails, setRoleDetails] = useState({});
    const [isError, setIsError] = useState(false);
    const formKeyMapping = {
        'formName': 'name',
        'formDescription': 'description',
    }
    const handleChange = (e) => {
        setRoleDetails((old) => {
            return {
                ...old,
                [formKeyMapping[e.target.id]]: e.target.value
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/roles`, roleDetails, {
            'Access-Control-Allow-Origin': '*'
        }).then((response) => {
            setErrorMessage('');
            setIsError(false);
            event.target.submit();
        }).catch((error) => {
            setIsError(true);
            switch (error?.code) {
                case AxiosError.ERR_NETWORK:
                    setErrorMessage('Error: Unable to submit request to the server');
                    break;
                default:
                    setErrorMessage('Error: ' + error.response);
            }
        });
    }

    return (
        <div>
            <Row className="mb-3" >
                <h1>Add Role</h1>
                <Divider component="h1" />
            </Row>
            <Form style={{ padding: '2%' }} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className="col col-sm-6" controlId="formName" name="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter role name..."
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="col col-sm-6" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            type="textarea"
                            placeholder="Role Description..."
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group className="col col-sm-1" >
                    <Button style={{ margin: '1%' }} variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Alert show={isError} key='danger' variant='danger'>
                        {errorMessage}
                    </Alert>
                </Row>
            </Form>
            
        </div>
    );
};

export default AddRole;