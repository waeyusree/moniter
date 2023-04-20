import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Nav, Navbar, Container, Form, Row, Col, Button, Table} from 'react-bootstrap';
import { Link } from "react-router-dom";

const Swal = require('sweetalert2')

const HostCreate = () => {

    // useEffect(() => {
      
    // }, []);

    const [name, setName]                       = useState("");
    const [conJob, setConJob]                   = useState("");
    const [tokenLineNotify, setTokenLineNotify] = useState("");

    const addProject = () => {
        Axios.post('http://localhost:3001/project/add', {
          name: name,
          conJob: conJob,
          tokenLineNotify: tokenLineNotify
        }).then((response) => {

          if(response.data.status === 200)
          {
            Swal.fire({
              show: true,
              title: response.data.message,
              html: "<br/>",
              icon: 'success',
              showConfirmButton: false,
              width: 400,
            });

            setName("");
            setConJob("");
            setTokenLineNotify("");

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
      };

    return (
      <>
        <Form>
          <h3>เพิ่มโครงการ</h3>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label column sm={2}>
          ชื่อโครงงาน
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="ชื่อโครงงาน" value={name} onChange={(event) => { setName(event.target.value) }}/>
              </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalConJob">
          <Form.Label column sm={2}>
              สรวจสอบทุกๆ(นาที่)
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="number" placeholder="สรวจสอบทุกๆ(นาที่)" value={conJob} onChange={(event) => { setConJob(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalTokenLineNotify">
          <Form.Label column sm={2}>
          Token line notify
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder=" Token line notify" value={tokenLineNotify} onChange={(event) => { setTokenLineNotify(event.target.value) }}/>
              </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button onClick={addProject}>บันทึก</Button>
            </Col>
          </Form.Group>
        
        </Form>

        <hr />

        <Link to={"/project-list"}>
            <Button variant="primary">กลับ</Button>
        </Link>
      </>
    );

}

export default HostCreate;
