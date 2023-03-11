// import logo from './logo.svg';
// import './App.css';

import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Container, Form, Row, Col, Button, Table} from 'react-bootstrap';

function App() {

  const [host, setHost]           = useState("");
  const [user, setUser]           = useState("");
  const [password, setPassword]  = useState("");
  const [database, setDatabase]   = useState("");

  const [hostList, setHostList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const getEmployee = () => {
    Axios.get('http://localhost:3001/employee').then((response) => {
      setEmployeeList(response.data);
    });
  };

  // === Host === //
  const getHost = () => {
    Axios.get('http://localhost:3001/hostList').then((response) => {
      setHostList(response.data);
    });
  };

  const addHost = () => {
    Axios.post('http://localhost:3001/add', {
      host: host,
      user: user,
      password: password,
      database: database
    }).then((response) => {

      setHostList([
        ...hostList,
        {
          Host: host,
          User: user,
          Password: password,
          My_database: database
        }
      ]);
     
    });
  };


  return (
  
    <div> { /* className="App" */ } 

      <Container>

        <Row>
          <br/>
        </Row>

        <Form>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalHost">
            <Form.Label column sm={2}>
              Host
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Host" onChange={(event) => { setHost(event.target.value) }}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalUser">
            <Form.Label column sm={2}>
              User
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="User" onChange={(event) => { setUser(event.target.value) }}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalDatabase">
            <Form.Label column sm={2}>
              Database
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Database" onChange={(event) => { setDatabase(event.target.value) }}/>
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
              <Button onClick={addHost}>Save</Button>
            </Col>
          </Form.Group>
        </Form>

      </Container>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <Container>
        <hr/>

        <br/>
        <Button variant="primary" onClick={getHost}>แสดงข้อมูล</Button>
        <Button variant="primary" style={{marginLeft: 20}}>ตรวจสอบ</Button>
        <br/>
        <br/>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>Host</th>
              <th>Database</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {hostList.map((host, key) => {
              return (
                <tr>
                  <td>{key+1}</td>
                  <td>{host.Host}</td>
                  <td>{host.My_database}</td>
                  <td >{host.Status}</td>
                </tr>
              )
            })}


            {/* <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr> */}

          </tbody>
        </Table>
      </Container>



    </div>
  );
}

export default App;
