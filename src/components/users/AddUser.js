import { useState } from "react";
import { Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

const AddUser = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        alert(`User ${username} with password ${password} Created`);
    }
    return (
        <Form style={{ padding: '5%' }} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username..."
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Row>
        </Form>
    );
};

export default AddUser;