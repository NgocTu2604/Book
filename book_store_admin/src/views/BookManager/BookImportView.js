import React, { useCallback, useEffect, useState } from "react";
import { Card, Button, Table } from "react-bootstrap";
import DetailImportView from "./DetailImportView";
import { API } from "views/constant";
function BookImportView(props) {
    const [listImport, setListImport] = useState([]);
    const [importItem, setImportItem] = useState([]);
    const fetchlistImport = async () => {
        const response = await fetch(`${API}/import`);
        if (!response.ok) {
            throw new Error("Something is wrong!");
        }
        const data = await response.json();
        const loadList = [];
        for (const key in data) {
            loadList.push({
                id: data[key]._id,
                total: data[key].total,
                date: data[key].date,
                admin: data[key].idAdmin.name,
            });
        }
        setListImport(loadList);
    };

    const handleViewDetail = async (id) => {
        const response = await fetch(`${API}/import/${id}`);
        if (!response.ok) {
            throw new Error("Something is wrong!");
        }
        const data = await response.json();
        console.log(data);
        const loadList = [];
        for (const key in data) {
            loadList.push({
                id: data[key]._id,
                Book: data[key].idBook,
                amount: data[key].amount,
                price: data[key].price,
                total: data[key].total,
            });
        }
        setImportItem(loadList);
    };

    useEffect(() => {
        fetchlistImport();
    }, []);
    console.log(importItem);

    return (
        <Card>
            <Card.Header>
                <h3>Purchase</h3>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Admin</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listImport.map((item) => (
                            <tr key={item.id}>
                                <td>{item.admin}</td>
                                <td>{item.date}</td>
                                <td>{item.total}</td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            handleViewDetail(item.id)
                                        }
                                    >
                                        detail
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <DetailImportView value={importItem} />
            </Card.Body>
        </Card>
    );
}

export default BookImportView;
