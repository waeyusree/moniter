import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HostTableRow from "./hostTableRow";

const DataList = () => {
    const [hostList, setHostList] = useState([]);

    // useEffect(() => {
    //     Axios
    //     .get("http://localhost:3001/hostList")
    //     .then(({ data }) => {
    //         console.log(data);

    //         setHostList(data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }, []);

    const DataTable = () => {
        return hostList.map((res, i) => {
            // console.log(i);
            return <HostTableRow obj={res} num={i} />;
        });
    };

    // === Host === //
    const checkHost = () => {
        Axios
        .get('http://localhost:3001/check_host')
        .then(({data}) => {

            if(data.status === 200)
            {
                console.log(data.dataList);
                setHostList(data.dataList);
            }

        });
    };

    return (
        <div className="table-wrapper">
            <br/>
            <h3>รายการ Database</h3>
            <br/>

            <div style={{paddingBottom: 5}}>
                <Link to={"/database-create"}>
                    <Button variant="primary">เพิ่ม</Button>
                </Link>
                <Button variant="primary" style={{marginLeft: 20}} onClick={checkHost}>ตรวจสอบ</Button>
            </div>
            
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อระบบงาน</th>
                    <th>ชื่อระบบงาน</th>
                    <th>Public IP</th>
                    <th>Private IP</th>
                    <th>Status</th>
                    <th style={{width: 129, textAlign: "center"}}>จัดการ</th>
                </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default DataList;
