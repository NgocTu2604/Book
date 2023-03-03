import React, { useCallback, useEffect, useState } from "react";
import UpdateAuthor from "./UpdateAuthor";
import { API } from "views/constant";
// react-bootstrap components
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import AddAuthor from "./AddAuthor";

function ListAuthor() {
    const [viewAddAuthor, setViewAddAuthor] = useState(false);
    const [listAuthor, setListAuthor] = useState([]);
    const [viewUpdateAuthor, setViewUpdateAuthor] = useState(false);
    const [valueUpdateAuthor, setValueUpdateAuthor] = useState({});

    function handleCloseAddForm() {
        setViewAddAuthor(false);
    }
    function handleCloseUpdateForm() {
        setViewUpdateAuthor(false);
    }

    const fetchlistAuthorHandler = useCallback(async () => {
        try {
            const response = await fetch(`${API}/author`);
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadListAuthor = [];
            for (const key in data) {
                loadListAuthor.push({
                    id: data[key]._id,
                    name: data[key].name,
                    image: data[key].image,
                    description: data[key].description,
                });
            }

            setListAuthor(loadListAuthor);
        } catch (error) {}
    }, []);
    useEffect(() => {
        fetchlistAuthorHandler();
    }, []);

    console.log(listAuthor);

    const addHandler = async (data) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        console.log(requestOptions);
        await fetch(`${API}/author/create`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        console.log(listAuthor);
        setListAuthor([...listAuthor, data]);
    };
    const updateHandler = async (data, id) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        console.log(requestOptions);
        await fetch(`${API}/author/update/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        var newListAuthor = listAuthor;

        const objIndex = newListAuthor.findIndex((item) => item.id == id);
        newListAuthor[objIndex].name = data.name;
        newListAuthor[objIndex].image = data.image;
        newListAuthor[objIndex].des = data.description;
        setListAuthor([...newListAuthor]);
    };

    const handleDeleteAuthor = (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${API}/author/delete/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        var newListAuthor = listAuthor;
        var list = newListAuthor.filter(function (item) {
            return item.id != id;
        });
        setListAuthor(list);
    };

    const handleUpdateAuthor = (id, name, image, des) => {
        setViewUpdateAuthor(true);
        setValueUpdateAuthor({ id, name, image, des });
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Button onClick={() => setViewAddAuthor(true)}>
                            Add new AuthorBook
                        </Button>
                        {viewAddAuthor && (
                            <AddAuthor
                                onAdd={addHandler}
                                onClose={handleCloseAddForm}
                            />
                        )}
                        {viewUpdateAuthor && (
                            <UpdateAuthor
                                onUpdate={updateHandler}
                                onClose={handleCloseUpdateForm}
                                value={valueUpdateAuthor}
                            />
                        )}

                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Author</Card.Title>
                                <p className="card-Author">
                                    Here is a list of Author
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">Image</th>
                                            <th className="border-0">Name</th>
                                            <th className="border-0">
                                                Description
                                            </th>
                                            <th className="border-0">Delete</th>
                                            <th className="border-0">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listAuthor &&
                                            listAuthor.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <img
                                                            src={item.image}
                                                            alt=""
                                                            width={150}
                                                            height={150}
                                                            
                                                        />
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <Button
                                                            onClick={() =>
                                                                handleDeleteAuthor(
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
                                                                handleUpdateAuthor(
                                                                    item.id,
                                                                    item.name,
                                                                    item.image,
                                                                    item.description,
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

export default ListAuthor;
