import React, { useState } from "react";
import Register from "./Register/Register";
import Login from "./Login/Login";

function Form(props) {
    let classes = "login_form ";
    if (props.onVisible) {
        classes += "open";
    }
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [isRegisterForm, setIsRegisterForm] = useState(false)

    const handleDisplayLoginForm = () =>{
        setIsLoginForm(true);
        setIsRegisterForm(false);
    } 
    function handleDisplayRegisterForm(){
        setIsRegisterForm(true);
        setIsLoginForm(false);
    }

    const handleCloseOnLayer = (e) =>{
        e.stopPropagation();
    }

    return (
        <div className={classes} onClick={props.onClose}>
            <div className="login_form-layer"  >
                <div className="login_form-container" onClick = {handleCloseOnLayer}>
                    <div className="form_login-img">
                        <i
                            onClick={props.onClose}
                            className="form_login-back fa-solid fa-chevron-left"
                        ></i>
                        <img
                            src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg"
                            alt=""
                        />
                    </div>
                    <div className="login-form-header">
                        <div className="login-form-header-top">
                            <h3 onClick={handleDisplayLoginForm} className="login_text">Đăng nhập</h3>
                            <h3 onClick = {handleDisplayRegisterForm} className="register_text">Đăng ký</h3>
                        </div>

                            {isLoginForm && <Login onClose = {props.onClose}/>}
                            {isRegisterForm && <Register  onDisplayLogin= {handleDisplayLoginForm}/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
