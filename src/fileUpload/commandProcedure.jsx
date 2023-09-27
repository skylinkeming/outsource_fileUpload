
import { styled } from "styled-components";
import DateTime from 'react-datetime';
import { Panel, PanelBody } from "../components/panel/panel";
import React,{useEffect, useState} from 'react'
import SingleCommandPanel from "./common/singleCommandPanel";
import { InputType } from "./common/singleCommandPanel";
import fileUploadAPI from "../api/fileUploadAPI";

const initCommandData={
    time_tag:"",
    symbol:"",
    description:"",
    command:"",
    src:""
}

export default function CommandProcedure(){
    const [maxDateDisabled, setMaxDateDisabled] = useState(false);
    const [commandList, setCommandList] = useState([initCommandData,]);
    const [form, setForm] = useState({
        originator:"",
        destination:"",
        satellite_name:"",
        generation_time:"",
        instrument:"",
        file_name:"",
        startDate:null,
        endDate: null
    });
    const [symbolOptions, setSymbolOptions] = useState([]);
    const [srcOptions, setSrcOptions] = useState([]);

    var maxYesterday = '';
    var minYesterday = DateTime.moment().subtract(1, 'year'); //最早只能選到一年前




    useEffect(()=>{
        fileUploadAPI.getConfigSelect("cmd_proc").then(result=>{
            console.log(result)
            if(result.resultStatus === 'SUCCESS'){
                let options1 = []
                let options2 = []
                Object.values(result.resultObj).forEach(data=>{
                    if(data.configSubtype==='symbol'){
                        options1.push(data)
                    } else if(data.configSubtype==='src'){
                        options2.push(data)
                    }
                })
                setSymbolOptions(options1)
                setSrcOptions(options2)
            }else{
                alert(result.message || result.error)
            }
        })

    },[])




    // const minDateRange = (current) => {
    //     return current.isAfter( minYesterday );
    // };
    const maxDateRange = (current) => {
        return current.isAfter( form.startDate );
    };
    const handleStartDateChange = (value) => {
        setMaxDateDisabled(false);
        maxYesterday = value;
        console.log(value.format());
        setForm({
            ...form, startDate:value
        })
    };

    const handleEndDateChange = (value)=>{
        setForm({
            ...form, endDate:value
        })
    }


 
    const addNewCommand = ()=>{
        let newCommandList =[...commandList]
            newCommandList.push({ num: commandList.length})
        setCommandList(newCommandList)
    }

    const clickSubmit = ()=>{
        const BreakError = {};
        try {
            Object.keys(form).forEach((key)=>{
                if(!form[key]){
                    alert("請輸入" + key);
                    throw BreakError;
                }
            })
        }catch(err){
            if (err !== BreakError) throw err;
        }
    }

    return (
        <StyledCommandProcedure>
            <Panel>
                <PanelBody className="p-0">
                    <p className="mb-3 title">
                        Command Procedure
                    </p>
                    <div className="panelTitle">
                        Information
                    </div>
                    <div className="inputs">
                        <CustomInput label="originator" onChange={e=>{
                            setForm({
                                ...form, originator:e.target.value
                            })
                        }}/>
                        <CustomInput label="destination" onChange={e=>{
                            setForm({
                                ...form, destination:e.target.value
                            })
                        }}/>
                        <CustomInput label="satellite_name" onChange={e=>{
                            setForm({
                                ...form, satellite_name:e.target.value
                            })
                        }}/>
                        <CustomInput label="generation_time" onChange={e=>{
                            setForm({
                                ...form, generation_time:e.target.value
                            })
                        }}/>
                        <CustomInput label="instrument"  onChange={e=>{
                            setForm({
                                ...form, instrument:e.target.value
                            })
                        }}/>
                        <CustomInput label="file_name"  onChange={e=>{
                            setForm({
                                ...form, file_name:e.target.value
                            })
                        }}/>
                    </div>
                    <div>
                        <div className="form-group calendar">
                            <div className="col-lg-8">
                                <div className="row gx-2">
                                    <div className="col-6">
                                        <div className="label">Start Date</div>
                                        <DateTime inputProps={{ placeholder: 'Start Date' }} closeOnSelect={true} onChange={ handleStartDateChange } />
                                        <input className="dateInput" value={form.startDate?form.startDate.format():""} disabled/>
                                    </div>
                                    <div className="col-6">
                                        <div className="label">End Date</div>
                                        <DateTime isValidDate={ maxDateRange } inputProps={{ placeholder: 'End Date', disabled: maxDateDisabled }} closeOnSelect={true} onChange={ handleEndDateChange }/>
                                        <input className="dateInput" value={form.endDate?form.endDate.format():""} disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buttonPanel">
                        <button type="button" className="btn btn-info me-1 search" onClick={clickSubmit}>Submit</button>
                    </div>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody className="p-0">
                    <div className="panelTitle">
                        Command
                    </div>
                    <div className="addBtn">
                        <button type="button" className="btn btn-white me-1 mb-1" onClick={addNewCommand}>+ Input New</button>
                    </div>                   
                    {commandList.map((data, idx)=>{
                        return (
                            <SingleCommandPanel 
                                key={idx}  
                                dataList={[
                                    {label:"time_tag", inputType:InputType.TimeInput, value:data.time_tag, options:[]},
                                    {label:"symbol", inputType:InputType.DropdownMenu,value:data.symbol, options:symbolOptions},
                                    {label:"description", inputType:InputType.CommandInput,value:data.description, options:[]},
                                    {label:"command", inputType:InputType.CommandInput,value:data.command, options:[]},
                                    {label:"src", inputType:InputType.DropdownMenu,value:data.src, options:srcOptions},
                                ]}
                                onChange={(newData)=>{

                                }} 
                                onClickDeleteBtn={()=>{
                                    let targetList = commandList.filter((data, index)=> index!==idx);
                                    setCommandList(targetList);
                                }}
                                hideDeleteBtn={commandList.length <= 1}
                            />
                        );
                    })}
                </PanelBody>
            </Panel>
        </StyledCommandProcedure>
    )

}


const StyledCommandProcedure = styled.div`
    .title {
        font-weight:bold;
        font-size:20px;
    }
    .panel {
        padding:10px;
        .panelTitle {
            font-size:18px;
            margin-bottom:10px;
        }
    }
    .label {
        font-size:16px;
        margin-bottom:5px;
    }
    .inputWrap:nth-child(2n+1){
            margin-right:10px;
    }
    .addBtn {
        text-align:right;
    }
    .buttonPanel {
        margin-top:10px;
        text-align:right;
    }
    .calendar {
        .col-lg-8 {
            width: 100%;
        }
    }
    .dateInput {
        width: 100%;
        margin-top: 10px;
        height: 35px;
        padding: 10px;
    }
`;




const StyledCustomInput = styled.div`
    margin-bottom:5px;
    display:inline-block;
    width:calc(50% - 5px);
    .label {
        font-size:16px;
        margin-bottom:5px;
    }

    input {
        width:100%;
    }
`

export const CustomInput = ({label, onChange=(event)=>{}, placeholder})=>{
    return (
        <StyledCustomInput className="inputWrap">
            <div className="inputDiv">
                <div className="label">{label}</div>
                <input type="text" className="form-control" placeholder="" onChange={onChange}/>
            </div>
        </StyledCustomInput>
    )
}





