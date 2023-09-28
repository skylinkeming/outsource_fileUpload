const CommandInput = ({labelName,value, onChange})=>{
    return (
        <div className="commandInput">
            <div className="label">{labelName}</div>
            <div className="inputDiv">
                <input type="text" value={value} className="form-control" placeholder="" onChange={(e)=>{
                    onChange({[labelName]:e.target.value})
                }}/>
            </div>
        </div>
    )
}


export default CommandInput;