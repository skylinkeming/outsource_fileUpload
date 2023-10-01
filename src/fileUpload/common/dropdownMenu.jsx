import styled from "styled-components";

const DropdownMenu = ({labelName, options, value, onChange})=>{
    return (
        <StyledDropdownMenu>
            <div className="label">{labelName}</div>
            <select className="form-select" 
                value={value} 
                onChange={(e)=>{
                    onChange({[labelName]:e.target.value})
                }
            }>
                {options && options.map((optionData, idx)=>{
                    return <option key={optionData.configValue+idx} value={optionData.configValue}>{optionData.configName}</option>
                })}
            </select>
        </StyledDropdownMenu>
    )
}

const StyledDropdownMenu = styled.div`  
    padding: 10px 0;
    display:flex;
    border-bottom:1px solid gray;
    .label {
        min-width: 150px;
    }
`;


export default DropdownMenu;