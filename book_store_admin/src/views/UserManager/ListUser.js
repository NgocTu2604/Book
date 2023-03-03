import React, { useCallback, useEffect, useState } from "react";
// react-bootstrap components
import { API } from "views/constant";
import {
    Button,
    Card,
    Table,
    Container,
    Row,
    Col,
    Alert,
} from "react-bootstrap";

function ListUser() {
    const [listUser, setListUser] = useState([]);

    const fetchlistUserHandler = async () => {
        try {
            const response = await fetch(`${API}/user`);
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadListUser = [];
            for (const key in data) {
                loadListUser.push({
                    id: data[key]._id,
                    name: data[key].name,
                    role: data[key].role,
                });
            }
            console.log(loadListUser);

            setListUser(loadListUser);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchlistUserHandler();
    }, []);

    const handleDeleteUser = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${API}/user/delete/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        var newListUser = listUser;
        var list = newListUser.filter(function (item) {
            return item.id != id;
        });
        setListVoucher(list);
    };

    const handleAddAdmin = (id) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: 0 }),
        };
        console.log(requestOptions);
        fetch(`${API}/user/update_role/${id}`, requestOptions)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    alert("Thêm tài khoản admin thành công");
                }
            })
            .catch((error) => console.log(error));
    };

    console.log("render");

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">User</Card.Title>
                                <p className="card-Author">
                                    Here is a list of User
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">Name</th>
                                            <th className="border-0">Date</th>
                                            <th className="border-0">Gender</th>
                                            <th className="border-0">
                                                Address
                                            </th>
                                            <th className="border-0">Phone</th>
                                            <th className="border-0">Delete</th>
                                            <td className="border-0">
                                                Permission Admin
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listUser.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.date}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.address}</td>
                                                <td>0{item.phone}</td>
                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                item.id,
                                                            )
                                                        }
                                                    >
                                                        x
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            handleAddAdmin(
                                                                item.id,
                                                            )
                                                        }
                                                    >
                                                        Add Admin
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ListUser;
