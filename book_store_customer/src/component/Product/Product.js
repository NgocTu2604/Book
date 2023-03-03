import React, { useEffect, useState, useCallback } from "react";
import Pagination from 'react-bootstrap/Pagination';
import ProductItem from "./ProductItem"
import Header from "../UI/Header/Header";
import {API} from "../../constant.js"

function Product(props) {

    const [listBook, setListBook] = useState([]);
    const [pagination, setPagination] = useState(1);
    const [filterCategory, setFilterCatgory] = useState('');
    const [searchInput, setSearchInput] = useState('');


    let active = 1;
    let items = [];
    for (let number = 1; number <= 3; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={()=>setPagination(number)}>
        {number}
        </Pagination.Item>,
    );
    }



    const fetchlistBookHandler = useCallback(async () => {
        try {
            const response = await fetch(
                `${API}/book?page=${pagination}&type=${filterCategory}&search=${searchInput}`,
            );
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadList = [];
            console.log(data);
            for (const key in data) {
                loadList.push({
                    id: data[key]._id,
                    name: data[key].name,
                    image: data[key].image,
                    price: data[key].price,
                    des: data[key].description,
                    inventory: data[key].qty
                });
            }
            
            setListBook(loadList);
        } catch (error) {
            console.log(error);
        }
    }, [pagination, filterCategory, searchInput]);
    useEffect(() => {
        fetchlistBookHandler();
        
    }, [pagination, filterCategory,searchInput, fetchlistBookHandler]); 

    const [listCategory, setCategoryBook] = useState([]);
    const fetchlistCategoryBookHandler = useCallback(async () => {
        try {
            const response = await fetch(
                `${API}/type`,
            );
            if (!response.ok) {
                throw new Error("Something is wrong!");
            }
            const data = await response.json();
            const loadListCate = [];
            console.log(data);
            for (const key in data) {
                loadListCate.push({
                    id: data[key]._id,
                    name: data[key].name,
                    slug:data[key].slug
                });
            }
            
            setCategoryBook(loadListCate);
        } catch (error) {
        }
    }, []);
    useEffect(() => {
        fetchlistCategoryBookHandler();
        
    }, [fetchlistCategoryBookHandler]); 

    const handleSearch = (data)=>{
        console.log(data);
        setSearchInput(data);
    }

    console.log(listBook);

    return (
        <div>
            <Header onSearch = {handleSearch}/>
            <div className="content">
                <div className="category">
                    <ul className="category_list">
                        <li className="category_items category_title"><i className="fa-solid fa-bars"></i> Danh mục sách</li>
                        <li className="category_items underline" onClick={()=>setFilterCatgory('')} >Tất cả</li>
                        {listCategory.map((item) => (
                            <li key={item.id} onClick = {()=>setFilterCatgory(item.slug)} className="category_items underline">
                               {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="list_product-wrap">
                    <ul className="list-product list-product2">
                        
                        {listBook.map((item) => {
                            return(
                                <ProductItem item = {item} />
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div  style={{display:"flex", alignItems:"center", justifyContent:"center", marginLeft:"330px"}}><Pagination size = "lg">{items}</Pagination></div>
        </div>
    );
}

export default Product;
