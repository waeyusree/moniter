import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Moment from 'moment';
import { Table, Button } from "react-bootstrap";
import { Link, useParams  } from "react-router-dom";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

/** === config url === */
import conf from "../../config/env.conf.js";

const Swal = require('sweetalert2');

const DataList = () => {

    // const { SearchBar, ClearSearchButton } = Search;
    const params        = useParams()
    const projectId     = params.id;
    const clientToken   = localStorage.getItem('accessToken');

    const [projectDetail, setProjectDetail] = useState([]);
    const [hostList, setHostList] = useState([]);
    const [isButton, setIsButton] = useState(false);

    useEffect(() => {
        Axios
        .get(
            conf.END_POINT_URL + "/projectId/"
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

    // === Host === //
    const checkHost = () => {
        setIsButton(true);
        Axios
        .get( conf.END_POINT_URL + "/check_host/" + projectId)
        .then(({data}) => {

            if(data.status === 200)
            {
                // loadDataList();
                // console.log(data.dataList);
                // setHostList(data.dataList);
                setIsButton(false);
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
        });
    }; 

    async function loadDataList(){

        Axios
        .get( conf.END_POINT_URL + "/project/detail/" + projectId)
        .then(({ data }) => {
            setHostList(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    let qualityFilter;
    const selectOptions = {
        '0': 'Down',
        '1': 'Up',
    };
    const selectOptionsDuty = {
        1: 'Web',
        2: 'API',
        3: 'Database',
    };

    const pagination = paginationFactory({

        sizePerPageList: [{
          text: '15', value: 15
        }, {
          text: '25', value: 25
        }, {
          text: '50', value: 50
        }],
    });

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
            options: selectOptionsDuty,
        }),
        formatter: (cell, row) => {
            return (
                <>
                    { cell === 1 && 
                        // <span> ({cell}) Web </span>
                        <span> Web </span>
                    }
                    { cell === 2 && 
                        // <span> ({cell}) API </span>
                        <span> API </span>
                    }
                    { cell === 3 && 
                        // <span> ({cell}) Database </span>
                        <span> Database </span>
                    }
                </>
            );
        }
      }, {
        dataField: 'public_ip',
        text: 'Public IP',
        filter: textFilter({
            placeholder: 'ระบุ...',
        }),
        formatter: (cell, row) => {
            return (
                <>
                    {cell}
                
                    {(cell && row.ip_type_id == 1) &&
                        <>
                            <br/>
                            <small variant="primary" style={{fontSize: 12, color: "#1d9fdc"}}>(ใช้ในการตรวจสอบ)</small>
                        </>
                    }
                </>
            );
        }
      }, {
        dataField: 'private_ip',
        text: 'Private Ip',
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
        text: 'สถานะ',
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
            placeholder: 'เลือก...',
            options: selectOptions,
            getFilter: (filter) => {
                // qualityFilter was assigned once the component has been mounted.
                // console.log(filter)
                qualityFilter = filter;
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
                     <span style={{ textAlign: 'center', fontWeight: 600, color: text_color }}> {text_status}({row.status}) </span>
                </>
            );
        }
      }, {
        dataField: 'remark',
        text: 'หมายเหตุ',
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
            width: 140,
            textAlign: 'center'
        },
        formatter: (cell, row) => {
            return (
                <>
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
                <Button variant="primary" style={{marginLeft: 20}} onClick={exportHost}>รายงานทั้งหมด</Button>
            </div>
        
            <BootstrapTable
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

        </div>
    );
};

export default DataList;
