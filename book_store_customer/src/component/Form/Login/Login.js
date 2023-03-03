
import React, {useState } from "react";
import {API} from "../../../constant.js"

function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const submitHandler= async(e)=> {
        e.preventDefault(); 
        const data = {username: username, password: password};
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };

            await fetch(`${API}/user/login_customer`, requestOptions)
                .then(response => {
                    
                    console.log(response);
                    if(response.ok === false)
                    {
                        alert("Thong tin dang nhap khong chinh xac")
                    }
                    else{

                        return response.json()
                    }
                    
                })
                .then(rs=>{
                    if(rs === undefined)
                    {
                        return;
                    }
                    else{
                        localStorage.setItem("loginUser", JSON.stringify(rs));
                    }
                })
                .catch(error => console.log(error))
        
                props.onClose();
        }
    return (
        <form action="" onSubmit={submitHandler}>
            <div className="login_form-content">
                <div className="user_name">
                    <input type="text" placeholder="Tên đăng nhập" value= {username} onChange ={(e)=> setUsername(e.target.value)} />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png"
                        alt="a"
                    />
                </div>
                <div className="user_password">
                    <input type="password" name="" id="" placeholder="Mật khẩu" value= {password} onChange ={(e)=> setPassword(e.target.value)} />
                    <img
                        src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_password-512.png"
                        alt="a"
                    />
                </div>
                <div className="forgot_password">
                    <p>Quên mật khẩu?</p>
                </div>
                <button type="submit" className="login_submit" >ĐĂNG NHẬP</button>
                <p>Hoặc</p>
                <div className="login_social">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                        alt="a"
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png"
                        alt="a"
                    />
                    <img
                        src="https://banner2.cleanpng.com/20180406/jpq/kisspng-linkedin-logo-computer-icons-comcast-business-get-started-now-button-5ac6f544698595.9898331815229883564322.jpg"
                        alt="a"
                    />
                </div>
            </div>
        </form>
    );
}

export default Login;
