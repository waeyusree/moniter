import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Moment from 'moment';
import { Table, Button } from "react-bootstrap";
import { Link, useParams  } from "react-router-dom";
import HostTableRow from "./tableRow";

const Swal = require('sweetalert2')

const DataList = () => {

    const params        = useParams()
    const projectId     = params.id;
    const clientToken   = localStorage.getItem('accessToken');

    const [projectDetail, setProjectDetail] = useState([]);
    const [hostList, setHostList] = useState([]);
    const [isButton, setIsButton] = useState(false);

    useEffect(() => {
        Axios
        .get(
            "http://localhost:3001/projectId/"
            + projectId
        )
        .then(({ data }) => {
            setProjectDetail(data[0]);
            // console.log(projectDetail);
        })
        .catch((error) => {
            console.log(error);
        });


    }, []);

    useMemo(() => {
        loadDataList();
    }, [isButton]);

    const DataTable = () => {
        return hostList.map((res, key) => {
            return <HostTableRow key={key} obj={res} num={key} />;
        });
    };

    // === Host === //
    const checkHost = () => {
        setIsButton(true);
        Axios
        .get("http://localhost:3001/check_host/" + projectId)
        .then(({data}) => {

            if(data.status === 200)
            {
                loadDataList();
                // console.log(data.dataList);
                // setHostList(data.dataList);
                setIsButton(false);
            }

        });
    };

    const exportHost = () => {
        // alert('5555')
        // Axios
        // .get("http://localhost:3001/export_host/" + projectId)
        // .then((response) => {

        //     if(response.data.status === 200)
        //     {

        //         // Swal.fire({
        //         //     show: true,
        //         //     title: response.data.message,
        //         //     html: "<br/>",
        //         //     icon: 'success',
        //         //     showConfirmButton: false,
        //         //     width: 400,
        //         //   });

        //         // window.location.href = data.path + 'target="_blank"';
        //         // window.open(" " + data.path, '_blank');

        //         response.blob().then(blob => {
        //             let url = window.URL.createObjectURL(blob);
        //             let a = document.createElement('a');
        //             a.href = url;
        //             a.download = 'employees.json';
        //             a.click();
        //         });

        //     }
        //     else
        //     {
        //         Swal.fire({
        //             show: true,
        //             title: response.data.message,
        //             html: "<br/>",
        //             icon: 'warning',
        //             showConfirmButton: false,
        //             width: 400,
        //           });
        //     }

        // });

        Axios({
            url: 'http://localhost:3001/export_host/' + projectId, //your url
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
        });
    }; 

    async function loadDataList(){

        Axios
        .get("http://localhost:3001/project/detail/" + projectId)
        .then(({ data }) => {
            setHostList(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="table-wrapper">
            <br/>
            <h3>ชื่อโครงการ : { projectDetail.name }</h3>
            <hr/>

            <br/>
            <h3>รายการ</h3>
            <br/>

            <div style={{paddingBottom: 5}}>
                <Link to={"/project-host-create/" + projectId}>
                    <Button variant="primary">เพิ่ม</Button>
                </Link>
                <Button variant="primary" style={{marginLeft: 20}} onClick={checkHost}>ตรวจสอบ ณ ปัจจุบัน</Button>
                <Button variant="primary" style={{marginLeft: 20}} onClick={exportHost}>รายงาน</Button>
            </div>
            
            <Table striped bordered hover>
                <thead style={{verticalAlign : 'top'}}>
                <tr>
                    <th>ลำดับ</th>
                    <th style={{width: 265}}>ชื่อเครื่อง</th>
                    <th>หน้าที่</th>
                    <th>Public IP</th>
                    <th>Private IP</th>
                    <th>Service/Port</th>
                    <th style={{width: 132}}>
                        สถานะ
                        <br/>
                        <small style={{ color : "green"}}>สีเขียว : ทำงานปกติ</small>
                        <br/>
                        <small style={{ color : "red"}}>สีแดง : ระบบดาวน์</small>
                    </th>
                    <th style={{width: 130}}>หมายเหตุ</th>
                    <th style={{width: 130}}>วันที่อัพเดทล่าสุด</th>
                    <th style={{width: 114, textAlign: "center"}}>จัดการ</th>
                </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default DataList;
