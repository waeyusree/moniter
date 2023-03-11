import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Nav, Navbar, Container, Form, Row, Col, Button, Table} from 'react-bootstrap';
import { Link } from "react-router-dom";

const Swal = require('sweetalert2')

const HostCreate = () => {

    // useEffect(() => {
      
    // }, []);

    const [nameProject, setNameProject]     = useState("");
    const [nameSystem, setNameSystem]       = useState("");
    const [publicIp, setPublicIp]           = useState("");
    const [privateIp, setPrivateIp]         = useState("");

    const addHost = () => {
        Axios.post('http://localhost:3001/add', {
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

            setNameProject("");
            setNameSystem("");
            setPublicIp("");
            setPrivateIp("");

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
      
            {/* <fieldset>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column sm={2}>
                  Radios
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="first radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="radio"
                    label="second radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                  <Form.Check
                    type="radio"
                    label="third radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
              </Form.Group>
            </fieldset> */}

            {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check label="Remember me" />
              </Col>
            </Form.Group> */}

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button onClick={addHost}>บันทึก</Button>
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

export default HostCreate;
