import React, { useState } from "react";

function Register(props) {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rpPassword, setRpPassword] = useState('');

   

    const submitHandler = async(e) =>{
        e.preventDefault();
        if(rpPassword === password){

            const data = {
                name: fullName,
                email: email,
                username: username,
                password: password
            }
    
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };

            fetch('http://localhost:5000/user/register', requestOptions)
                .then(response => console.log(response))
                .catch(error => console.log(error))


            setFullName("");
            setEmail("");
            setUsername("");
            setPassword("");
            setRpPassword("");
            alert("Đăng ký thành công!")  
            props.onDisplayLogin();
        }
        else{
            alert("Mật khẩu nhập lại không chính xác!");
        }

    }

    return (
        <form action="" onSubmit={submitHandler}>
        <div className="register_form">
            <div className="user_name">
                <input type="text" placeholder="Họ tên" value={fullName} onChange={(e)=> setFullName(e.target.value)}/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png" alt="" />
            </div>
            
            <div className="user_name">
                <input type="email" placeholder="Gmail" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <img src="https://cdn.iconscout.com/icon/free/png-256/gmail-32-761667.png" alt=""/>
            </div>

            <div className="user_name">
                <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png" alt=""/>
            </div>
            <div className="user_password">
                <input type="password" placeholder="Mật khẩu" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <img src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_password-512.png" alt=""/>
            </div>
            <div className="user_password">
                <input type="password" placeholder="Nhập lại mật khẩu" value={rpPassword} onChange={(e)=> setRpPassword(e.target.value)}/>
                <img src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_password-512.png" alt=""/>
            </div>
            <button type="submit" className="login_submit" >ĐĂNG KÝ</button>
            <p>Hoặc</p>
            <div className="login_social">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                    alt=""
                />
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png"
                    alt=""
                />
                <img
                    src="https://banner2.cleanpng.com/20180406/jpq/kisspng-linkedin-logo-computer-icons-comcast-business-get-started-now-button-5ac6f544698595.9898331815229883564322.jpg"
                    alt=""
                />
            </div>
        </div>

        </form>
    );
}

export default Register;
