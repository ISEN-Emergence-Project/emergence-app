import React from "react";

export function PlanningCard({godfatherName,laureateName})
{
    return <div>
                <div class="col-sm-2 card-header text-center bg-info mt-5">
                    <p>  {godfatherName + " / " + laureateName} </p>
                </div>
    </div>
}