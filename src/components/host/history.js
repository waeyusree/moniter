import Axios from 'axios';
import { useState, useEffect } from 'react';

import {Form, Row, Col, Button, InputGroup} from 'react-bootstrap';
import { Link, useParams  } from "react-router-dom";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

/** === config url === */
import conf from "../../config/env.conf.js";

const Swal = require('sweetalert2')

const HostHistory = () => {

  const params = useParams()
  const id     = params.id;

    const [projectId, setProjectId]     = useState("");
    const [machineName, setMachineName] = useState("");
    const [codeColors, setCodeColors]   = useState([]);
    const [dataHostHistoryCountUpDown, setDataHostHistoryCountUpDown]  = useState([]);

    const clientToken = sessionStorage.getItem('accessToken');

    useEffect(() => {

      Axios
        .get(conf.END_POINT_URL + "/host/history/" + id)
        .then(({data}) => {

          // console.log(data);
          setProjectId(data.hostDetail.project_id)
          setMachineName(data.hostDetail.machine_name)
          setDataHostHistoryCountUpDown(data.hostHistoryCountUpDownList);

          if(data.hostHistoryCountUpDownList.length === 1)
          {
            if(data.hostHistoryCountUpDownList[0].name === "Down")
            { 
              setCodeColors(['#ff0000']);
            }

            if(data.hostHistoryCountUpDownList[0].name === "Up"){
              setCodeColors(['#008000']);
            } 
          }
          else
          {
            setCodeColors(['#ff0000', '#008000']);
          }

        })
        .catch((error) => {
          console.log(error);
      });

    }, []);

    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: machineName,
        align: 'left'
      },
      colors: codeColors,
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y} ครั้ง</b>'
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name} {series.name}: <b>{point.y} ครั้ง</b>'
            // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'จำนวน',
        data: dataHostHistoryCountUpDown
        // data: [{
        //   name: 'Up',
        //   y: 50,
        // }, {
        //   name: 'Down',
        //   y: 100
        // }, {
        //   name: 'A',
        //   y: 150
        // }]
      }]
    }

    /**=== download ===*/
    if (typeof Highcharts === 'object') {
      HighchartsExporting(Highcharts)
    }

    return (
      <>

        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />

        <hr />

        <Link to={"/project-detail/" + projectId }>
            <Button variant="primary">กลับ</Button>
        </Link>
      </>
    );
}

export default HostHistory;
