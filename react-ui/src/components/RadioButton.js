import React from "react";

function RadioButton({value,name})
{
    return <div>
        <div className="ps-5">
            <input className="form-check-input" type="radio" name={name}/>
            <label className="form-check-label ms-2"> {value} </label>
        </div>

    </div>
}

export default RadioButton
