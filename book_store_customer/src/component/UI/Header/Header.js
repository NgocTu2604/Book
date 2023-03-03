import React from 'react';
import classes from "./Header.module.css"
import {Link} from "react-router-dom"
import { useState } from 'react';
import Form from '../../Form/Form';
import CartButton from '../../Cart/CartButton';
import { Button } from 'react-bootstrap';

function Header(props) {
    const [isVisibleLoginForm, setisVisibleLoginForm] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    let nameLogin;

    function handleDisplayLogin () {
        setisVisibleLoginForm(true);
    }
    function handleCloseLoginForm() {
        setisVisibleLoginForm(false)
    }

    const handleSearch = () =>{
        props.onSearch(searchInput);
    }
    let loginValue;
    if (localStorage.getItem('loginUser') && localStorage.getItem('loginUser') !== undefined && localStorage.getItem('loginUser') !== null) {
        loginValue = JSON.parse(localStorage.getItem('loginUser'));
        nameLogin = loginValue.name;
    }
    const handleLogout = () =>{
        setisVisibleLoginForm(true);
        localStorage.removeItem("loginUser");
    }

    return (
            <div>
            <div className={classes["header"]}>
            <div className={classes["header_info"]}>
                <div className={classes["header_gmail"]}>
                    <p>Congchuong321@gmail.com</p>
                    <p>0987654321</p>
                </div>
                <div className={classes["header_social"]}>
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-instagram-square"></i>
                    <i className="fa-brands fa-twitter"></i>
                </div>
            </div>
            <div className={classes["logo"]}>
                <h1>CONGCHUONG</h1>
                <div className={classes["search"]}>
                    <select className={classes["find"]} name="TenDanhSach">
                        <option>Tất cả</option>
                        <option>Sách bán chạy</option>
                        <option>Sách luyện thi</option>
                        <option>Sách tham khảo</option>
                    </select>
                    <input onChange={(e)=>setSearchInput(e.target.value)} type="text" name="" className={classes["txt_search"]} id="" placeholder="Nhập từ khóa tìm kiếm"/>
                    <button onClick={handleSearch}>Tìm kiếm</button>
                </div>
                {nameLogin ? <div style={{display:"flex", marginLeft:"8px"}}><h4 style={{width:"120px"}}>{nameLogin}</h4><Button onClick={handleLogout} variant="outlined">Logout</Button></div>: <div onClick={handleDisplayLogin} className={classes["login"]}>
                                <i className="fa-solid fa-right-to-bracket"></i>
                                <p>Đăng nhập</p>
                            </div>}
                
            </div>
        </div>
        <div className={classes["header_nav"]}>
            <div className={classes["header_nav-wrap"]}>
                <ul className={classes["header_nav-list"]}>
                    <li> <Link to="/">Trang chủ</Link></li>
                    <li> <Link to="/product">Sản phẩm</Link></li>
                    <li> <Link to="/author">Tác giả</Link></li>
                    <li> <Link to="/sale">Quà tặng</Link> </li>
                    <li> <Link to="/aboutus">Về chúng tôi</Link></li>
                    <li> <Link to="/contact">Liên hệ</Link></li>
                    <li> <Link to="/myinvoice">Đơn hàng của tôi</Link></li>
                    <li> <Link to="">Khác</Link></li>
                </ul>
                <CartButton/>
            </div>
        </div>
        {isVisibleLoginForm && <Form  onVisible = {isVisibleLoginForm} onClose = {handleCloseLoginForm}/>}

        </div>
    );
}

export default Header;