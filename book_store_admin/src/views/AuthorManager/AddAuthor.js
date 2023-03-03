import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { API } from "views/constant";

function AddAuthor(props) {
    const [nameAuthor, setNameAuthor] = useState("");
    const [DesAuthor, setDesAuthor] = useState("");
    const [image, setImage] = useState("");

    const handleChangeImage = useCallback(async (e) => {
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
                setImage(res.url);
            })
            .catch((error) => console.log(error));
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = { name: nameAuthor, image: image, description: DesAuthor };
        props.onAdd(data);
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
                                            <Button onClick={props.onClose}>
                                                x
                                            </Button>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <h2 className="tm-block-title d-inline-block">
                                                    Add New Author
                                                </h2>
                                            </div>
                                        </div>

                                        <div
                                            className="row tm-edit-product-row"
                                            style={{ width: "80%" }}
                                        >
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="form-group mb-3">
                                                    <label>Author name</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) =>
                                                            setNameAuthor(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="form-control validate"
                                                        value={nameAuthor}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                                            <div className="custom-file mt-3 mb-3">
                                                <span>Image Author</span>
                                                <img src={image} alt="" />
                                                <input
                                                    id="fileInput"
                                                    name="file"
                                                    type="file"
                                                    onChange={handleChangeImage}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="row tm-edit-product-row"
                                            style={{ width: "80%" }}
                                        >
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="form-group mb-3">
                                                    <label>Description</label>
                                                    <textarea
                                                        className="form-control validate"
                                                        onChange={(e) =>
                                                            setDesAuthor(
                                                                e.target.value,
                                                            )
                                                        }
                                                        rows="3"
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl- col-lg-6 col-md-12">
                                            <button
                                                type="submit"
                                                value="add"
                                                className="btn btn-primary btn-block text-uppercase"
                                            >
                                                Add New Author
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

export default AddAuthor;
