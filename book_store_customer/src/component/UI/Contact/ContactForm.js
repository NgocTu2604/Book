import React from 'react';
import { Form, Button } from 'react-bootstrap';// Import your custom CSS file
import Header from '../Header/Header';

const ContactForm = () => {
  return (
   <div>
    <Header/>
     <Form className="contact-form">
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" />
      </Form.Group>

      <Form.Group controlId="formMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows="3" placeholder="Enter your message" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
   </div>
  );
};

export default ContactForm;