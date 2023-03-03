import React, { useCallback, useEffect, useState } from "react";
import UpdateCategory from "./UpdateCategory";
import { API } from "views/constant";
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import AddCategory from "./AddCategory";

function TableListCategory() {
    const [viewAddBook, setViewAddBook] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [viewUpdateCategory, setViewUpdateCategory] = useState(false);
    const [valueUpdateCategory, setValueUpdateCategory] = useState({});

    function handleCloseAddForm() {
        setViewAddBook(false);
    }
    function handleCloseUpdateForm() {
        setViewUpdateCategory(false);
    }

    const fetchlistCategory = useCallback(async () => {
        try {
            const response = await fetch(`${API}/type`);
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadListCate = [];
            for (const key in data) {
                loadListCate.push({
                    id: data[key]._id,
                    name: data[key].name,
                });
            }

            setListCategory(loadListCate);
        } catch (error) {}
    }, []);
    useEffect(() => {
        fetchlistCategory();
    }, []);

    const addHandler = async (data) => {
        let a = false;
        listCategory.map((item) => {
            if (item.name == data.name) {
                a = true;
            }
        });

        if (a == true) {
            alert("ten bi trung");
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            };

            console.log(requestOptions);
            await fetch(`${API}/type/create`, requestOptions)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
            setListCategory([...listCategory, data]);
        }
    };

    const updateHandler = async (data, id) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        console.log(requestOptions);
        await fetch(`${API}/category/update/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        var newListCate = listCategory;

        const objIndex = newListCate.findIndex((item) => item.id == id);
        newListCate[objIndex].name = data.name;
        setListCategory([...newListCate]);
    };

    const handleDeleteCate = (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${API}/type/delete/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        var newListCate = listCategory;
        var list = newListCate.filter(function (item) {
            return item.id != id;
        });
        setListCategory(list);
    };

    const handleUpdateCate = (id, name) => {
        setViewUpdateCategory(true);
        setValueUpdateCategory({ id, name });
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Button onClick={() => setViewAddBook(true)}>
                            Add new CategoryBook
                        </Button>
                        {viewAddBook && (
                            <AddCategory
                                onAdd={addHandler}
                                onClose={handleCloseAddForm}
                            />
                        )}
                        {viewUpdateCategory && (
                            <UpdateCategory
                                onUpdate={updateHandler}
                                onClose={handleCloseUpdateForm}
                                value={valueUpdateCategory}
                            />
                        )}

                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Category Book</Card.Title>
                                <p className="card-category">
                                    Here is a list of category book store
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
                                        {listCategory.map((item) => (
                                            <tr>
                                                <td key={item.id}>
                                                    {item.name}
                                                </td>
                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            handleDeleteCate(
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
                                                            handleUpdateCate(
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

export default TableListCategory;
