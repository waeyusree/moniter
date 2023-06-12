// import logo from './logo.svg';
import bg from './wave.png';
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

import HostCreate from "./components/host/create";
import HostEdit from "./components/host/edit";
import HostList from "./components/host/dataList";
import HostHistory from "./components/host/history";

import Login from "./components/login";

function App() {

  function logout(){
    sessionStorage.removeItem("accessToken");
    window.location.href = "/";
  }

  // sessionStorage.setItem('accessToken', '1234');
  // sessionStorage.removeItem("accessToken");

  const token = sessionStorage.getItem('accessToken');
  // console.log(token);

  if(!token) {
    return (
      <>
        {/* <div style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',  width: '100vw', height: '100vh'}}> */}
        <div className="bg-login">
        <Router>
        <Container>
            <Row>
              <Col md={12}>
                <Login />
              </Col>
            </Row>
          </Container>
        </Router>
        </div>
      </>
    )
  }

  return (
    <>
      <Router>
        <div className="App">
          <header className="App-header">
            {/* <Navbar bg="dark" variant="dark"> */}
            <Navbar className="bg-navbar">
              <Container>
                <Navbar.Brand>
                  <Link to={"#"} 
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

                  { token && 
                  <Nav>
                    <Link to="##" onClick={logout}
                      className="nav-link">
                      | ออกจากระบบ
                    </Link>
                  </Nav>
                  }
                  
                </Nav>
              </Container>
            </Navbar>
          </header>
    
          <Container>
            <Row>
              <Col md={12}>
                <div className="wrapper">
                  <Routes>

                    <Route path="/project-list" element={<ProjectList/>} />
                    <Route path="/project-create" element={<ProjectCreate/>} />
                    <Route path="/project-edit/:id" element={<ProjectEdit/>} />
                    <Route path="/project-detail/:id" element={<HostList/>} />
                    <Route path="/project-host-create/:id" element={<HostCreate/>} />

                    <Route path="/host-list" element={<HostList/>} />
                    <Route path="/host-create" element={<HostCreate/>} />
                    <Route path="/host-edit/:id" element={<HostEdit/>} />
                    <Route path="/host-history/:id" element={<HostHistory/>} />

                  </Routes>
                </div>
              </Col>
            </Row>
          </Container>

        </div>
      </Router>
    </>
  );

}

export default App;
