const CommandInput = ({labelName, onChange})=>{
    return (
        <div className="commandInput">
            <div className="label">{labelName}</div>
            <div className="inputDiv">
                <input type="text" className="form-control" placeholder="" onChange={onChange}/>
            </div>
        </div>
    )
}


export default CommandInput;