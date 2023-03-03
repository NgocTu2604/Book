import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function AddVoucher(props) {
    const [nameVoucher, setNameVoucher] = useState("");
    const [reducePrice, setreducePrice] = useState("");
    const [mile, setMile] = useState("");
    const [quatity, setQuatity] = useState("");
    const voucherData = {
        name: nameVoucher,
        reduce: reducePrice,
        qty: quatity,
        mile: mile,
    };

    const submitHandler = (e) => {
        e.preventDefault();
        props.onAdd(voucherData);
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
                                                    Add New Voucher
                                                </h2>
                                            </div>
                                        </div>
                                        <div
                                            className="row tm-edit-product-row"
                                            style={{ width: "80%" }}
                                        >
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="form-group mb-3">
                                                    <label>Voucher name</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) =>
                                                            setNameVoucher(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="form-control validate"
                                                        value={nameVoucher}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="row tm-edit-product-row"
                                            style={{ width: "80%" }}
                                        >
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="form-group mb-3">
                                                    <label>
                                                        Price sale (-VND)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) =>
                                                            setreducePrice(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="form-control validate"
                                                        value={reducePrice}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="row tm-edit-product-row"
                                            style={{ width: "80%" }}
                                        >
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="form-group mb-3">
                                                    <label>Amount</label>
                                                    <input
                                                        type="number"
                                                        onChange={(e) =>
                                                            setQuatity(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="form-control validate"
                                                        value={quatity}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="row tm-edit-product-row"
                                            style={{ width: "80%" }}
                                        >
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="form-group mb-3">
                                                    <label>Mile</label>
                                                    <input
                                                        type="number"
                                                        onChange={(e) =>
                                                            setMile(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="form-control validate"
                                                        value={mile}
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
                                                Add New Voucher
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

export default AddVoucher;
