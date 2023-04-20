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

import HostCreate from "./components/host/create";
import HostEdit from "./components/host/edit";
import HostList from "./components/host/dataList";

import Login from "./components/login";

function App() {

  function logout(){
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  }

  // localStorage.setItem('accessToken', '1234');
  // localStorage.removeItem("accessToken");

  const token = localStorage.getItem('accessToken');
  // console.log(token);

  if(!token) {
    return (
      <>
        <Router>
        <Container>
            <Row>
              <Col md={12}>
                <Login />
              </Col>
            </Row>
          </Container>
        </Router>
      </>
    )
  }

  return (
    <>
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
