import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import Moment from 'moment';

/** === config url === */
import conf from "../../config/env.conf.js";

const Swal = require('sweetalert2');

const HostTableRow = (props) => {
    const { id, name, con_job, create_date, update_date } = props.obj;
    
    const deleteProject = () => {

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
                Axios.delete( conf.END_POINT_URL + '/project/delete/' + id)
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

    return (
        <tr>
            <td style={{textAlign: 'center'}}>{props.num + 1 }</td>
            <td>{name}</td>
            <td>{con_job}</td>
            <td>{Moment(create_date).format('DD/MM/YYYY HH:mm:ss')}</td>
            <td>{ (update_date) ? Moment(update_date).format('DD/MM/YYYY HH:mm:ss') : null }</td>
            <td>
                <Link className="detail-link"
                to={"/project-detail/" + id}>
                รายละเอียด
                </Link>
                <Link className="edit-link"
                to={"/project-edit/" + id}>
                แก้ไข
                </Link>
                <Button onClick={deleteProject}
                size="sm" variant="danger">
                ลบ
                </Button>
            </td>
        </tr>
    );
};

export default HostTableRow;
