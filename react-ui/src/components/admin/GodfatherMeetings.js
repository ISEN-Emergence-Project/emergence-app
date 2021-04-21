import React, {useEffect, useState} from "react";
import axios from "axios";
import {LaureateDropdown} from "./LaureateDropdown";

function GodfatherMeetings({ godfather }) {
    const [ preselections, setPreselections ] = useState([]);

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/preselections/godfather/'+ godfather.fkAccountId)
            .then((res) => {
                setPreselections(res.data);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <>
            <div className="row py-3 border-bottom">
                <div className="col-2">
                    {godfather.Account.firstname} {godfather.Account.lastname}
                </div>

                <div className="col-8">
                    <div className="row">
                        <LaureateDropdown preselections={preselections} />
                        <LaureateDropdown preselections={preselections} />
                        <LaureateDropdown preselections={preselections} />
                        <LaureateDropdown preselections={preselections} />
                    </div>
                </div>
                <div clas
                     sName="col-2">

                </div>
            </div>
            <div className="row py-3 border-bottom">
                <div className="col-2 text-secondary text-small">
                    Lauréats<br/>présélectionnés
                </div>

                <div className="col-10">
                    <div className="row">
                        {preselections.map((preselection) => (
                            <div className='card mx-2' key={`${preselection.fkGodfatherAccountId}-${preselection.fkLaureateAccountId}`}>
                                <div className="card-body py-2">
                                    {preselection.Laureate.Account.firstname} {preselection.Laureate.Account.lastname}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GodfatherMeetings
