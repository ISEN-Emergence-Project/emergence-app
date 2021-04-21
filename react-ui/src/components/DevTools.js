import React from "react";

function DevTools({ phase, setPhase }) {
    return (
        <div className='container-fluid bg-warning'>
            <div className="container py-2">
                <b className='mr-4'>DevTools</b>
                <label className='m-0 mr-2' htmlFor='selectPhase'>Phase selector</label>
                <select className="form-select" id='selectPhase' onChange={(e) => setPhase(e.target.value)}>
                    <option selected={phase === 1} value="1">1</option>
                    <option selected={phase === 2} value="2">2</option>
                    <option selected={phase === 3} value="3">3</option>
                    <option selected={phase === 4} value="4">4</option>
                    <option selected={phase === 5} value="5">5</option>
                    <option selected={phase === 6} value="6">6</option>
                    <option selected={phase === 7} value="7">7</option>
                </select>
            </div>
        </div>
    )
}

export default DevTools
