import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectTableRow from "./tableRow";

const DataList = () => {
    const clientToken = localStorage.getItem('accessToken');
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {

        Axios
        .get("http://localhost:3001/projectList", { 
            headers: {"x-access-token": clientToken}
        })
        .then(({ data }) => {
            setProjectList(data);
        })
        .catch((error) => {
            console.log(error);
            
            if(error.response.status === 401)
            {
                localStorage.removeItem("accessToken");
                window.location.href = "/";
            }
        });
    }, []);

    const DataTable = () => {
        return projectList.map((res, i) => {
            // console.log(i);
            return <ProjectTableRow key={i} obj={res} num={i}/>;
        });
    };
    
    return (
        <div className="table-wrapper">
            <br/>
            <h3>รายการโครงการ</h3>
            <br/>

            <div style={{paddingBottom: 5}}>
                <Link to={"/project-create"}>
                    <Button variant="primary">เพิ่ม</Button>
                </Link>
            </div>
            
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อโครงการ</th>
                    <th>สรวจสอบทุกๆ(นาที่)</th>
                    <th style={{width: 130}}>วันที่สร้าง</th>
                    <th style={{width: 130}}>วันที่แก้ไข</th>
                    <th style={{width: 211, textAlign: "center"}}>จัดการ</th>
                </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default DataList;
