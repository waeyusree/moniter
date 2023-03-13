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
