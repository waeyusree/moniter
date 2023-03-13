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

    const [projectId, setProjectId]         = useState("");
    const [machineName, setMachineName]     = useState("");
    const [dutyId, setDutyId]               = useState("");
    const [publicIp, setPublicIp]           = useState("");
    const [privateIp, setPrivateIp]         = useState("");
    const [service, setService]             = useState("");
    const [remark, setRemark]               = useState("");

    // Load data from server and reinitialize student form
    useEffect(() => {
      Axios
        .get(
          "http://localhost:3001/hostId/" 
          + id
        )
        .then((response) => {

          // console.log(response);

          setProjectId(response.data[0].project_id);
          setMachineName(response.data[0].machine_name);
          setDutyId(response.data[0].duty_id);
          setPublicIp(response.data[0].public_ip);
          setPrivateIp(response.data[0].private_ip);
          setService(response.data[0].port);
          setRemark(response.data[0].remark);

          // const { name, email, rollno } = response.data;
          // setFormValues({ name, email, rollno });
        })
        .catch((err) => console.log(err));
    }, []);

    const updateHost = () => {
        Axios.put('http://localhost:3001/host/update', {
          id: id,
          projectId: projectId,
          machineName: machineName,
          dutyId: dutyId,
          publicIp: publicIp,
          privateIp: privateIp,
          service: service,
          remark: remark
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
          <h3>แก้ไข Host/Server</h3>

            {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalNameProject">
          <Form.Label column sm={2}>
          ชื่อโครงงาน
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="ชื่อโครงงาน" value={projectId} onChange={(event) => { setProjectId(event.target.value) }}/>
              </Col>
          </Form.Group> */}

          <Form.Control type="hidden" placeholder="ชื่อโครงงาน" value={projectId} onChange={(event) => { setProjectId(event.target.value) }}/>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalNameSystem">
          <Form.Label column sm={2}>
              ชื่อเครื่อง
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="ชื่อเครื่อง" value={machineName} onChange={(event) => { setMachineName(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalDutyId">
          <Form.Label column sm={2}>
              หน้าที่
          </Form.Label>
          <Col sm={10}>
              {/* <Form.Control type="text" placeholder="หน้าที่" value={dutyId} onChange={(event) => { setDutyId(event.target.value) }}/> */}
              
              <Form.Select aria-label="Default select example" onChange={(event) => { setDutyId(event.target.value) }}>
                <option>--- เลือก ---</option>
                <option value="1">Web</option>
                <option value="2">API</option>
                <option value="3">Database</option>
              </Form.Select>
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

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalService">
          <Form.Label column sm={2}>
              Service/Port
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="Service/Port" value={service} onChange={(event) => { setService(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalRemark">
          <Form.Label column sm={2}>
              Remark
          </Form.Label>
          <Col sm={10}>
              <Form.Control as="textarea" rows={3} placeholder="Remark" value={remark} onChange={(event) => { setRemark(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button onClick={updateHost}>แก้ไข</Button>
            </Col>
          </Form.Group>
        
        </Form>

        <hr />

        <Link to={"/project-detail/" + projectId }>
            <Button variant="primary">กลับ</Button>
        </Link>
      </>
    );

}

export default HostEdit;
