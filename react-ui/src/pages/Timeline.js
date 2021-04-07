import React from "react";
import {Planning} from"./Planning"

export function Timeline()  // Crée le tableau (en cours)
{
    return <div>
        <table class="table table-hover table-bordered bg-light">
            <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col">| 20h</th>
                <th scope="col">| 20h15</th>
                <th scope="col">| 20h30</th>
                </tr>
            </thead>
            <tbody>
                <tr><Planning/>
                    <td className="col-2">Parrain 1 </td>
                    <td className="col-6"> </td>
                </tr>
                <tr>
                    <td>Parrain 2 </td>
                </tr>
                <tr>
                    <td>Parrain 3 </td>
                </tr>
            </tbody>
        </table>
    </div>
}
