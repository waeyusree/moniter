import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Moment from 'moment';
import { Col, Row, Form, Table, Button, Modal, ListGroup, Spinner, OverlayTrigger, Tooltip} from "react-bootstrap";
import { Link, useParams  } from "react-router-dom";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

// import ModalStatusDettail from "../../components/modalStatusDettail";

/** === config url === */
import conf from "../../config/env.conf.js";

const Swal = require('sweetalert2');

const DataList = () => {

    // const { SearchBar, ClearSearchButton } = Search;
    const params        = useParams()
    // const projectId     = params.id;
    const clientToken   = sessionStorage.getItem('accessToken');
 
    const [projectId, setProjectId]             = useState(params.id);
    const [projectList, setProjectList]         = useState([]);
    const [projectDetail, setProjectDetail]     = useState([]);
    const [hostList, setHostList]               = useState([]);
    const [isButton, setIsButton]               = useState(false);
    // const [dutyList, setDutyList]               = useState( sessionStorage.getItem('dutyList') ? sessionStorage.getItem('dutyList') : [] );
    const [dutyList, setDutyList]               = useState([]);

    const [isButtonProcess, setIsButtonProcess] = useState(false);

    const [show, setShow]                       = useState(false);
    const handleClose                           = () => setShow(false);
    const handleShow                            = () => setShow(true);

    const handleToggle                          = (e) => {
       
        const isChecked = e.target.checked;
        const dataPost  = {
            id : e.target.id
        };
   
        if(isChecked === true)
        {
            // console.log(true);
            e.target.setAttribute('defaultChecked', true);
            dataPost.isActive = '1';
        }

        if(isChecked === false)
        {
            // console.log(false);
            e.target.setAttribute('defaultChecked', false);
            dataPost.isActive = '0';
        }

        if(dataPost.isActive)
        {
            Axios.put( conf.END_POINT_URL + '/host/updateActive', dataPost).then((response) => {

                if(response.data.status === 200)
                {
                //   Swal.fire({
                //     show: true,
                //     title: response.data.message,
                //     html: "<br/>",
                //     icon: 'success',
                //     showConfirmButton: true,
                //     confirmButtonText: "ตกลง",
                //     width: 400,
                //   });
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
        }
    } 

    useMemo(() => {
        loadDataList(projectId);
    }, [isButtonProcess]);

    async function loadDataList(projectId){
        
        await Axios
        .get( conf.END_POINT_URL + "/project/detail/" + projectId, { 
            headers: {"x-access-token": clientToken}
        })
        .then(({ data }) => {
            setProjectList(data.projectList);
            setProjectDetail(data.projectDetail);
            setHostList(data.hostListByProjectId);

            if(dutyList)
            {
                const resultDutyListObjDutyName = data.dutyList.reduce((a, v) => ({ ...a, [v.id]: v.duty_name}), {}) ;
                if(resultDutyListObjDutyName)
                {
                    setDutyList(resultDutyListObjDutyName);
                    // sessionStorage.setItem('dutyList', resultDutyListObjDutyName);
                }
            }

            setIsButton(true);
        })
        .catch((error) => {
            console.log(error);

            if(error.response.status === 401)
            {
                sessionStorage.removeItem("accessToken");
                window.location.href = "/";
            }
        });

        /** ========= */
    }

    // console.log(dutyList)
    // console.log('555')

    // === Host === //
    const checkHost = () => {

        setIsButtonProcess(true);
        setIsButton(true);

        Axios
        .get( conf.END_POINT_URL + "/check_host/" + projectId, { 
            headers: {"x-access-token": clientToken}
        })
        .then(({data}) => {

            if(data.status === 200)
            {
                setTimeout( () => {
                    setIsButton(false);
                    setIsButtonProcess(false);
                }, 1000)
            }

        })
        .catch((error) => {
            console.log(error);

            if(error.response.status === 401)
            {
                sessionStorage.removeItem("accessToken");
                window.location.href = "/";
            }
        });
    };

    const exportHost = () => {
        Axios({
            url: conf.END_POINT_URL + '/export_host/' + projectId, //your url
            method: 'GET',
            responseType: 'blob', // important
            headers: {"x-access-token": clientToken}
        }).then((response) => {

            // console.log(response.data)
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);
        
            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            const filename = "Report-Host-" + Moment(new Date()).format('YYYYMMDD-HHmmss') + ".xlsx"
            link.href = href;
            // link.setAttribute('download', 'test.xlsx'); //or any other extension
            link.setAttribute('download', filename); //or any other extension
            document.body.appendChild(link);
            link.click();
        
            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
        .catch((error) => {
            console.log(error);

            if(error.response.status === 401)
            {
                sessionStorage.removeItem("accessToken");
                window.location.href = "/";
            }
        });
    }; 

    const toggleOptionProject = (event) => {

        const value = event.target.value;
        if(value)
        {
            setProjectId(value);
            loadDataList(value);
        }
    }

    /** ========== */

    const selectOptions = {
        '0': 'Down',
        '1': 'Up',
    };

    const selectOptionsIpType = {
        1: 'public ip',
        2: 'private ip',
    };

    const resultDutyListObjDutyId = Object.keys(dutyList).reduce((obj, key) => ({ ...obj, [dutyList[key]]: key }), {});
    // console.log(resultDutyListObjDutyId['API(http)'])
    
    const columns = [{
        dataField: '',
        text: 'ลำดับ',
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return rowIndex + 1;
        },
        style: {
            width: 60,
            textAlign: 'center'
        }
      }, {
        dataField: 'is_active',
        text: 'เปิด/ปิด',
        formatter: (cell, row, rowIndex, formatExtraData) => {
            if (cell === '1') {
                cell = true
            }
            else {
                cell = false
            }

            return (
                <>
                <Form.Check
                    type="switch"
                    label=""
                    id={row.id}
                    // checked={cell}
                    defaultChecked={cell}
                    onChange={formatExtraData.handle}
                />
                </>
            )
        },
        formatExtraData: { handle: handleToggle },
        style: {
            width: 60,
            textAlign: 'center'
        }
      }, {
        dataField: 'machine_name',
        text: 'ชื่อเครื่อง',
        // sort: true,
        filter: textFilter({
            placeholder: 'ระบุ...',
        }),
      }, {
        dataField: 'duty_id',
        text: 'หน้าที่',
        // sort: true,
        filter: selectFilter({
            placeholder: 'เลือก...',
            options: dutyList,
        }),
        formatter: (cell, row) => {
            return (
                <>
                    {dutyList[cell]}
                </>
            );
        }
      }, {
        dataField: 'ip_type_id',
        text: 'ตรวจสอบโดยหมายเลข',
        // sort: true,
        filter: selectFilter({
            placeholder: 'เลือก...',
            options: selectOptionsIpType,
        }),
        formatter: (cell, row) => {
            return (
                <>
                    { cell === 1 && 
                        <span> public ip </span>
                    }
                    { cell === 2 && 
                        <span> private ip </span>
                    }
                </>
            );
        }
      }, {
        dataField: 'public_ip',
        text: 'Public IP/Domain',
        filter: textFilter({
            placeholder: 'ระบุ...',
        }),
        formatter: (cell, row, rowIndex) => {
            return (
                <div key={rowIndex}>
                    {(cell && (
                        row.duty_id == resultDutyListObjDutyId['DB(MySql)'] || 
                        row.duty_id == resultDutyListObjDutyId['DB(MySql)'] ||
                        row.duty_id == resultDutyListObjDutyId['FTP']       ||
                        row.duty_id == resultDutyListObjDutyId['SFTP']
                    )) && 
                        <>
                            {cell}
                        </>
                    }

                    {(cell && (
                        row.duty_id == resultDutyListObjDutyId['Web(http)']  || 
                        row.duty_id == resultDutyListObjDutyId['Web(https)'] ||
                        row.duty_id == resultDutyListObjDutyId['API(http)']  ||
                        row.duty_id == resultDutyListObjDutyId['API(https)'] 
                    )) && 
                       <a href={'http://' + cell} target="_blank"> {cell} </a>
                    }

                    {(cell && row.ip_type_id == 1) &&
                        <>
                            <br/>
                            <small variant="primary" style={{fontSize: 12, color: "#1d9fdc"}}>(ใช้ในการตรวจสอบ)</small>
                        </>
                    }
                </div>
            );
        }
      }, {
        dataField: 'private_ip',
        text: 'Private Ip/Domain',
        filter: textFilter({
            placeholder: 'ระบุ...',
        }),
        formatter: (cell, row) => {
            return (
                <>
                    {cell}
                
                    {(cell && row.ip_type_id == 2) &&
                        <>
                            <br/>
                            <small variant="primary" style={{fontSize: 12, color: "#1d9fdc"}}>(ใช้ในการตรวจสอบ)</small>
                        </>
                    }
                </>
            );
        }
      }, {
        dataField: 'port',
        text: 'Service/Port',
        filter: textFilter({
         
            placeholder: 'ระบุ...',
        }),
      }, {
        dataField: 'is_status',
        text: <span>สถานะ <FontAwesomeIcon icon={faCircleInfo} style={{cursor: 'pointer'}} onClick={handleShow}/></span>,
        // text: 'สถานะ',
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
            placeholder: 'เลือก...',
            options: selectOptions,
            getFilter: (filter) => {
                // qualityFilter was assigned once the component has been mounted.
                // console.log(filter)
                // qualityFilter = filter;
              }
        }),
        formatter: (cell, row) => {
            if(cell === null)
            {
               return;
            }

            let text_color = 'red';
            let text_status = 'Down';
            if(cell === '1')
            {
                text_color = 'green';
                text_status = 'Up';
            }

            return (
                <>
                    { text_status === 'Up' &&
                        <span style={{ textAlign: 'center', fontWeight: 600, color: text_color }}> {text_status}({row.status}) </span>
                    }

                    { text_status === 'Down' &&
                        <OverlayTrigger
                        key='right'
                        placement='right'
                        overlay={
                            <Tooltip id='tooltip-right'>
                            Error : <strong>{row.message_error}</strong>
                            </Tooltip>
                        }
                        >
                        {/* <Button variant="secondary">Tooltip on {placement}</Button> */}
                        <span style={{ textAlign: 'center', fontWeight: 600, color: text_color }}> {text_status}({row.status}) </span>
                        </OverlayTrigger>
                    }
                </>
            );
        }
      }, {
        dataField: 'remark',
        text: 'หมายเหตุ เช่น spac เครื่อง',
        // filter: textFilter(),
        style: {
            width: 130,
        },
      }, 
    //   {
    //     dataField: 'create_date',
    //     text: 'วันที่สร้าง',
    //     sort: true,
    //     style: {
    //         width: 130,
    //     },
    //     formatter: (cell) => {
    //         if (cell == null) {
    //           return
    //         }
    //         return `${Moment(cell).format("DD/MM/YYYY HH:mm:ss")? Moment(cell).format("DD/MM/YYYY HH:mm:ss"):Moment(cell).format("DD/MM/YYYY HH:mm:ss") }`;
    //     },
    //   }, 
      {
        dataField: 'update_date',
        text: 'วันที่อัพเดทล่าสุด',
        sort: true,
        style: {
            width: 130,
        },
        formatter: (cell, row) => {
            if (cell == null) {
              return `${Moment(row.create_date).format("DD/MM/YYYY HH:mm:ss")? Moment(row.create_date).format("DD/MM/YYYY HH:mm:ss"):Moment(row.create_date).format("DD/MM/YYYY HH:mm:ss") }`;
            }
            return `${Moment(cell).format("DD/MM/YYYY HH:mm:ss")? Moment(cell).format("DD/MM/YYYY HH:mm:ss"):Moment(cell).format("DD/MM/YYYY HH:mm:ss") }`;
        },
      }, {
        dataField: 'id',
        text: 'จัดการ',
        editable: false,
        clickToSelect: false,
        style: {
            width: 202,
            textAlign: 'center'
        },
        formatter: (cell, row) => {
            
            return (
                <>
             
                    <Link className="detail-link"
                    to={"/host-history/" + row.id}>
                    กราฟ
                    </Link>
                    <Link className="edit-link"
                    to={"/host-edit/" + row.id}>
                    แก้ไข
                    </Link>
                    <Button
                    size="sm" variant="danger"
                    onClick={() => deleteHost(row.id)}
                    >
                    Delete
                    </Button>
                </>
            );
        }
      }
      
    ];

    const pagination = paginationFactory({

        sizePerPageList: [{
          text: '15', value: 15
        }, {
          text: '25', value: 25
        }, {
          text: '50', value: 50
        }],
    });

    const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
      }];

    const deleteHost = (rowId) => {

        Swal.fire({
            title: "คุณต้องการลบข้อมูล ใช่หรือไหม",
            // text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
            closeOnConfirm: false,
            closeOnCancel: false
        })
        .then(({ isConfirmed }) => {

            if (isConfirmed) {
                Axios.delete( conf.END_POINT_URL + '/host/delete/' + rowId )
                    .then((response) =>  {
                        if(response.data.status === 200) {
                            Swal.fire({
                                title: response.data.message,
                                html: "<br/>",
                                icon: 'success',
                                showConfirmButton: true,
                                confirmButtonText: "ตกลง",
                                width: 400,
                            })
                            .then(() => {
                                // window.location.reload();
                                loadDataList(projectId);
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
                   
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to delete!", "error");
                    })
            }
        })
    };

    return (
        <div className="table-wrapper">
            <br/>
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                <h5>ชื่อโครงการ :</h5>
            </Form.Label>
            <Col sm={10}>
            <Form.Select value={ projectDetail.id} onChange={toggleOptionProject} >

                {
                    projectList.map((projectDtail, index) => (
                        <option key={index} value={projectDtail.id}> {projectDtail.name} </option>
                    ))
                }

                </Form.Select>
            </Col>
            </Form.Group>
           
            <hr/>

            <br/>
            <h5>รายการ</h5>
            <br/>

            <div style={{paddingBottom: 5}}>
                <Link to={"/project-host-create/" + projectId}>
                    <Button variant="primary">เพิ่ม</Button>
                </Link>

                { isButtonProcess ? 
                    <Button variant="primary" style={{marginLeft: 20}} disabled>
                        <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                         กำลังตรวจสอบ...
                    </Button>
                    :
                    <Button variant="primary" style={{marginLeft: 20}} onClick={checkHost}>
                        ตรวจสอบ ณ ปัจจุบัน
                    </Button>
                }

                <Button variant="primary" style={{marginLeft: 20}} onClick={exportHost}>รายงานทั้งหมด</Button>
            </div>
        
            <BootstrapTable responsive
                keyField="id"
                data={ hostList }
                defaultSorted={ defaultSorted } 
                columns={ columns }
                filter={ filterFactory() }
                pagination={ pagination }
                // pagination={ paginationFactory() }
                // selectRow={ { mode: 'checkbox', clickToSelect: true } }
                // expandRow={ expandRow }
                hover
                striped
                wrapperClasses="table-responsive"
                />

            {/* <ToolkitProvider
                keyField="id"
                data={ hostList }
                // defaultSorted={ defaultSorted } 
                columns={ columns }
                // filter={ filterFactory() }
                // pagination={ paginationFactory() }
                // hover
                // striped
                    search
                >
                {
                    props => (
                        <div>
                            <h3>Input something at below input field:</h3>
                            <SearchBar { ...props.searchProps } />
                            <ClearSearchButton { ...props.searchProps } />
                            <hr />
                            <BootstrapTable
                            { ...props.baseProps }
                            />
                        </div>
                    )
                }
            </ToolkitProvider> */}

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>รายละเอียดสถานะ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
               
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>สถานะ</th>
                        <th>รายละเอียด</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>200 (success)</td>
                        <td>
                            หมายถึงการส่ง Request หรือการเรียกเว็บไซต์ไปยัง Server สำเร็จและทาง Server ส่ง Response กลับมายังผู้ใช้งานเพื่อให้บริการเว็บไซต์ดังกล่าวได้ตาม HTTP Method ที่ผู้ใช้งานเรียกเช่น Get, Post, Put หรือ Trace
                        </td>
                    </tr>

                    <tr>
                        <td>301 (Moved Permanently)</td>
                        <td>
                            หมายถึงการร้องขอหรือ Request จากทาง Client ที่ส่งไปยัง Server จะถูก Redirect ไปยัง URL อื่นอย่างถาวรหรือทาง Server อาจส่ง URL อื่นตอบกลับไปยังทาง Client
                        </td>
                    </tr>

                    <tr>
                        <td>302 (Found)</td>
                        <td>
                            หมายถึงการร้องขอหรือ Request จากทาง Client ที่ส่งไปยัง Server จะถูก Redirect ไปยัง URL อื่นชั่วคราว
                        </td>
                    </tr>

                    <tr>
                        <td>304 (Not Modified)</td>
                        <td>
                            หมายถึงการร้องขอหรือ Request จากทาง Client ที่ส่งไปยัง Server นี้มีเนื้อหาที่ยังไม่ได้แก้ไขตั้งแต่การเรียกใช้ครั้งล่าสุด ซึ่งใช้สำหรับเก็บ Cache จากการเรียกใช้งาน ในอนาคตหากทาง Client ยังมีการส่ง Request ดังกล่าวอีกจะสามารถใช้ Response ที่เก็บไว้ใน Cache ได้
                        </td>
                    </tr>

                    <tr>
                        <td>404 (Not Found)</td>
                        <td>
                            หมายถึงการร้องขอหรือ Request จากทาง Client ที่ส่งไปยัง Server แล้วแต่ไม่พบ Resource ดังกล่าวทำให้ Server ไม่สามารถส่ง Response กลับมายังผู้ใช้งานได้
                        </td>
                    </tr>

                    <tr>
                        <td>500 (Internal Server Error)</td>
                        <td>
                            หมายถึงการร้องขอหรือ Request จากทาง Client ที่ส่งไปยัง Server นั้นมีข้อผิดพลาดเกิดขึ้นโดยที่ทาง Server เองไม่ทราบสาเหตุหรือไม่ทราบวิธีการจัดการกับข้อผิดพลาดดังกล่าว
                        </td>
                    </tr>
                    
                </tbody>
                </Table>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    ปิด
                </Button>
                {/* <Button variant="primary">Understood</Button> */}
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default DataList;
