import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';

function DetailImportView(props) {

    const value = props.value;
    console.log(value);
    return (
        <Container>
      <Row>
        <Col xs={6}>
          <h3>Store Name</h3>
          <p>123 Main Street</p>
          <p>Anytown, USA 12345</p>
        </Col>
        <Col xs={6}>
          <h3>Date: 01/01/2022</h3>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name Book</th>
            <th>Image Book</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {value.map((item)=>(
            <tr key = {item.id}>
                <td>{item.Book.name}</td>
                <td><img src={item.Book.image} alt="" /></td>
                <td>{item.amount}</td>
                <td>{item.price}</td>
                <td>{item.total}</td>
            </tr>
          ))}
          
        </tbody>
      </Table>
      <Row>
        <Col xs={6}>
          <h3>Total: $30.00</h3>
        </Col>
      </Row>
    </Container>
    );
}

export default DetailImportView;