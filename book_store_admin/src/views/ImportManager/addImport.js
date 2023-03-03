import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { API } from "views/constant";

function AddImport(props) {
    const [nameCategory, setNameCategory] = useState("");
    const [bookValue, setBookValue] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const categoryData = {
        name: nameCategory,
    };

    const fetchListUser = useCallback(async () => {
        const response = await fetch(`${API}/book?page=&search=&type=&author=`);
        if (!response.ok) {
            throw new Error("Something is wrong!");
        }
        const data = await response.json();
        console.log(data);
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

        setBookValue(loadListBook);
    }, []);
    useEffect(() => {
        fetchListUser();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const newListBook = bookValue;

        const objIndex = newListBook.findIndex(
            (item) => item.name == inputValue,
        );
        if (objIndex != -1) {
            const data = {
                idBook: newListBook[objIndex].id,
                amount: amount,
                price: price,
                total: parseInt(amount) * parseInt(price),
                image: newListBook[objIndex].image,
                name: newListBook[objIndex].name,
            };
            props.onAdd(data);
        }
        setInputValue("");
    };

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    return (
        <div>
            <div>
                <form className="formAddMeals" onSubmit={submitHandler}>
                    <div className="container tm-mt-big tm-mb-big">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mx-auto">
                                <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                                    <div
                                        className="card"
                                        style={{
                                            width: "100%",
                                            padding: "40px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "end",
                                            }}
                                        >
                                            <Button onClick={props.onClose}>
                                                x
                                            </Button>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <h2 className="tm-block-title d-inline-block">
                                                    Add New Import
                                                </h2>
                                            </div>
                                        </div>
                                        <div
                                            className="row tm-edit-product-row"
                                            style={{ width: "80%" }}
                                        >
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="form-group mb-3">
                                                    <label>Book name</label>

                                                    <input
                                                        list="data"
                                                        name="myInput"
                                                        id="myInput"
                                                        value={inputValue}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />

                                                    <datalist id="data">
                                                        {bookValue.map(
                                                            (item, key) => (
                                                                <option
                                                                    key={key}
                                                                    value={
                                                                        item.name
                                                                    }
                                                                >
                                                                    {
                                                                        item
                                                                            .author
                                                                            .name
                                                                    }{" "}
                                                                </option>
                                                            ),
                                                        )}
                                                    </datalist>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Price</label>
                                                    <input
                                                        type="text"
                                                        className="form-control validate"
                                                        value={price}
                                                        onChange={(e) =>
                                                            setPrice(
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>amount</label>
                                                    <input
                                                        type="number"
                                                        className="form-control validate"
                                                        value={amount}
                                                        onChange={(e) =>
                                                            setAmount(
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl- col-lg-6 col-md-12">
                                            <button
                                                type="submit"
                                                value="add"
                                                className="btn btn-primary btn-block text-uppercase"
                                            >
                                                Add new book import
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddImport;
