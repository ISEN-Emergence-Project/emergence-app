import React from "react";

function PlanningCard({godfatherName,laureateName})
{
    return <div>
                <div className="col-sm-2 card-header text-center bg-info mt-5">
                    <h5>  {godfatherName + " / " + laureateName} </h5>
                </div>
    </div>
}


export default PlanningCard
