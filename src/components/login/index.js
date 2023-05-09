import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Nav, Navbar, Container, Card, Form, InputGroup, Row, Col, Button, Table} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
// import { faUser} from '@fortawesome/free-regular-svg-icons'

/** === config url === */
import conf from "../../config/env.conf.js";

const Swal = require('sweetalert2')

const Login = () => {

  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else
    {
        // console.log('login')
        event.preventDefault();
        login();
    }

    setValidated(true);
  };

  function login(){
    const dataPost = {
        username: username,
        password: password,
      };
  
      Axios.post( conf.END_POINT_URL + '/login', dataPost).then((response) => {
        if(response.data.status === 200)
        {
            // console.log(response.data)
            localStorage.setItem('accessToken', response.data.token);

            // window.location.href = "/"; // หน้า home 
            window.location.href = "/project-list"; // หน้า project list

        //   Swal.fire({
        //     show: true,
        //     title: response.data.message,
        //     html: "<br/>",
        //     icon: 'success',
        //     showConfirmButton: false,
        //     width: 400,
        //   });
        }
        else
        {
          Swal.fire({
            show: true,
            title: response.data.message,
            html: "<br/>",
            icon: 'warning',
            showConfirmButton: false,
            width: 400,
          });
        }
  
      });
  }

  return (
    <>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Card style={{ width: '18rem', margin: 'auto', marginTop: 100 }}>
            <Card.Body>
                <Card.Title style={{textAlign: "center"}}>เข้าสู่ระบบ</Card.Title>

                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">
                                <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            onChange={(event) => { setUsername(event.target.value) }}
                            required
                            />
                            <Form.Control.Feedback type="invalid">
                            Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustomPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">
                                <FontAwesomeIcon icon={faLock} />
                            </InputGroup.Text>
                            
                            <Form.Control
                            type="text"
                            placeholder="Password"
                            aria-describedby="inputGroupPrepend"
                            onChange={(event) => { setPassword(event.target.value) }}
                            required
                            />
                            <Form.Control.Feedback type="invalid">
                            Please choose a password.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>

                <Row className="mb-3"> 
                    {/* <Form.Group className="mb-3" as={Col} md="12">
                        <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                        />
                    </Form.Group> */}

                    <Form.Group style={{textAlign: "center"}} as={Col} md="12" >
                        <Button type="submit">เข้าสู่ระบบ</Button>
                    </Form.Group>
                </Row>

                {/* <Card.Link href="#">สมัครสมาชิก</Card.Link> */}

            </Card.Body>
        </Card>
        </Form>

        {/* <hr />
        <Link to={"/project-detail/" + id }>
            <Button variant="primary">กลับ</Button>
        </Link> */}
    </>
  );

}

export default Login;