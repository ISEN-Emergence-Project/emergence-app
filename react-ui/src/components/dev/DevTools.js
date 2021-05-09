import React from "react";

function DevTools({ phase, updatePhase }) {

    return (
        <div className='container-fluid bg-warning'>
            <div className="container py-2">
                <b className='mr-4'>DevTools</b>
                <label className='m-0 mr-2' htmlFor='selectPhase'>Phase selector</label>
                <select value={phase.phaseId} className="form-select" id='selectPhase'
                        onChange={(e) => updatePhase(e.target.value)}>
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
