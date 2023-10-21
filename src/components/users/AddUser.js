import { useState } from "react";
import { Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { SERVICES } from '../../utilities/Constants';
import { Divider } from "@mui/material";

const AddUser = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const getKey = (targetId) => {
        switch (targetId) {
            case 'formName' :
                return 'name'
            case 'formUsername' :
                return 'userName'
            case 'formEmail' :
                return 'email'
            case 'formPhone' :
                return 'phone'
            case 'formPassword' :
                return 'password'
            default : return null;
        }
    }
    const handleChange = (e) => {
        setUserDetails((old) => {
            return {
                ...old,
                [getKey(e.target.id)]: e.target.value
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://${SERVICES.rbac.host}:${SERVICES.rbac.port}/users`, userDetails, {
            'Access-Control-Allow-Origin': '*'
        }).then((response) => {
            setErrorMessage('');
            event.target.submit();
        }).catch((error) => {
            console.log(error.response.data);
            setErrorMessage('Error: ' + error.response.data.error);
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
                    <div style={{color: 'red'}}>{errorMessage}</div>
                </Row>
            </Form>
            
        </div>
    );
};

export default AddUser;