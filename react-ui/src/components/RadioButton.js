import React from "react";

export function RadioButton({value,name})  // permet de créer des boutons radio
{
    return <div>
        <div className="ps-5">
            <input className="form-check-input" type="radio" name={name}/>
            <label className="form-check-label ms-2"> {value} </label>
        </div>

    </div>
}
