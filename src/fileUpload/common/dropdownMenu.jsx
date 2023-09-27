import styled from "styled-components";

const DropdownMenu = ({labelName, options, onChange})=>{
    return (
        <StyledDropdownMenu>
            <div className="label">{labelName}</div>
            <select className="form-select">
                {options && options.map(optionData=>{
                    return <option key={optionData.configValue} value={optionData.configValue}>{optionData.configName}</option>
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