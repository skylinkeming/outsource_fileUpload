
import { styled } from "styled-components";
import DateTime from 'react-datetime';
import { Panel, PanelBody } from "../components/panel/panel";
import React,{useEffect, useState} from 'react'
import SingleCommandPanel from "./common/singleCommandPanel";
import { InputType } from "./common/singleCommandPanel";
import fileUploadAPI from "../api/fileUploadAPI";
import Warning from "./common/warning";
import Success from "./common/success";

const initCommandData={
    UTC:"",
    action:"",
    duration:"",
    quaternion_1:"",
    quaternion_2:"",
    quaternion_3:"",
    quaternion_4:"",
    procedure_name:"",
    procedureNameVal:""
}

const initOption = {
    configValue:"", 
    configName:"請選擇",
}



export default function CommandProcedure(){
    const [commandList, setCommandList] = useState([initCommandData,]);
    const [form, setForm] = useState({
        originator:"",
        destination:"",
        satellite_name:"",
        instrument:"",
        startDate:null,
        endDate: null
    });
    const [generationTime, setGenerationTime] = useState("");
    const [fileName, setFileName] = useState("");
    const [actionOptions, setActionOptions] = useState([initOption]);
    const [procedureNameOptions, setProcedureNameOptions] = useState([initOption]);

    useEffect(()=>{
        fileUploadAPI.getConfigSelect("mtl").then(result=>{
            if(result.resultStatus === 'SUCCESS'){
                let options1 = []
                Object.values(result.resultObj).forEach(data=>{
                    if(data.configSubtype==='action'){
                        options1.push(data)
                    } 
                })
                setActionOptions([initOption].concat(options1))   
            }else{
                Warning(result.message || result.error)
            }
        }).catch(Warning);
        fileUploadAPI.getProcedureName().then(result=>{
            if(result.resultStatus === 'SUCCESS'){
                let convertedOptions = result.resultObj.map(data=>{
                    return {
                        configName:data.content,
                        configValue:data.value
                    }
                })
                setProcedureNameOptions([initOption].concat(convertedOptions))
            }else{
                Warning(result.message || result.error)
            }
        }).catch(Warning);

    },[])

    const maxDateRange = (current) => {
        return current.isAfter( form.startDate );
    };

    const handleStartDateChange = (value) => {
        try {
             value.format()
             setForm({
                 ...form, startDate:value
             })
        } catch(err){
             
        }
     };
 
     const handleEndDateChange = (value)=>{
         try {
             value.format()
             setForm({
                 ...form, endDate:value
             })
        } catch(err){
             
        }
     }

 
    const addNewCommand = ()=>{
        let newCommandList =[...commandList]
            newCommandList.push(initCommandData)
        setCommandList(newCommandList)
    }

    const clickSubmit = ()=>{
        const BreakError = {};
        try {
            Object.keys(form).forEach((key)=>{
                if(!form[key]){
                    Warning("請輸入" + key);
                    throw BreakError;
                }
            })
        }catch(err){
            if (err !== BreakError) throw err;
            return;
        }

        let cmdInfoIds = [];
        let checkResult = true;
        commandList.forEach(cmd=>{
            Object.keys(cmd).forEach(key=>{
                if(!cmd[key]){
                    if(key==="procedureNameVal"){
                        Warning("請選擇procedure_name")
                    } else {
                        Warning(`請輸入 ${key}`);
                    }
                    checkResult=false;
                }
            })
            cmdInfoIds.push(cmd.procedureNameVal)
        })
        if(!checkResult){
            return;
        }
        fileUploadAPI.submitMissionTimeline(
            {
                originator:form.originator,
                destination:form.destination,
                satellite_name:form.satellite_name,
                instrument:form.instrument,
                start_date:form.startDate.format(),
                end_date:form.endDate.format(),
            },
            commandList,
            cmdInfoIds
        ).then(result=>{
            if(result.resultStatus === 'SUCCESS'){
                Success("發送成功")
                setFileName(result.resultObj.header.file_name)
                setGenerationTime(result.resultObj.header.generation_time)
            }else{
                Warning(result.message || result.error)
            }
        }).catch(err=>{
            Warning(err)
        })

    }

    return (
        <StyledCommandProcedure>
            <Panel>
                <PanelBody className="p-0 topPanel">
                    <p className="mb-3 title">
                        Mission Timeline
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
                        <CustomInput label="generation_time" 
                            value={generationTime}
                        />
                        <CustomInput label="instrument"  onChange={e=>{
                            setForm({
                                ...form, instrument:e.target.value
                            })
                        }}/>
                        <CustomInput label="file_name"  
                            value={fileName}
                        />
                    </div>
                    <div>
                        <div className="form-group calendar">
                            <div className="col-lg-8">
                                <div className="row gx-2">
                                    <div className="col-6">
                                        <div className="label">Start Date</div>
                                        <DateTime value={form.startDate} inputProps={{ placeholder: 'Start Date' }} closeOnSelect={true} onChange={ handleStartDateChange } />
                                        <input className="dateInput" value={form.startDate?form.startDate.format():""} disabled/>
                                    </div>
                                    <div className="col-6">
                                        <div className="label">End Date</div>
                                        <DateTime value={form.endDate} isValidDate={ maxDateRange } inputProps={{ placeholder: 'End Date' }} closeOnSelect={true} onChange={ handleEndDateChange }/>
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
                                idx={idx}
                                key={idx}  
                                dataList={[
                                    {label:"UTC", inputType:InputType.TimeInput, value:data.UTC, options:[]},
                                    {label:"action", inputType:InputType.DropdownMenu, value:data.action, options:actionOptions},
                                    {label:"duration", inputType:InputType.TimeInput, value:data.duration, options:[]},
                                    {label:"quaternion_1", inputType:InputType.CommandInput, value:data.quaternion_1, options:[]},
                                    {label:"quaternion_2", inputType:InputType.CommandInput, value:data.quaternion_2, options:[]},
                                    {label:"quaternion_3", inputType:InputType.CommandInput, value:data.quaternion_3, options:[]},
                                    {label:"quaternion_4", inputType:InputType.CommandInput, value:data.quaternion_4, options:[]},
                                    {label:"procedure_name", inputType:InputType.CommandInput, value:data.procedure_name, options:procedureNameOptions},

                                ]}
                                onChange={(updateData)=>{
                                    // console.log(updateData)
                                    let cloneCommandList = [...commandList]
                                    let updatedCommand = {...commandList[idx],...updateData};
                                    cloneCommandList[idx] = updatedCommand;
                                    setCommandList(cloneCommandList);
                                }} 
                                onClickDeleteBtn={()=>{
                                    let targetList = commandList.filter((data, index)=> index!==idx);
                                    setCommandList(targetList);
                                }}
                                disableDeleteBtn={commandList.length <= 1}
                            />
                        );
                    })}
                </PanelBody>
            </Panel>
        </StyledCommandProcedure>
    )

}


const StyledCommandProcedure = styled.div`
    padding-bottom:200px;
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

export const CustomInput = ({label,value, onChange=(event)=>{}, placeholder})=>{
    return (
        <StyledCustomInput className="inputWrap">
            <div className="inputDiv">
                <div className="label">{label}</div>
                <input value={value} type="text" className="form-control" placeholder="" onChange={onChange}/>
            </div>
        </StyledCustomInput>
    )
}





