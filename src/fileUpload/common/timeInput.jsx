import { useState } from "react";
import moment from 'moment';
import DateTime from 'react-datetime';


const TimeInput = ({labelName, onChange})=>{
    const [date, setDate] = useState();

    const handleChange = (date) => {
        setDate(date)
    }

    return (
        <div className="timeInput">
            <div className="label">{labelName}</div>
            <div className="inputDiv">
                <div className="calendar">
                    <DateTime inputProps={{ placeholder: 'year/mm/dd' }} closeOnSelect={true} onChange={ handleChange } />
                </div>
                <input disabled type="text" value={date?moment(date).format():""} className="form-control" placeholder="" onChange={onChange}/>
            </div>
        </div>
    )
}

export default TimeInput;