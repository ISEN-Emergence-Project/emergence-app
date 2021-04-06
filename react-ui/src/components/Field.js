import React from "react";

import Star from "./Star"


function Field({name, value,onChange,children})           // cration des champs de texte
{
    return <div>
      <label htmlFor={name}> {children} <Star></Star> </label>
      <input type="text" required placeholder="Votre réponse" value = {value} onChange={onChange} id={name} name={name} className="form-control mt-3"/>
    </div>
}

export default Field
