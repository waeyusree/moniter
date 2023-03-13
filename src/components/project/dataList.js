import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectTableRow from "./tableRow";

const DataList = () => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        Axios
        .get("http://localhost:3001/projectList")
        .then(({ data }) => {
            // console.log(data);
            setProjectList(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const DataTable = () => {
        return projectList.map((res, i) => {
            // console.log(i);
            return <ProjectTableRow obj={res} num={i} />;
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
                    <th>con job(นาที่)</th>
                    <th>create date</th>
                    <th>update date</th>
                    <th style={{width: 200, textAlign: "center"}}>จัดการ</th>
                </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default DataList;
