import styled from "styled-components";
import TimeInput from "./timeInput";
import CommandInput from "./commandInput";
import DropdownMenu from "./dropdownMenu";

export const InputType = {
    TimeInput:1,
    DropdownMenu:2,
    CommandInput:3
}


const SingleCommandPanel = ({idx, dataList, onChange,disableDeleteBtn,onClickDeleteBtn})=>{
    
    return (
        <StyledCommandPanel>
            <div className="panelWrap">
                <div className="num">
                    {idx+1}
                </div>
                <div className="commandContent">
                    {dataList.map((data)=>{
                        switch(data.inputType){
                            case InputType.TimeInput:{
                                return  <TimeInput 
                                            key={data.label}
                                            labelName={data.label} 
                                            value={data.value} 
                                            onChange={onChange}
                                        />;
                            }
                            case InputType.DropdownMenu:{
                                return  <DropdownMenu 
                                            key={data.label}
                                            labelName={data.label} 
                                            options={data.options}  
                                            value={data.value}
                                            onChange={onChange}
                                        />
                            }
                            case InputType.CommandInput:{
                                return  <CommandInput 
                                            key={data.label}
                                            labelName={data.label}
                                            value={data.value}
                                            onChange={onChange}
                                            options={data.options}
                                        />
                            }
                            default:{
                                return <></>
                            }
                        }
                    })} 
                    <div className="btnDiv">
                        <button type="button" className="btn btn-warning me-1 mb-1" style={{
                            opacity:disableDeleteBtn?"0.5":"1",
                            pointerEvents:disableDeleteBtn?"none":"initial"
                        }}
                            onClick={onClickDeleteBtn}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </StyledCommandPanel>
    )
}


const StyledCommandPanel = styled.div`
    display:inline-block;
    width:calc(50% - 5px);
    @media (max-width:960px){
        width:100%;
    }
    .panelWrap {
        display:flex;
        align-items: stretch;
        width:100%;
        border-radius: 5px;
        padding: 10px;
    }
    .num {
        width:50px;
        border:1px solid #ffbdbc;
        min-height: 200px;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        align-items: center;
        font-size: 20px;
    }
    .commandContent {
        width: 100%;
        min-height:200px;
        border: 1px solid #348fe2;
        border-radius: 10px;
        padding: 10px;
        margin-left: 5px;
        .commandInput {
            display:flex;
            align-items:center;
            padding: 10px 0;
            border-bottom: 1px solid gray;
            .label{
                min-width: 150px;
            }
            .inputDiv {
                width: 100%;
                position:relative;
            }
            input {
                width:100%;
            }

            .options {
                background: white;
                border: 1px solid;
                position: absolute;
                width: 100%;
                max-height: 200px;
                overflow: auto;
                z-index:2;
                padding:0 10px;
                font-size: 14px;
                .option:hover {
                    background: gray;
                    color:white;
                    cursor:pointer;
                }
            }
        }
        .timeInput {
            display:flex;
            padding:10px 0;
            border-bottom:1px solid gray;
            .label {
                min-width: 150px;
            }
            .inputDiv{
                width: 100%;
                .calendar{
                    margin-bottom:10px;
                }
            }
        }
    }
    .btnDiv {
        text-align: right;
        padding: 15px 0 10px 0;
        min-height: 62.75px;
    }

`;

export default SingleCommandPanel;