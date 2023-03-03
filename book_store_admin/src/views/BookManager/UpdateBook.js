import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { API } from "views/constant";

function UpdateBook(props) {
    const [reload, setReload] = useState(false);

    const [nameBook, setNameBook] = useState("");
    const [imageBook, setImageBook] = useState("");
    const [desBook, setDesBook] = useState("");
    const [price, setPrice] = useState("");

    const [listCate, setListCate] = useState(null);
    const [listAuthor, setListAuthor] = useState(null);
    const [listPublisher, setListPublisher] = useState(null);

    const [cate, setCate] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");

    // set default select option
    useEffect(() => {
        setCate(props.value.category._id);
    }, [props.value.category._id]);
    useEffect(() => {
        setAuthor(props.value.author._id);
    }, [props.value.author._id]);
    useEffect(() => {
        setPublisher(props.value.publisher._id);
    }, [props.value.publisher._id]);

    //set default text

    console.log(props.value);
    useEffect(() => {
        setNameBook(props.value.name);
    }, [props.value.name]);
    useEffect(() => {
        setDesBook(props.value.des);
    }, [props.value.des]);
    useEffect(() => {
        setPrice(props.value.price);
    }, [props.value.price]);

    //set default image
    useEffect(() => {
        setImageBook(props.value.image);
    }, [props.value.image]);

    const fetchlistHandler = async () => {
        const response = await fetch(`${API}/type`);
        if (!response.ok) {
            throw new Error("Something is wrong!");
        }
        const dataCate = await response.json();
        const loadListCateMeal = [];
        for (const key in dataCate) {
            loadListCateMeal.push({
                id: dataCate[key]._id,
                name: dataCate[key].name,
            });
        }
        setListCate(dataCate);

        const responseAuthor = await fetch(`${API}/author`);
        if (!responseAuthor.ok) {
            throw new Error("Something is wrong!");
        }
        const dataAuthor = await responseAuthor.json();
        const loadListAuthorMeal = [];
        for (const key in dataAuthor) {
            loadListAuthorMeal.push({
                id: dataAuthor[key]._id,
                name: dataAuthor[key].name,
            });
        }
        setListAuthor(dataAuthor);

        const responsePublisher = await fetch(`${API}/publisher`);
        if (!responsePublisher.ok) {
            throw new Error("Something is wrong!");
        }
        const dataPublisher = await responsePublisher.json();
        const loadListPublisherMeal = [];
        for (const key in dataPublisher) {
            loadListPublisherMeal.push({
                id: dataPublisher[key]._id,
                name: dataPublisher[key].name,
            });
        }
        setListPublisher(dataPublisher);
    };
    useEffect(() => {
        fetchlistHandler();
    }, []);

    const handleChangeImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        let formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${API}/api/upload_avatar`, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                setImageBook(res.url);
            })
            .catch((error) => console.log(error));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        let BookData = null;
        BookData = {
            name: nameBook,
            image: imageBook,
            price: price,
            description: desBook,
            idAuthor: author,
            idType: cate,
            idPublisher: publisher,
        };

        props.onUpdate(BookData, props.value.id);

        // props.onView();
    };

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
                                            <Button
                                                onClick={props.onClose}
                                                style={{ float: "rigth" }}
                                            >
                                                x
                                            </Button>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <h2 className="tm-block-title d-inline-block">
                                                    Update Book
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
                                                        type="text"
                                                        className="form-control validate"
                                                        value={nameBook}
                                                        onChange={(e) =>
                                                            setNameBook(
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Description</label>
                                                    <textarea
                                                        className="form-control validate"
                                                        rows="3"
                                                        required
                                                        value={desBook}
                                                        onChange={(e) =>
                                                            setDesBook(
                                                                e.target.value,
                                                            )
                                                        }
                                                    ></textarea>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                                                    <div className="custom-file mt-3 mb-3">
                                                        <img
                                                            src={imageBook}
                                                            alt=""
                                                        />
                                                        <input
                                                            id="fileInput"
                                                            type="file"
                                                            onChange={
                                                                handleChangeImage
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Category</label>
                                                    <select
                                                        value={cate}
                                                        onChange={(e) =>
                                                            setCate(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="custom-select tm-select-accounts"
                                                    >
                                                        {" "}
                                                        <option></option>
                                                        {listCate &&
                                                            listCate.map(
                                                                (item) => (
                                                                    <option
                                                                        key={
                                                                            item._id
                                                                        }
                                                                        value={
                                                                            item._id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                    </select>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Author</label>
                                                    <select
                                                        value={author}
                                                        className="custom-select tm-select-accounts"
                                                        onChange={(e) =>
                                                            setAuthor(
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        <option selected="selected"></option>
                                                        {listAuthor &&
                                                            listAuthor.map(
                                                                (item) => (
                                                                    <option
                                                                        key={
                                                                            item._id
                                                                        }
                                                                        value={
                                                                            item._id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                    </select>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Publisher</label>
                                                    <select
                                                        className="custom-select tm-select-accounts"
                                                        value={publisher}
                                                        onChange={(e) =>
                                                            setPublisher(
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        <option selected="selected"></option>
                                                        {listPublisher &&
                                                            listPublisher.map(
                                                                (item) => (
                                                                    <option
                                                                        key={
                                                                            item._id
                                                                        }
                                                                        selected
                                                                        value={
                                                                            item._id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                    </select>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                        <label>
                                                            Price (.000vnđ)
                                                        </label>
                                                        <input
                                                            value={price}
                                                            onChange={(e) =>
                                                                setPrice(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            className="form-control validate"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl- col-lg-6 col-md-12">
                                            <button
                                                type="submit"
                                                value="add"
                                                className="btn btn-primary btn-block text-uppercase"
                                            >
                                                Update Now
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

export default UpdateBook;
