/**
 * DEVELOPER TOOLS MENU BAR
 * Usefull tools for development
 * Only for testing, should be removed in production
 */

import React from "react";
import axios from "axios";

function DevTools({ phase, setPhase }) {
    function handlePhaseChange(e) {
        axios.get(process.env.REACT_APP_API_HOST +'/api/phases/'+ e.target.value)
            .then((res) => {
                setPhase(res.data);
            })
            .catch((err) => console.log(err));

        axios.put(process.env.REACT_APP_API_HOST +'/api/forms/latest', {
            fkPhaseId: e.target.value
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='container-fluid bg-warning'>
            <div className="container py-2">
                <b className='mr-4'>DevTools</b>
                <label className='m-0 mr-2' htmlFor='selectPhase'>Phase selector</label>
                <select value={phase.phaseId} className="form-select" id='selectPhase' onChange={handlePhaseChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </div>
        </div>
    )
}

export default DevTools
