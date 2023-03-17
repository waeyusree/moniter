import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link, useParams  } from "react-router-dom";
import HostTableRow from "./tableRow";

const DataList = () => {
    const params = useParams()
    const projectId     = params.id;

    const [projectDetail, setProjectDetail] = useState([]);
    const [hostList, setHostList] = useState([]);

    useEffect(() => {
        Axios
        .get(
            "http://localhost:3001/project/detail/"
            + projectId
        )
        .then(({ data }) => {
            setHostList(data);
        })
        .catch((error) => {
            console.log(error);
        });
        
        /** =========== */

        Axios
        .get(
            "http://localhost:3001/projectId/"
            + projectId
        )
        .then(({ data }) => {
            setProjectDetail(data[0]);
            console.log(projectDetail);
        })
        .catch((error) => {
            console.log(error);
        });


    }, []);

    const DataTable = () => {
        return hostList.map((res, i) => {
            return <HostTableRow obj={res} num={i} />;
        });
    };

    // === Host === //
    const checkHost = () => {
        Axios
        .get("http://localhost:3001/check_host/" + projectId)
        .then(({data}) => {

            if(data.status === 200)
            {
                // console.log(data.dataList);
                setHostList(data.dataList);
            }

        });
    };

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
                <Button variant="primary" style={{marginLeft: 20}} onClick={checkHost}>ตรวจสอบ</Button>
            </div>
            
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อเครื่อง</th>
                    <th>หน้าที่</th>
                    <th>Public IP</th>
                    <th>Private IP</th>
                    <th>Service/Port</th>
                    <th>Status</th>
                    <th>หมายเหตุ</th>
                    <th>Last update</th>
                    <th style={{width: 132, textAlign: "center"}}>จัดการ</th>
                </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default DataList;
