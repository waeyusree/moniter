import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';

/** === config url === */
import conf from "../../config/env.conf.js";

const Swal = require('sweetalert2');

const HostTableRow = (props) => {
    const { id , machine_name, duty_id, ip_type_id, public_ip, private_ip, port, status, remark, create_date, update_date } = props.obj;
    
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
                axios.delete( conf.END_POINT_URL + '/host/delete/' + id )
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
        text_color = 'green';
    }

    var title_duty = '';
    if(duty_id === 1)
    {
        title_duty = "Web";
    }
    else if(duty_id === 2)
    {
        title_duty = "API";
    }
    else if(duty_id === 3)
    {
        title_duty = "Database";
    }


    return (
        <tr>
            <td style={{textAlign: 'center'}}>{props.num + 1 }</td>
            <td>{machine_name}</td>
            <td>{title_duty}</td>
            <td>
                {public_ip}
                
                {(public_ip && ip_type_id == 1) &&
                    <>
                        <br/>
                        <small variant="primary" style={{fontSize: 12, color: "#1d9fdc"}}>(ใช้ในการตรวจสอบ)</small>
                    </>
                }
            </td>
            <td>
                {private_ip}

                {(private_ip && ip_type_id == 2) &&
                    <>
                        <br/>
                        <small variant="primary" style={{fontSize: 12, color: "#1d9fdc"}}>(ใช้ในการตรวจสอบ)</small>
                    </>
                }
            </td>
            <td>{port}</td>
            <td style={{ textAlign: 'center', fontWeight: 600, color: text_color }}>{status}</td>
            <td>{remark}</td>
            <td>{ (update_date) ? Moment(update_date).format('DD/MM/YYYY HH:mm:ss') : Moment(create_date).format('DD/MM/YYYY HH:mm:ss') }</td>
            <td>
                <Link className="edit-link"
                to={"/host-edit/" + id }>
                แก้ไข
                </Link>
                <Button onClick={deleteHost}
                size="sm" variant="danger">
                ลบ
                </Button>
            </td>
        </tr>
    );
};

export default HostTableRow;
