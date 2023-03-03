import React, { useCallback, useEffect, useState } from "react";

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
    Pagination,
} from "react-bootstrap";
import AddBook from "./AddBook";
import Import from "../ImportManager/Import";
import UpdateBook from "./UpdateBook";
import BookImportView from "./BookImportView";
import { API } from "views/constant";

function TableList() {
    const [viewAddBook, setViewAddBook] = useState(false);

    const [listBook, setListBook] = useState(null);

    const [pagination, setPagination] = useState(1);

    const [viewUpdate, setViewUpdate] = useState(false);
    const [valueUpdate, setValueUpdate] = useState(null);
    const [viewPurchase, setViewPurchase] = useState(false);
    function handleCloseAddForm() {
        setViewAddBook(false);
    }
    function handleCloseUpdateForm() {
        setViewUpdate(false);
    }
    function handleViewPurchase() {
        setViewPurchase(false);
    }

    let active = 1;
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => setPagination(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }

    console.log(pagination);

    const fetchListUser = useCallback(async () => {
        const response = await fetch(
            `${API}/book?page=${pagination}&search=&type=&author=`,
        );
        if (!response.ok) {
            throw new Error("Something is wrong!");
        }
        const data = await response.json();
        const loadListBook = [];
        for (const key in data) {
            loadListBook.push({
                id: data[key]._id,
                name: data[key].name,
                image: data[key].image,
                price: data[key].price,
                description: data[key].description,
                quatity: data[key].qty,
                author: data[key].idAuthor,
                category: data[key].idType,
                publisher: data[key].idPublisher,
            });
        }

        setListBook(loadListBook);
    }, [pagination]);
    useEffect(() => {
        fetchListUser();
    }, [pagination]);

    const addHandler = (data) => {
        if (data.name == listBook.name) {
            alert("loai sach nay da co trong csdl!");
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            };
            console.log(requestOptions);
            fetch(`${API}/book/create`, requestOptions)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
            // setListBook([...listBook, data])
        }
    };
    const updateHandler = async (data, id) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        await fetch(`${API}/book/update/${id}`, requestOptions)
            .then((response) => {
                console.log(response);
                setReload(true);
            })
            .catch((error) => console.log(error));

        var newListBook = listBook;
        const objIndex = newListBook.findIndex((item) => item.id == id);
        (newListBook[objIndex].name = data.name),
            (newListBook[objIndex].image = data.image),
            (newListBook[objIndex].price = data.price),
            (newListBook[objIndex].description = data.description),
            (newListBook[objIndex].qty = data.qty),
            (newListBook[objIndex].idAuthor = data.idAuthor),
            (newListBook[objIndex].idType = data.idType),
            (newListBook[objIndex].idPublisher = data.idPublisher),
            setListBook([...newListBook]);
    };

    // useEffect(() => {
    //     fetchListUser();
    // }, [pagination]);

    const handleDeleteBook = (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${API}/book/delete/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        var newList = listBook;
        var list = newList.filter(function (item) {
            return item.id != id;
        });
        setListBook(list);
    };

    const handleUpdate = (
        id,
        name,
        image,
        price,
        des,
        qty,
        author,
        category,
        publisher,
    ) => {
        setViewUpdate(true);
        setValueUpdate({
            id,
            name,
            image,
            price,
            des,
            qty,
            author,
            category,
            publisher,
        });
    };

    console.log(listBook);
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        {!viewPurchase && (
                            <Button onClick={() => setViewAddBook(true)}>
                                Add newssds bookk
                            </Button>
                        )}
                        {!viewPurchase && (
                            <Button onClick={() => setViewPurchase(true)}>
                                Purchase
                            </Button>
                        )}
                        {viewPurchase && (
                            <Button style={{
                                marginLeft: "45px",
                                
                            }} onClick={() => setViewPurchase(false)}>
                                Book
                            </Button>
                        )}

                        {viewAddBook && (
                            <AddBook
                                onAdd={addHandler}
                                onClose={handleCloseAddForm}
                            />
                        )}
                        {viewUpdate && (
                            <UpdateBook
                                onUpdate={updateHandler}
                                onClose={handleCloseUpdateForm}
                                value={valueUpdate}
                            />
                        )}

                        {viewPurchase && <BookImportView />}
                        {!viewPurchase && (
                            <Card className="strpied-tabled-with-hover">
                                <Card.Header>
                                    <Card.Title as="h4">
                                        Striped Table with Hover
                                    </Card.Title>
                                    <p className="card-category">
                                        Here is a subtitle for this table
                                    </p>
                                </Card.Header>
                                <Card.Body className="table-full-width table-responsive px-0">
                                    <Table className="table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th className="border-0">
                                                    Name
                                                </th>
                                                <th className="border-0">
                                                    Image
                                                </th>
                                                <th className="border-0">
                                                    Description
                                                </th>
                                                <th className="border-0">
                                                    Quatity
                                                </th>
                                                <th className="border-0">
                                                    Price
                                                </th>
                                                <th className="border-0">
                                                    Category
                                                </th>
                                                <th className="border-0">
                                                    Author
                                                </th>
                                                <th className="border-0">
                                                    Publisher
                                                </th>
                                                <th className="border-0">
                                                    Note
                                                </th>
                                                <th className="border-0">
                                                    Delete
                                                </th>
                                                <th className="border-0">
                                                    Edit
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listBook &&
                                                listBook.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <img
                                                                style={{
                                                                    width: "100px",
                                                                    height:  "120px"
                                                                }}
                                                                src={item.image}
                                                                alt=""
                                                            />
                                                        </td>
                                                        <td>
                                                            {item.description}
                                                        </td>
                                                        <td>{item.quatity}</td>
                                                        <td>{item.price}</td>
                                                        <td>
                                                            {item.category.name}
                                                        </td>
                                                        <td>
                                                            {item.author.name}
                                                        </td>
                                                        <td>
                                                            {
                                                                item.publisher
                                                                    .name
                                                            }
                                                        </td>
                                                        <td>{item.note}</td>
                                                        <td>
                                                            <Button
                                                                onClick={() =>
                                                                    handleDeleteBook(
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
                                                                    handleUpdate(
                                                                        item.id,
                                                                        item.name,
                                                                        item.image,
                                                                        item.price,
                                                                        item.description,
                                                                        item.quatiry,
                                                                        item.author,
                                                                        item.category,
                                                                        item.publisher,
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
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Pagination>{items}</Pagination>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TableList;
