import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Swal = require('sweetalert2');

const HostTableRow = (props) => {
    const { Id, Name_project, Name_system, Public_ip, Private_ip, Status } = props.obj;
    
    const deleteHost = () => {

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
                axios.delete('http://localhost:3001/delete/' + Id)
                    .then((response) =>  {
                        if(response.data.status === 200) {
                            Swal.fire({
                                title: response.data.message,
                                html: "<br/>",
                                icon: 'success',
                                showConfirmButton: false,
                                width: 400,
                            })
                            .then(() => {
                                window.location.reload();
                            });
                        }
                   
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to delete!", "error");
                    })
            }
        })


    };

    var text_color = 'red';
    if(Status == '200' || Status == '302')
    {
        text_color = 'black';
    }

    return (
        <tr>
            <td style={{textAlign: 'center'}}>{props.num + 1 }</td>
            <td>{Name_project}</td>
            <td>{Name_system}</td>
            <td>{Public_ip}</td>
            <td>{Private_ip}</td>
            <td style={{ textAlign: 'center', fontWeight: 600, color: text_color }}>{Status}</td>
            <td>
                <Link className="edit-link"
                to={"/host-edit/" + Id}>
                Edit
                </Link>
                <Button onClick={deleteHost}
                size="sm" variant="danger">
                Delete
                </Button>
            </td>
        </tr>
    );
};

export default HostTableRow;
