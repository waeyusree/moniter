import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Form, Row, Col, Button, InputGroup} from 'react-bootstrap';
import { Link, useParams  } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

/** === config url === */
import conf from "../../config/env.conf.js";

const Swal = require('sweetalert2')

const HostEdit = () => {

  const params = useParams()
  const id     = params.id;

    const [showPass, setShowPass]           = useState(false);
    const [typePassword,setTypePassword]    = useState("password");

    const [projectId, setProjectId]         = useState("");
    const [machineName, setMachineName]     = useState("");
    const [dutyId, setDutyId]               = useState("");
    const [ipTypeId, setIpTypeId]           = useState("1");
    const [publicIp, setPublicIp]           = useState("");
    const [privateIp, setPrivateIp]         = useState("");
    const [service, setService]             = useState("");
    const [remark, setRemark]               = useState("");

    const [showOptionDatabase, setShowOptionDatabase]   = useState(false);
    const [sqlTypeId, setSqlTypeId]     = useState("");
    const [username, setUsername]       = useState("");
    const [password, setPassword]       = useState("");
    const [myDatabase, setMyDatabase]   = useState("");

    const clientToken = sessionStorage.getItem('accessToken');
    const [dutyList, setDutyList] = useState([]);

    useEffect(() => {

      Axios
        .get(conf.END_POINT_URL + "/hostId/" + id)
        .then(({data}) => {

          // console.log(data);

          setDutyList(data.dutyList);

          setProjectId(data.hostDetail.project_id);
          setMachineName(data.hostDetail.machine_name);
          setDutyId(data.hostDetail.duty_id);
          setIpTypeId(data.hostDetail.ip_type_id);
          setPublicIp(data.hostDetail.public_ip);
          setPrivateIp(data.hostDetail.private_ip);
          setService(data.hostDetail.port);
          setRemark(data.hostDetail.remark);

          setSqlTypeId(data.hostDetail.sql_type_id);
          setUsername(data.hostDetail.username);
          setPassword(data.hostDetail.password);
          setMyDatabase(data.hostDetail.my_database);

          /** === เป็นชนิด database === */
          let resultDutyListObjNameToId   = data.dutyList.reduce((a, v) => ({ ...a, [v.duty_name]: v.id}), {}) ;
          if(
            data.hostDetail.duty_id === resultDutyListObjNameToId['DB(MySql)'] ||
            data.hostDetail.duty_id === resultDutyListObjNameToId['DB(SQLServer)'] 
            )
          {
            setShowOptionDatabase(true);
          }

          // const { name, email, rollno } = data.hostDetail;
          // setFormValues({ name, email, rollno });
        })
        .catch((error) => {
          console.log(error);
      });

    }, []);

    const updateHost = () => {
      const dataPost = {
        id: id,
        projectId: projectId,
        machineName: machineName,
        dutyId: dutyId,
        ipTypeId: ipTypeId,
        publicIp: publicIp,
        privateIp: privateIp,
        service: service,
        remark: remark
      };
  
      /** === database === */
      let resultDutyListObjNameToId   = dutyList.reduce((a, v) => ({ ...a, [v.duty_name]: v.id}), {}) ;
      if(
        parseInt(dutyId) === resultDutyListObjNameToId['DB(MySql)'] ||
        parseInt(dutyId) === resultDutyListObjNameToId['DB(SQLServer)'] 
        )
      {
        dataPost.sqlTypeId = sqlTypeId;
        dataPost.username = username;
        dataPost.password = password;
        dataPost.myDatabase = myDatabase;
      }

      // console.log(dataPost); 
      
      Axios.put( conf.END_POINT_URL + '/host/update', dataPost).then((response) => {

        if(response.data.status === 200)
        {
          Swal.fire({
            show: true,
            title: response.data.message,
            html: "<br/>",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: "ตกลง",
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
            showConfirmButton: true,
            confirmButtonText: "ตกลง",
            width: 400,
          });
        }

      });
    };

    const toggleOptionDatabase = (event) => {
      const value = event.target.value;
      const portDefault = event.target[event.target.selectedIndex].getAttribute("data-port-default");

      if(value)
      {
        setService(portDefault);
        setDutyId(value);

        if(value === '5' || value === '6')
        {
          setShowOptionDatabase(true);
        }
        else
        {
          setShowOptionDatabase(false);

          // setService("");
          setSqlTypeId("");
          setUsername("");
          setPassword("");
          setMyDatabase("");
        
        }
      }
    }

    /* === radio === */
    const handleChange = (event) => {
      // console.log(event.target.value);
      setIpTypeId(event.target.value);
    };


    const clickShowPass = (event) => {
      if(showPass === false)
      {
        setTypePassword("text")
        setShowPass(true);
      }
      else
      {
        setTypePassword("password")
        setShowPass(false);
      }
    };

    return (
      <>
        <Form>
          <h5>แก้ไข Host/Server</h5>

            {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalNameProject">
          <Form.Label column sm={2}>
          ชื่อโครงงาน <span style={{color: "red"}}> * </span>
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="ชื่อโครงงาน" value={projectId} onChange={(event) => { setProjectId(event.target.value) }}/>
              </Col>
          </Form.Group> */}

          <Form.Control type="hidden" placeholder="ชื่อโครงงาน" value={projectId ? projectId : ''} onChange={(event) => { setProjectId(event.target.value) }}/>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalNameSystem">
          <Form.Label column sm={2}>
              ชื่อเครื่อง <span style={{color: "red"}}> * </span>
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="ชื่อเครื่อง" value={machineName ? machineName : ''} onChange={(event) => { setMachineName(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalDutyId">
          <Form.Label column sm={2}>
              หน้าที่ <span style={{color: "red"}}> * </span>
          </Form.Label>
          <Col sm={10}>
              {/* <Form.Control type="text" placeholder="หน้าที่" value={dutyId} onChange={(event) => { setDutyId(event.target.value) }}/> */}
              
              <Form.Select aria-label="Default select example" value={dutyId ? dutyId : ''} onChange={toggleOptionDatabase}> {/* onChange={(event) => { setDutyId(event.target.value) }} */}
                <option value="">--- เลือก ---</option>
                {/* <option value="1">Web</option>
                <option value="2">API</option>
                <option value="3">Database</option> */}
                
                {dutyList.map((dutyDetail, index) => (
                    <option key={index} value={dutyDetail.id} data-port-default={dutyDetail.port_default}> 
                      {dutyDetail.duty_name} 
                    </option>
                ))}

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
                    <Form.Select aria-label="Default select example" value={sqlTypeId ? sqlTypeId : ''} onChange={(event) => { setSqlTypeId(event.target.value) }}>
                      <option value="">--- เลือก ---</option>
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
                    <Form.Control type="text" placeholder="Username" value={username ? username : ''} onChange={(event) => { setUsername(event.target.value) }}/>
                </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={{ span: 2, offset: 2 }}>
                    Password
                </Form.Label>
                <Col sm={6}>
                    <InputGroup>
                      <Form.Control type={typePassword} placeholder="Password" value={password ? password : ''} onChange={(event) => { setPassword(event.target.value) }}/>
                      <InputGroup.Text>
                          <FontAwesomeIcon onClick={clickShowPass} icon={showPass ? faEye : faEyeSlash } />
                      </InputGroup.Text>
                    </InputGroup>
                </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalDatabase">
                <Form.Label column sm={{ span: 2, offset: 2 }}>
                    Database
                </Form.Label>
                <Col sm={6}>
                    <Form.Control type="text" placeholder="Database" value={myDatabase ? myDatabase : ''} onChange={(event) => { setMyDatabase(event.target.value) }}/>
                </Col>
                </Form.Group>
              <hr/>
            </div>
          }

          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              ตรวจสอบโดยใช้ <span style={{color: "red"}}> * </span>
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Public IP"
                name="formHorizontalIpType"
                id="formHorizontalIpType1"
                value="1"
                checked={ipTypeId == "1"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Private IP"
                name="formHorizontalIpType"
                id="formHorizontalIpType2"
                value="2"
                checked={ipTypeId == "2"}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPublicIp">
          <Form.Label column sm={2}>
              Public IP
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder=" Public IP" value={publicIp ? publicIp : ''} onChange={(event) => { setPublicIp(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPrivateIp">
          <Form.Label column sm={2}>
            Private IP
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="Private IP" value={privateIp ? privateIp : ''} onChange={(event) => { setPrivateIp(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalService">
          <Form.Label column sm={2}>
              Service/Port
          </Form.Label>
          <Col sm={10}>
              <Form.Control type="text" placeholder="Service/Port" value={service ? service : ''} onChange={(event) => { setService(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalRemark">
          <Form.Label column sm={2}>
            หมายเหตุ เช่น spac เครื่อง
          </Form.Label>
          <Col sm={10}>
              <Form.Control as="textarea" rows={3} placeholder="หมายเหตุ เช่น spac เครื่อง" value={remark ? remark : ''} onChange={(event) => { setRemark(event.target.value) }}/>
          </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button onClick={updateHost}>บันทึก</Button>
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
