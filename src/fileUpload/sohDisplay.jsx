import { styled } from "styled-components";
import DateTime from 'react-datetime';
import { Panel, PanelBody } from "../components/panel/panel";
import React,{useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function SOHDisplay(){
    const [maxDateDisabled, setMaxDateDisabled] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const menuBtnArr = ['DSP1 PS','DSP1 PL', 'DSP2 PL', 'DSP2 PS', 'DSP3 PS', 'DSP3 PL', 'DSP4 PS', 'DSP4 PL']
    const [clickedBtn, setClickedBtn]= useState("");
    const [tableData, setTableData] = useState([]);
    var maxYesterday = '';
    var minYesterday = DateTime.moment().subtract(1, 'year'); //最早只能選到一年前
    const dataList1 =  [
        {receiveTime:"2023-9-19 16:04:59", timeStamp:"2023-03-10", element:"PS TEMP", value:"0"},
        {receiveTime:"2023-9-22 16:04:59", timeStamp:"2023-04-10", element:"PS TEMP", value:"1"},
    ]
    const dataList2 =  [
        {receiveTime:"2023-9-11 12:04:59", timeStamp:"2023-03-10", element:"PL TEMP", value:"0"},
        {receiveTime:"2023-9-17 15:04:59", timeStamp:"2023-04-10", element:"PT TEMP", value:"1"},
        {receiveTime:"2023-9-17 15:04:59", timeStamp:"2023-04-10", element:"PT TEMP", value:"1"},
    ]

    const minDateRange = (current) => {
        return current.isAfter( minYesterday );
    };
    const maxDateRange = (current) => {
        return current.isAfter( maxYesterday );
    };
    const minDateChange = (value) => {
        setMaxDateDisabled(false);
        maxYesterday = value;
    };
 
    return (
        <StyledSOHDisplay> 
            <Panel>
                <PanelBody className="p-3">
                    <div className="title">Select Time</div>
                    <div className="form-check mb-2 mt-2">
                        <input className="form-check-input" name="selectTime" type="radio" onChange={()=>{}} id="radio1" />
                        <label className="form-check-label" htmlFor="radio1">Lastest Time</label>
                    </div>
                    <div className="form-check flex align-items-center">
                        <input className="form-check-input mr-5" name="selectTime"  type="radio" onChange={()=>{}} id="radio2" />
                        <label className="form-check-label" htmlFor="radio2">Period of Time</label>
                        <div className="form-group calendar">
                            <div className="col-lg-12">
                                <div className="row gx-2">
                                    <div className="col-6">
                                        <DateTime isValidDate={ minDateRange } inputProps={{ placeholder: 'Start Date' }} closeOnSelect={true} onChange={ minDateChange } />
                                    </div>
                                    <div className="col-6">
                                        <DateTime isValidDate={ maxDateRange } inputProps={{ placeholder: 'End Date', disabled: maxDateDisabled }} closeOnSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-info me-1 search">Search</button>
                    </div>
                </PanelBody>
            </Panel>   
            <div className="flex">
                <Panel className="one">
                    <PanelBody className="p-3 button-menu">
                        {menuBtnArr.map((menuItem,idx)=>{
                            return (
                                <button 
                                    key={menuItem}
                                    type="button" 
                                    className={menuItem===clickedBtn?"menuBtn btn btn-primary":"menuBtn btn btn-white"}
                                    onClick={()=>{
                                        setClickedBtn(menuItem)
                                        if(idx%2===0){//測試用 串API後會刪除
                                            setTableData(dataList1)
                                        }else {
                                            setTableData(dataList2)
                                        }
                                    }}
                                >
                                    {menuItem}
                                </button>
                            )
                        })}
                    </PanelBody>
                </Panel>           
                <Panel className="two">
                    <PanelBody className="p-3">
                        <p className="mb-3 title">
                            Latest Information
                        </p>
                        <div className="table-name title">
                            TID RX STATISTIC TABLE
                        </div>
                        <div className="entryNum">Entry Num: {tableData.length}</div>
                        <table className="table table-sm">
                            <thead>
                                <tr className="p-3">
                                    <th nowrap="true">RECEIVE TIME</th>
                                    <th nowrap="true">TIMESTAMP</th>
                                    <th nowrap="true">ELEMENT</th>
                                    <th nowrap="true">VALUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, i)=>{
                                    return (
                                        <tr className="p-3">
                                            <td>{data.receiveTime}</td>
                                            <td>{data.timeStamp}</td>
                                            <td>{data.element}</td>
                                            <td>{data.value}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </PanelBody>
                </Panel>
            </div>
        </StyledSOHDisplay>
    );
}


const StyledSOHDisplay = styled.div`
    .title {
        font-weight:bold;
        font-size:20px;
    }
    .align-items-center{
        align-items:center;
    }
    .mr-5 {
        margin-right:5px;
    }
    .search {
        margin-left: 10px;
    }
    .flex {
        display:flex;
        .one {
            min-width:200px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .two {
            border-left:1px solid #e9ecef;
            width:100%;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            .table-name {
                text-align:center;
            }
            .entryNum {
                text-align:center;
                margin-bottom:20px;
                font-size:16px;
            }
        }
        .calendar {
            margin-left:10px;
            display:flex;
            align-items:center;
        }
    }
    .button-menu {
        max-width: 400px;
    }
    .menuBtn {
        width:100%;
        margin-bottom:10px;
        
    }
    .menuBtn.btn.btn-white:hover {
        background:#348fe2 !important;
        color:white;
    }

`