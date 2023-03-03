import React, { useCallback, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

function InvoiceDetail(props) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>nameBook</th>
                    <th>imageBook</th>
                    <th>quatity</th>
                    <th>price</th>
                </tr>
            </thead>
            <tbody>
                {props.value.map((item) => (
                    <tr key={item.id}>
                        <td>{item.nameBook}</td>
                        <td>
                            <img src={item.imageBook} alt="" />
                        </td>
                        <td>{item.amount}</td>
                        <td>{item.price}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default InvoiceDetail;
