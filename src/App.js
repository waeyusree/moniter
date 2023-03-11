// import logo from './logo.svg';
import './App.css';

import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Nav, Navbar, Container, Form, Row, Col, Button, Table} from 'react-bootstrap';

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Component
import ProjectList from "./components/project/dataList";
import ProjectCreate from "./components/project/create";
import ProjectEdit from "./components/project/edit";

// import HostCreate from "./components/hostCreate";
// import HostEdit from "./components/hostEdit";
// import HostList from "./components/hostList";

import HostCreate from "./components/host/create";
import HostEdit from "./components/host/edit";
import HostList from "./components/host/dataList";

import DatabasetList from "./components/database/dataList";
import DatabaseList from "./components/database/create";

function App() {

  const [nameProject, setNameProject]     = useState("");
  const [nameSystem, setNameSystem]       = useState("");
  const [publicIp, setPublicIp]           = useState("");
  const [privateIp, setPrivateIp]         = useState("");

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
  const checkHost = () => {
    Axios.get('http://localhost:3001/check_host').then((response) => {

      console.log(response.data.dataList)

      if(response.data.status === 200)
      {
        setHostList(response.data.dataList);
      }

    });
  };

  // const getHost = () => {
  //   Axios.get('http://localhost:3001/hostList').then((response) => {
  //     setHostList(response.data);
  //   });
  // };

  const addHost = () => {
    Axios.post('http://localhost:3001/add', {
      nameProject: nameProject,
      nameSystem: nameSystem,
      publicIp: publicIp,
      privateIp: privateIp
    }).then((response) => {

      if(nameProject !== '' && nameSystem !== '' && publicIp !== '' && privateIp !== '')
      {
        setHostList([
          ...hostList,
          {
            Name_project: nameProject,
            Name_system: nameSystem,
            Public_ip: publicIp,
            Private_ip: privateIp,
            Status: '0'
          }
        ]);

        setNameProject("");
        setNameSystem("");
        setPublicIp("");
        setPrivateIp("");

      }

    });
  };

  // Load data from server host
  // useEffect(() => {
  //   Axios
  //     .get('http://localhost:3001/hostList')
  //     .then((response) => {
  //       setHostList(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // return (
  
  //   <div> { /* className="App" */ } 

  //     <Container>

  //       <Row>
  //         <br/>
  //         <br/>
  //       </Row>

  //       <h3>เพิ่ม Host/Server</h3>

  //       <Form>

  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalNameProject">
  //           <Form.Label column sm={2}>
  //             ชื่อโครงงาน
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="text" placeholder="ชื่อโครงงาน" value={nameProject} onChange={(event) => { setNameProject(event.target.value) }}/>
  //           </Col>
  //         </Form.Group>

  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalNameSystem">
  //           <Form.Label column sm={2}>
  //             ชื่อระบบงาน
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="text" placeholder="ชื่อระบบงาน" value={nameSystem} onChange={(event) => { setNameSystem(event.target.value) }}/>
  //           </Col>
  //         </Form.Group>

  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalPublicIp">
  //           <Form.Label column sm={2}>
  //             Public IP
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="text" placeholder=" Public IP" value={publicIp} onChange={(event) => { setPublicIp(event.target.value) }}/>
  //           </Col>
  //         </Form.Group>

  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalPrivateIp">
  //           <Form.Label column sm={2}>
  //           Private IP
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="text" placeholder="Private IP" value={privateIp} onChange={(event) => { setPrivateIp(event.target.value) }}/>
  //           </Col>
  //         </Form.Group>
        
  //         {/* <fieldset>
  //           <Form.Group as={Row} className="mb-3">
  //             <Form.Label as="legend" column sm={2}>
  //               Radios
  //             </Form.Label>
  //             <Col sm={10}>
  //               <Form.Check
  //                 type="radio"
  //                 label="first radio"
  //                 name="formHorizontalRadios"
  //                 id="formHorizontalRadios1"
  //               />
  //               <Form.Check
  //                 type="radio"
  //                 label="second radio"
  //                 name="formHorizontalRadios"
  //                 id="formHorizontalRadios2"
  //               />
  //               <Form.Check
  //                 type="radio"
  //                 label="third radio"
  //                 name="formHorizontalRadios"
  //                 id="formHorizontalRadios3"
  //               />
  //             </Col>
  //           </Form.Group>
  //         </fieldset> */}

  //         {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
  //           <Col sm={{ span: 10, offset: 2 }}>
  //             <Form.Check label="Remember me" />
  //           </Col>
  //         </Form.Group> */}

  //         <Form.Group as={Row} className="mb-3">
  //           <Col sm={{ span: 10, offset: 2 }}>
  //             <Button onClick={addHost}>บันทึก</Button>
  //           </Col>
  //         </Form.Group>
  //       </Form>

  //     </Container>

  //     {/* <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header> */}

  //     <Container>
  //       <hr/>

  //       <h3>รายการ Host/Server</h3>

  //       <br/>
  //       {/* <Button variant="primary" onClick={getHost}>แสดงข้อมูล</Button> */}
  //       <Button variant="primary" style={{marginLeft: 20}} onClick={checkHost}>ตรวจสอบ</Button>
  //       <br/>
  //       <br/>

  //       <Table striped bordered hover>
  //         <thead>
  //           <tr>
  //             <th>ลำดับ</th>
  //             <th>ชื่อระบบงาน</th>
  //             <th>ชื่อระบบงาน</th>
  //             <th>Public IP</th>
  //             <th>Private IP</th>
  //             <th>Status</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {hostList.map((host, key) => {

  //             var text_color = 'red';
  //             if(host.Status == '200' || host.Status == '302')
  //             {
  //               text_color = 'black';
  //             }

  //             return (
  //               <tr>
  //                 <td>{key+1}</td>
  //                 <td>{host.Name_project}</td>
  //                 <td>{host.Name_system}</td>
  //                 <td>{host.Public_ip}</td>
  //                 <td>{host.Private_ip}</td>
  //                 <td style={{color :  text_color, textAlign: 'center', fontWeight: 600}}>{host.Status}</td>
  //               </tr>
  //             )
  //           })}


  //           {/* <tr>
  //             <td>1</td>
  //             <td>Mark</td>
  //             <td>Otto</td>
  //             <td>@mdo</td>
  //           </tr>
  //           <tr>
  //             <td>2</td>
  //             <td>Jacob</td>
  //             <td>Thornton</td>
  //             <td>@fat</td>
  //           </tr>
  //           <tr>
  //             <td>3</td>
  //             <td colSpan={2}>Larry the Bird</td>
  //             <td>@twitter</td>
  //           </tr> */}

  //         </tbody>
  //       </Table>
  //     </Container>



  //   </div>
  // );

  return (
    <div>
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/"} 
                  className="nav-link">
                  Moniter
                </Link>
              </Navbar.Brand>
  
              <Nav className="justify-content-end">
                
                <Nav>
                  <Link to={"/project-list"}
                    className="nav-link">
                    โครงการ
                  </Link>
                </Nav>

                {/* <Nav>
                  <Link to={"/host-list"}
                    className="nav-link">
                    Host/Server
                  </Link>
                </Nav> */}

                {/* <Nav>
                  <Link to={"/database-list"} 
                    className="nav-link">
                    Database
                  </Link>
                </Nav> */}

                {/* <Nav>
                  <Link to="" 
                    className="nav-link">
                    API service
                  </Link>
                </Nav>
   */}
                {/* <Nav>
                  <Link to={"/student-list"} 
                    className="nav-link">
                    Student List
                  </Link>
                </Nav> */}
                
              </Nav>
            </Container>
          </Navbar>
        </header>
  
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  {/* <Route exact path="/" 
                    component={CreateStudent} />
                  <Route path="/edit-student/:id" 
                    component={EditStudent} /> */}

                  <Route path="/project-list" element={<ProjectList/>} />
                  <Route path="/project-create" element={<ProjectCreate/>} />
                  <Route path="/project-edit/:id" element={<ProjectEdit/>} />
                  <Route path="/project-detail/:id" element={<HostList/>} />
                  <Route path="/project-host-create/:id" element={<HostCreate/>} />

                  <Route path="/host-list" element={<HostList/>} />
                  <Route path="/host-create" element={<HostCreate/>} />
                  <Route path="/host-edit/:id" element={<HostEdit/>} />

                  <Route path="/database-list" element={<DatabasetList/>} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>

      </div>
    </Router>
    </div>
  );

}

export default App;
