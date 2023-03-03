import React, { useCallback, useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import Header from '../UI/Header/Header';
import {API} from "../../constant.js"

const AuthorList = () => {
const [listAuthor, setListAuthor] = useState([]);



const fetchlistAuthorHandler = useCallback(async () => {
    try {
        const response = await fetch(
            `${API}/author`,
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
                image:data[key].image,
                des: data[key].description,
                slug:data[key].slug
            });
        }
        
        setListAuthor(loadList);
    } catch (error) {
    }
}, []);
useEffect(() => {
    fetchlistAuthorHandler();
}, [fetchlistAuthorHandler]); 

return (
    <div>
        <Header/>
        <ListGroup>
      {listAuthor.map(author => (
        <ListGroupItem key={author.name}>
          <div  > 
            <h3>{author.name}</h3>
            <Image src={author.image} thumbnail />
            <p>{author.des}</p>
            
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
    </div>
)
    
};

export default AuthorList;