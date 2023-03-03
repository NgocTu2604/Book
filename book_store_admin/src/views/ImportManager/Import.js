import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import AddImport from "./addImport";
import { API } from "views/constant";
function Import(props) {
    const [viewImport, setViewImport] = useState(true);
    const [listImport, setListImport] = useState([]);
    const [listImportHasImageAndName, setListImportHasImageAndName] = useState(
        [],
    );
    let totalImport = 0;

    const handleView = () => {
        setViewImport(true);
    };
    const handleClose = () => {
        setViewImport(false);
    };

    const addHandler = (data) => {
        const dataItem = {
            idBook: data.idBook,
            amount: data.amount,
            price: data.price,
            total: data.total,
        };
        setListImport([...listImport, dataItem]);
        setListImportHasImageAndName([...listImportHasImageAndName, data]);
    };

    const handleCreateNewImport = () => {
        const id = JSON.parse(localStorage.getItem("admin"))._id;
        const newDataImport = {
            idAdmin: id,
            total: totalImport,
            items: listImport,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDataImport),
        };
        console.log(requestOptions);
        fetch(`${API}/import/create`, requestOptions)
            .then((response) => alert("Create new import successfull"))
            .catch((error) => console.log(error));
    };

    return (
        <>
            
            <Button style={{
                                    marginLeft: "60px",
                                    
                                }} onClick={handleView} onClose={handleClose}>
                AddPurchase
            </Button>
            
            {viewImport && <AddImport onAdd={addHandler} />}
            <Table className="table-hover table-striped">
                <thead>
                    <tr>
                        <th className="border-0">Name</th>
                        <th className="border-0">Image</th>
                        <th className="border-0">Quatity</th>
                        <th className="border-0">Price</th>
                        <th className="border-0">To Price</th>
                    </tr>
                </thead>
                <tbody>
                    {listImportHasImageAndName &&
                        listImportHasImageAndName.map((item) => {
                            let total = item.price * item.amount;
                            totalImport += total;
                            return (
                                <tr key={item.idBook}>
                                    <td>{item.name}</td>
                                    <td>
                                        <img src={item.image} alt="" />
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.amount}</td>
                                    <td>{total}</td>
                                </tr>
                            );
                        })}
                    <tr>
                        <td colSpan={4}></td>
                        <td>
                            Total:{" "}
                            <span
                                style={{
                                    color: "red",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                }}
                            >
                                {totalImport}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Button onClick={handleCreateNewImport}>Add Purchase</Button>
            </div>
        </>
    );
}

export default Import;
