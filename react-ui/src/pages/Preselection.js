import React, {useEffect, useState} from "react";
import axios from "axios";

export function Preselection() {
    const [ laureates, setLaureates ] = useState([]);

    useEffect(() => {
        axios.get("//etn-test.herokuapp.com/api/accounts/laureates")
            .then((res) => setLaureates(res.data))
            .catch((err) => console.log(err));
    })

    return(
        <ul>
            {laureates.map(({ accountId, firstname, lastname }) => {
                return (
                    <li key={accountId}>
                        <div className='col-6'>
                            <div className="card">
                                {firstname} {lastname}
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
}
