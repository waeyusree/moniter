import React, { useState, useEffect } from "react";
import Axios from "axios";
import Moment from 'moment';
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

/** === config url === */
import conf from "../../config/env.conf.js";

const Swal = require('sweetalert2');

const DataList = () => {
    const clientToken = localStorage.getItem('accessToken');
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {

        Axios
        .get( conf.END_POINT_URL + "/projectList", { 
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

    let nameFilter;
    let conJobFilter;

    // const products = [ ... ];
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
        dataField: 'name',
        text: 'ชื่อโครงการ',
        // sort: true,
        filter: textFilter({
            getFilter: (filter) => {
              nameFilter = filter;
            //   console.log(nameFilter)
            }
        }),
      }, 
    //   {
    //     dataField: 'con_job',
    //     text: 'สรวจสอบทุกๆ(นาที่)',
    //     // sort: true,
    //     // filter: textFilter()
    //     filter: textFilter({
    //         getFilter: (filter) => {
    //             conJobFilter = filter;
    //         }
    //     }),
    //   }, 
      {
        dataField: 'create_date',
        text: 'วันที่สร้าง',
        sort: true,
        style: {
            width: 130,
        },
        formatter: (cell) => {
            if (cell == null) {
              return
            }
            return `${Moment(cell).format("DD/MM/YYYY HH:mm:ss")? Moment(cell).format("DD/MM/YYYY HH:mm:ss"):Moment(cell).format("DD/MM/YYYY HH:mm:ss") }`;
        },
      }, {
        dataField: 'update_date',
        text: 'วันที่แก้ไข',
        sort: true,
        style: {
            width: 130,
        },
        formatter: (cell) => {
            if (cell == null) {
              return
            }
            return `${Moment(cell).format("DD/MM/YYYY HH:mm:ss")? Moment(cell).format("DD/MM/YYYY HH:mm:ss"):Moment(cell).format("DD/MM/YYYY HH:mm:ss") }`;
        },
      }, {
        dataField: 'id',
        text: 'จัดการ',
        editable: false,
        clickToSelect: false,
        style: {
            width: 240,
            textAlign: 'center'
        },
        formatter: (cell, row) => {
            return (
                <>
                    <Link className="detail-link"
                    to={"/project-detail/" + row.id}>
                    รายละเอียด
                    </Link>
                    <Link className="edit-link"
                    to={"/project-edit/" + row.id}>
                    แก้ไข
                    </Link>
                    <Button
                    size="sm" variant="danger"
                    onClick={() => deleteProject(row.id)}
                    >
                    Delete
                    </Button>
                </>
            );
        }
      }
      
    ];

    const handleClick = () => {
        // nameFilter('');
        // conJobFilter('');

        // console.log(nameFilter)
    };

    //   const handleGetCurrentData = () => {
    //     console.log(this.node.table.props.data);
    //   }
    
    //   const handleGetSelectedData = (e) => {
    //     console.log(e.selectionContext.selected);
    //   }
    
    //   const handleGetExpandedData = () => {
    //     console.log(this.node.rowExpandContext.state.expanded);
    //   }
    
    //   const handleGetCurrentPage = () => {
    //     console.log(this.node.paginationContext.currPage);
    //   }
    
    //   const handleGetCurrentSizePerPage = () => {
    //     console.log(this.node.paginationContext.currSizePerPage);
    //   }
    
    //   const handleGetCurrentSortColumn = () => {
    //     console.log(this.node.sortContext.state.sortColumn);
    //   }
    
    //   const handleGetCurrentSortOrder = () => {
    //     console.log(this.node.sortContext.state.sortOrder);
    //   }
    
    //   const handleGetCurrentFilter = () => {
    //     console.log(this.node.filterContext.currFilters);
    //   }

      const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
      }];

    //   const expandRow = {
    //     renderer: row => (
    //       <div>
    //         <p>.....</p>
    //         <p>You can render anything here, also you can add additional data on every row object</p>
    //         <p>expandRow.renderer callback will pass the origin row object to you</p>
    //       </div>
    //     ),
    //     showExpandColumn: true
    //   };

    const deleteProject = (rowId) => {

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
                Axios.delete( conf.END_POINT_URL + '/project/delete/' + rowId)
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
                        else
                        {
                            Swal.fire({
                                show: true,
                                title: response.data.message,
                                html: "<br/>",
                                icon: 'warning',
                                showConfirmButton: false,
                                width: 400,
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
            <h3>รายการโครงการ</h3>
            <br/>

            <div style={{paddingBottom: 5}}>
                <Link to={"/project-create"}>
                    <Button variant="primary">เพิ่ม</Button>
                </Link>
            </div>

            <div>

                {/* <button className="btn btn-default" onClick={ handleGetCurrentData }>Get Current Display Rows</button>
                <button className="btn btn-default" onClick={ handleGetSelectedData }>Get Current Selected Rows</button>
                <button className="btn btn-default" onClick={ handleGetExpandedData }>Get Current Expanded Rows</button>
                <button className="btn btn-default" onClick={ handleGetCurrentPage }>Get Current Page</button>
                <button className="btn btn-default" onClick={ handleGetCurrentSizePerPage }>Get Current Size Per Page</button>
                <button className="btn btn-default" onClick={ handleGetCurrentSortColumn }>Get Current Sort Column</button>
                <button className="btn btn-default" onClick={ handleGetCurrentSortOrder }>Get Current Sort Order</button>
                <button className="btn btn-default" onClick={ handleGetCurrentFilter }>Get Current Filter Information</button> */}

                {/* <button className="btn btn-sm btn-primary" onClick={ handleClick }> Clear all filters </button>
                <br/>
                <br/> */}

                <BootstrapTable
                bootstrap4
                // ref={ n => this.node = n }
                keyField="id"
                data={ projectList }
                defaultSorted={ defaultSorted } 
                columns={ columns }
                filter={ filterFactory() }
                pagination={ paginationFactory() }
                // selectRow={ { mode: 'checkbox', clickToSelect: true } }
                // expandRow={ expandRow }
                hover
                striped
                />
                {/* <Code>{ sourceCode }</Code> */}
            </div>

        </div>
    );
};

export default DataList;
