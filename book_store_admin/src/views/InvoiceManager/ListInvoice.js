import React, { useCallback, useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import DetailInvoice from "./DetailInvoice";
import { API } from "views/constant";

function InvoiceManagement() {
    const [listInvoice, setListInvoice] = useState([]);
    const [listInvoiceDetail, setListInvoiceDetail] = useState([]);
    const [viewDetail, setViewDetail] = useState(false);
    const [status, setStatus] = useState(1);

    const fetchlistInvoice = async () => {
        try {
            const response = await fetch(
                `${API}/order/get_order_by_status?status=${status}`,
            );
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadListInvoice = [];
            for (const key in data) {
                loadListInvoice.push({
                    id: data[key]._id,
                    user: data[key].idUser.name,
                    voucher: data[key].idVoucher.name,
                    total: data[key].total,
                    recipient: data[key].recipient,
                    phone: data[key].phone,
                    address: data[key].address,
                    note: data[key].note,
                    date: data[key].date,
                    status: data[key].status,
                });
            }
            setListInvoice(loadListInvoice);
        } catch (error) {}
    };
    useEffect(() => {
        fetchlistInvoice();
    }, [status]);

    const fetchlistInvoiceDetail = async (id) => {
        setViewDetail(true);
        try {
            const response = await fetch(`${API}/order/${id}`);
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadListInvoiceDetail = [];
            for (const key in data) {
                loadListInvoiceDetail.push({
                    id: data[key]._id,
                    nameBook: data[key].idBook.name,
                    imageBook: data[key].idBook.image,
                    amount: data[key].amount,
                    price: data[key].price,
                });
            }

            setListInvoiceDetail(loadListInvoiceDetail);
        } catch (error) {}
    };

    const handleApprove = async (id) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        console.log(requestOptions);
        await fetch(
            `${API}/order/admin_update_status/${id}?status=2`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((response) => {
                alert(response.msg);
            })
            .catch((error) => console.log(error));
    };

    const handleShip = async (id) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        console.log(requestOptions);
        await fetch(
            `${API}/order/admin_update_status/${id}?status=3`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((response) => alert(response.msg))
            .catch((error) => console.log(error));
    };

    const ViewButton = (props) => {
        if (props.status == 0) {
            return <p>Đã hủy</p>;
        } else if (props.status == 1) {
            return (
                <Button onClick={() => handleApprove(props.idInvoice)}>
                    Duyệt đơn
                </Button>
            );
        } else if (props.status == 2) {
            return (
                <Button onClick={() => handleShip(props.idInvoice)}>
                    Đang giao
                </Button>
            );
        } else if (props.status == 3) {
            return <p>Chờ xác nhận</p>;
        } else if (props.status == 4) {
            return <p>Hoàn thành</p>;
        }
    };
    console.log(status);

    return (
        <Card>
            <Card.Header>
                <h3>Invoice Management</h3>
            </Card.Header>
            <Card.Body>
                <Button
                    onClick={() => {
                        setStatus(1);
                    }}
                    variant="primary"
                >
                    Pending
                </Button>
                <Button
                    onClick={() => {
                        setStatus(2);
                    }}
                    variant="warning"
                >
                    Delivering
                </Button>
                <Button
                    onClick={() => {
                        setStatus(3);
                    }}
                    variant="info"
                >
                    Waiting for confirmation
                </Button>
                <Button
                    onClick={() => {
                        setStatus(0);
                    }}
                    variant="danger"
                >
                    Order is cancelled
                </Button>
                <Button
                    onClick={() => {
                        setStatus(4);
                    }}
                    variant="success"
                >
                    Completed
                </Button>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Phone number</th>
                            <th>Total</th>
                            <th>Recipient name</th>
                            <th>Address</th>
                            <th>Order date</th>
                            <th>Note</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listInvoice.map((item) => (
                            <tr key={item.id}>
                                <td>{item.user}</td>
                                <td>{item.phone}</td>
                                <td>{item.total}</td>
                                <td>{item.recipient}</td>
                                <td>{item.address}</td>
                                <td>{item.date}</td>
                                <td>{item.note}</td>
                                <td>
                                    <ViewButton
                                        idInvoice={item.id}
                                        status={item.status}
                                    />{" "}
                                </td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            fetchlistInvoiceDetail(item.id)
                                        }
                                    >
                                        Detail
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {viewDetail && <DetailInvoice value={listInvoiceDetail} />}
            </Card.Body>
        </Card>
    );
}

export default InvoiceManagement;
