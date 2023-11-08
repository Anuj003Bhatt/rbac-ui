import { useState } from "react";
import { Alert, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import axios, { AxiosError } from "axios";
import { Divider } from "@mui/material";
import { SERVICES } from "../../utilities/Constants";

const AddUser = () => {

    const formKeyMapping = {
        'formName' : 'name',
        'formUsername': 'userName',
        'formEmail': 'email',
        'formPhone': 'phone',
        'formPassword': 'password'
    }
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userDetails, setUserDetails] = useState({});
    
    const handleChange = (e) => {
        setUserDetails((old) => {
            return {
                ...old,
                [formKeyMapping[e.target.id]]: e.target.value
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users`, userDetails, {
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
                <h1>User Details</h1>
                <Divider component="h1" />
            </Row>
            <Form style={{ padding: '2%' }} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className="col col-sm-6" controlId="formName" name="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter name"
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="col col-sm-6" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Email"
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="col col-sm-6" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter username..."
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="col col-sm-6" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            autoComplete="false"
                            type="password"
                            placeholder="Enter Password..."
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="col col-sm-6" controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter phone number..."
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Button style={{ margin: '1%' }} variant="primary" type="submit">
                        Submit
                    </Button>
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

export default AddUser;