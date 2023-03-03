import { useCallback, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { API } from "views/constant";
function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmitForm = useCallback((e) => {
        const data = { username, password };
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(`${API}/user/login_admin`, requestOptions)
            .then((response) => response.json())
            .then((rs) => {
                if (rs.role == 1) {
                    alert("non-admin account");
                } else if (rs.role == 0) {
                    props.onLogin(rs);
                }
            })
            .catch((error) => console.log(error));
    });

    return (
        <div>
            <Container style={{ backgroundColor: "#000" }}>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">
                                        Login
                                    </h2>
                                    <p className=" mb-5">
                                        Please enter your username and password!
                                    </p>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmitForm}>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicEmail"
                                            >
                                                <Form.Label className="text-center">
                                                    Username
                                                </Form.Label>
                                                <Form.Control
                                                    value={username}
                                                    onChange={(e) =>
                                                        setUsername(
                                                            e.target.value,
                                                        )
                                                    }
                                                    type="text"
                                                    placeholder="Enter username"
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    style={{ width: "100%" }}
                                                >
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Login;
