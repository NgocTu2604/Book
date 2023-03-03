import React, { useCallback, useEffect, useState } from "react";
import UpdateVoucher from "./UpdateVoucher";
import { API } from "views/constant";
// react-bootstrap components
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import AddVoucher from "./AddVoucher";

function ListVoucher() {
    const [viewAddVoucher, setViewAddVoucher] = useState(false);
    const [listVoucher, setListVoucher] = useState([]);
    const [viewUpdate, setViewUpdate] = useState(false);
    const [valueUpdate, setValueUpdate] = useState({});

    function handleCloseAddForm() {
        setViewAddVoucher(false);
    }
    function handleCloseUpdateForm() {
        setViewUpdate(false);
    }

    const fetchlistVoucherHandler = useCallback(async () => {
        try {
            const response = await fetch(`${API}/voucher`);
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadListVoucher = [];
            for (const key in data) {
                loadListVoucher.push({
                    id: data[key]._id,
                    name: data[key].name,
                    reduce: data[key].reduce,
                    qty: data[key].qty,
                    mile: data[key].mile,
                });
            }

            setListVoucher(loadListVoucher);
        } catch (error) {}
    }, []);
    useEffect(() => {
        fetchlistVoucherHandler();
    }, []);

    const addHandler = async (data) => {
        console.log(data);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        console.log(requestOptions);
        await fetch(`${API}/voucher/create`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        setListVoucher([...listVoucher, data]);
    };

    const updateHandler = async (data, id) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        console.log(requestOptions);
        await fetch(`${API}/voucher/update/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

        var newListVoucher = listVoucher;

        const objIndex = newListVoucher.findIndex((item) => item.id == id);
        newListVoucher[objIndex].name = data.name;
        newListVoucher[objIndex].reduce = data.reduce;
        newListVoucher[objIndex].qty = data.qty;
        newListVoucher[objIndex].mile = data.mile;
        setListVoucher([...newListVoucher]);
    };

    const handleDeleteVoucher = (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${API}/voucher/delete/${id}`, requestOptions)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        var newListVoucher = listVoucher;
        var list = newListVoucher.filter(function (item) {
            return item.id != id;
        });
        setListVoucher(list);
    };

    const handleUpdateVoucher = (id, name, reduce, qty, mile) => {
        setViewUpdate(true);
        setValueUpdate({ id, name, reduce, qty, mile });
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Button onClick={() => setViewAddVoucher(true)}>
                            Add new Publisher
                        </Button>
                        {viewAddVoucher && (
                            <AddVoucher
                                onAdd={addHandler}
                                onClose={handleCloseAddForm}
                            />
                        )}
                        {viewUpdate && (
                            <UpdateVoucher
                                onUpdate={updateHandler}
                                onClose={handleCloseUpdateForm}
                                value={valueUpdate}
                            />
                        )}

                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Voucher</Card.Title>
                                <p className="card-Author">
                                    Here is a list of Voucher
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">Name</th>
                                            <th className="border-0">
                                                reduce price
                                            </th>
                                            <th className="border-0">
                                                quatity
                                            </th>
                                            <th className="border-0">mile</th>
                                            <th className="border-0">Delete</th>
                                            <th className="border-0">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listVoucher.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.reduce}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.mile}</td>
                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            handleDeleteVoucher(
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
                                                            handleUpdateVoucher(
                                                                item.id,
                                                                item.name,
                                                                item.reduce,
                                                                item.qty,
                                                                item.mile,
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

export default ListVoucher;
