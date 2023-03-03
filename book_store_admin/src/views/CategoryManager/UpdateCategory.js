import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function UpdateCategory(props) {
    const [nameCategory, setNameCategory] = useState("");
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        setNameCategory(props.value.name);
    }, [props.value.name]);

    const categoryData = {
        name: nameCategory,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        props.onUpdate(categoryData, props.value.id);
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
                                                        onChange={(e) =>
                                                            setNameCategory(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="form-control validate"
                                                        value={nameCategory}
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
                                                Update Category
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

export default UpdateCategory;
