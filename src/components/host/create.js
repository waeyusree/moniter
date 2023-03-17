import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Nav, Navbar, Container, Form, Row, Col, Button, Table} from 'react-bootstrap';
import { Link, useParams  } from "react-router-dom";

const Swal = require('sweetalert2')

const HostCreate = () => {

  const params = useParams()
  const id     = params.id;

  // useEffect(() => {
    
  // }, []);

  const [projectId, setProjectId]         = useState(id ? id : "");
  const [machineName, setMachineName]     = useState("");
  const [dutyId, setDutyId]               = useState("");
  const [publicIp, setPublicIp]           = useState("");
  const [privateIp, setPrivateIp]         = useState("");
  const [service, setService]             = useState("");
  const [remark, setRemark]               = useState("");

  const [showOptionDatabase, setShowOptionDatabase]   = useState(false);
  const [sqlTypeId, setSqlTypeId]     = useState("");
  const [username, setUsername]       = useState("");
  const [password, setPassword]       = useState("");
  const [myDatabase, setMyDatabase]       = useState("");

  const addHost = () => {
    const dataPost = {
      projectId: projectId,
      machineName: machineName,
      dutyId: dutyId,
      publicIp: publicIp,
      privateIp: privateIp,
      service: service,
      remark: remark
    };

    if(dutyId === '3') /** === เป็นชนิด database === */
    {
      dataPost.sqlTypeId = sqlTypeId;
      dataPost.username = username;
      dataPost.password = password;
      dataPost.myDatabase = myDatabase;
    }

    Axios.post('http://localhost:3001/host/add', dataPost).then((response) => {
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

        setProjectId("");
        setMachineName("");
        setDutyId("");
        setPublicIp("");
        setPrivateIp("");
        setService("");
        setRemark("");

        setSqlTypeId("");
        setUsername("");
        setPassword("");
        setMyDatabase("");

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

  const toggleOptionDatabase = (event) => {
    const value = event.target.value;
    if(value)
    {
      setDutyId(value);
      if(value === '3')
      {
        setShowOptionDatabase(true);
      }
      else
      {
        setShowOptionDatabase(false);

        setSqlTypeId("");
        setUsername("");
        setPassword("");
        setMyDatabase("");
      }
    }
  }

  return (
    <>
      <Form>
        <h3>เพิ่ม Host/Server</h3>

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
            
            <Form.Select aria-label="Default select example" value={dutyId} onChange={toggleOptionDatabase}> {/* onChange={(event) => { setDutyId(event.target.value) }} */}
              <option>--- เลือก ---</option>
              <option value="1">Web</option>
              <option value="2">API</option>
              <option value="3">Database</option> 
            </Form.Select>
        </Col>
        </Form.Group>

        { showOptionDatabase &&
          <div>
            <hr/>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalSqlTypeId">
              <Form.Label column sm={{ span: 2, offset: 2 }}>
                  ประเภท SQL
              </Form.Label>
              <Col sm={6}>
                  <Form.Select aria-label="Default select example" value={sqlTypeId} onChange={(event) => { setSqlTypeId(event.target.value) }}>
                    <option>--- เลือก ---</option>
                    <option value="1">MySQL</option>
                    {/* <option value="2">MongoDB</option> */}
                  </Form.Select>
              </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
              <Form.Label column sm={{ span: 2, offset: 2 }}>
                  Username
              </Form.Label>
              <Col sm={6}>
                  <Form.Control type="text" placeholder=" Username" value={username} onChange={(event) => { setUsername(event.target.value) }}/>
              </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
              <Form.Label column sm={{ span: 2, offset: 2 }}>
                  Password
              </Form.Label>
              <Col sm={6}>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }}/>
              </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formHorizontalDatabase">
              <Form.Label column sm={{ span: 2, offset: 2 }}>
                  Database
              </Form.Label>
              <Col sm={6}>
                  <Form.Control type="text" placeholder="Database" value={myDatabase} onChange={(event) => { setMyDatabase(event.target.value) }}/>
              </Col>
              </Form.Group>
            <hr/>
          </div>
        }

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

      <Link to={"/project-detail/" + id }>
          <Button variant="primary">กลับ</Button>
      </Link>
    </>
  );

}

export default HostCreate;
