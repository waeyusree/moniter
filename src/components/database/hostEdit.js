import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Nav, Navbar, Container, Form, Row, Col, Button, Table} from 'react-bootstrap';
import { Link, useParams  } from "react-router-dom";

const Swal = require('sweetalert2')

const HostEdit = () => {

  const params = useParams()
  const id     = params.id;

    // useEffect(() => {
      
    // }, []);

    const [nameProject, setNameProject]     = useState("");
    const [nameSystem, setNameSystem]       = useState("");
    const [publicIp, setPublicIp]           = useState("");
    const [privateIp, setPrivateIp]         = useState("");

    // Load data from server and reinitialize student form
    useEffect(() => {
      Axios
        .get(
          "http://localhost:3001/hostId/" 
          + id
        )
        .then((response) => {

          console.log(response);

          setNameProject(response.data[0].Name_project);
          setNameSystem(response.data[0].Name_system);
          setPublicIp(response.data[0].Public_ip);
          setPrivateIp(response.data[0].Private_ip);


          // const { name, email, rollno } = response.data;
          // setFormValues({ name, email, rollno });
        })
        .catch((err) => console.log(err));
    }, []);

    const updateHost = () => {
        Axios.put('http://localhost:3001/update', {
          id: id,
          nameProject: nameProject,
          nameSystem: nameSystem,
          publicIp: publicIp,
          privateIp: privateIp
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
          <h3>เพิ่ม Host/Server</h3>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalNameProject">
          <Form.Label column sm={2}>
          ชื่อโครงงาน
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="ชื่อโครงงาน" value={nameProject} onChange={(event) => { setNameProject(event.target.value) }}/>
              </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalNameSystem">
          <Form.Label column sm={2}>
              ชื่อระบบงาน
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="ชื่อระบบงาน" value={nameSystem} onChange={(event) => { setNameSystem(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPublicIp">
          <Form.Label column sm={2}>
              Public IP
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder=" Public IP" value={publicIp} onChange={(event) => { setPublicIp(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPrivateIp">
          <Form.Label column sm={2}>
          Private IP
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="Private IP" value={privateIp} onChange={(event) => { setPrivateIp(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button onClick={updateHost}>บันทึก</Button>
            </Col>
          </Form.Group>
        
        </Form>

        <hr />

        <Link to={"/host-list"}>
            <Button variant="primary">กลับ</Button>
        </Link>
      </>
    );

}

export default HostEdit;
