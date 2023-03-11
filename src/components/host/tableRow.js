import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Swal = require('sweetalert2');

const HostTableRow = (props) => {
    const { id , machine_name, public_ip, private_ip, status } = props.obj;
    
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
                axios.delete('http://localhost:3001/delete/' + id )
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
    if(status == '200' || status == '302')
    {
        text_color = 'black';
    }

    return (
        <tr>
            <td style={{textAlign: 'center'}}>{props.num + 1 }</td>
            <td>{machine_name}</td>
            <td></td>
            <td>{public_ip}</td>
            <td>{private_ip}</td>
            <td></td>
            <td style={{ textAlign: 'center', fontWeight: 600, color: text_color }}>{status}</td>
            <td></td>
            <td></td>
            <td>
                <Link className="edit-link"
                to={"/host-edit/" + id }>
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
