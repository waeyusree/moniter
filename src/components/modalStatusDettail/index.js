import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Nav, Navbar, Container, Card, Form, InputGroup, Row, Col, Button, Modal, Table} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

/** === config url === */
import conf from "../../config/env.conf.js";

// const Swal = require('sweetalert2')

const ModalStatusDettail = ({ datashow }) => {

    console.log(datashow)

    const [show, setShow] = useState(datashow);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
    <>
        {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
        </Button> */}

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>รายละเอียดสถานะ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            {/* <Button variant="primary">Understood</Button> */}
            </Modal.Footer>
        </Modal>
 
    </>
  );

}

export default ModalStatusDettail;