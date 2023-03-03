import React, { useCallback, useEffect, useState } from "react";
import UpdatePublisher from "./UpdatePublisher";
// react-bootstrap components
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import AddPublisher from "./AddPublisher";
import { API } from "views/constant";

function ListPublisher() {
    const [viewAddPublisher, setViewAddPublisher] = useState(false);
    const [listPublisher, setListPublisher] = useState([]);
    const [viewUpdatePublisher, setViewUpdatePublisher] = useState(false);
    const [valueUpdatePublisher, setValueUpdatePublisher] = useState({});

    function handleCloseAddForm() {
        setViewAddPublisher(false);
    }
    function handleCloseUpdateForm() {
        setViewUpdatePublisher(false);
    }

    const fetchlistPublisherHandler = useCallback(async () => {
        try {
            const response = await fetch(`${API}/publisher`);
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadListPublisher = [];
            for (const key in data) {
                loadListPublisher.push({
                    id: data[key]._id,
                    name: data[key].name,
                });
            }

            setListPublisher(loadListPublisher);
        } catch (error) {}
    }, []);
    useEffect(() => {
        fetchlistPublisherHandler();
    }, []);

    const addHandler = async (data) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        console.log(requestOptions);
        await fetch(`${API}/publisher/create`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        setListPublisher([...listPublisher, data]);
    };

    const updateHandler = async (data, id) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        console.log(requestOptions);
        await fetch(`${API}/publisher/update/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        var newListPublisher = listPublisher;

        const objIndex = newListPublisher.findIndex((item) => item.id == id);
        newListPublisher[objIndex].name = data.name;
        setListPublisher([...newListPublisher]);
    };

    const handleDeletePublisher = (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${API}/publisher/delete/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        var newListPublisher = listPublisher;
        var list = newListPublisher.filter(function (item) {
            return item.id != id;
        });
        setListPublisher(list);
    };

    const handleUpdatePublisher = (id, name) => {
        setViewUpdatePublisher(true);
        setValueUpdatePublisher({ id, name });
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Button onClick={() => setViewAddPublisher(true)}>
                            Add new Publisher
                        </Button>
                        {viewAddPublisher && (
                            <AddPublisher
                                onAdd={addHandler}
                                onClose={handleCloseAddForm}
                            />
                        )}
                        {viewUpdatePublisher && (
                            <UpdatePublisher
                                onUpdate={updateHandler}
                                onClose={handleCloseUpdateForm}
                                value={valueUpdatePublisher}
                            />
                        )}

                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Publisher</Card.Title>
                                <p className="card-Author">
                                    Here is a list of Publisher
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">Name</th>
                                            <th className="border-0">Delete</th>
                                            <th className="border-0">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listPublisher.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            handleDeletePublisher(
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
                                                            handleUpdatePublisher(
                                                                item.id,
                                                                item.name,
                                                            )
                                                        }
                                                    >
                                                        Edit
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

export default ListPublisher;
