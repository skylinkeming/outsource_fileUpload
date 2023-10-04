import { useState } from "react";
import moment from 'moment';
import DateTime from 'react-datetime';


const TimeInput = ({labelName, value, onChange})=>{
    // const [date, setDate] = useState();

    const handleChange = (date) => {
        // setDate(date)
        onChange({[labelName]: date})
    }

    return (
        <div className="timeInput">
            <div className="label">{labelName}</div>
            <div className="inputDiv">
                <div className="calendar">
                    <DateTime value={value} inputProps={{ placeholder: 'year/mm/dd' }} closeOnSelect={true} onChange={ handleChange } utc={true}/>
                </div>
                <input disabled type="text" value={value? moment(value).format():""} className="form-control" placeholder="" onChange={onChange}/>
            </div>
        </div>
    )
}

export default TimeInput;