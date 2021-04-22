import React, {useEffect, useState} from "react";
import axios from "axios";

import LaureateDropdown from "./LaureateDropdown";
import LaureateMeetingCard from "./LaureateMeetingCard";

function GodfatherMeetings({ godfather, godfatherPreselections, godfatherMeetings, updateGodfatherMeetings }) {
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
                <div className="col-2 align-middle">
                    {godfather.Account.firstname} {godfather.Account.lastname}
                </div>

                <div className="col-10">
                    <div className="row">
                        <LaureateDropdown godfather={godfather}
                                          preselections={preselections}
                                          godfatherPreselections={godfatherPreselections}
                                          godfatherMeetings={godfatherMeetings}
                                          pos={0}
                                          updateSelection={(laureateId) => updateGodfatherMeetings(godfather.fkAccountId, laureateId, 0)} />
                        <LaureateDropdown godfather={godfather}
                                          preselections={preselections}
                                          godfatherPreselections={godfatherPreselections}
                                          godfatherMeetings={godfatherMeetings}
                                          pos={1}
                                          updateSelection={(laureateId) => updateGodfatherMeetings(godfather.fkAccountId, laureateId, 1)} />
                        <LaureateDropdown godfather={godfather}
                                          preselections={preselections}
                                          godfatherPreselections={godfatherPreselections}
                                          godfatherMeetings={godfatherMeetings}
                                          pos={2}
                                          updateSelection={(laureateId) => updateGodfatherMeetings(godfather.fkAccountId, laureateId, 2)} />
                        <LaureateDropdown godfather={godfather}
                                          preselections={preselections}
                                          godfatherPreselections={godfatherPreselections}
                                          godfatherMeetings={godfatherMeetings}
                                          pos={3}
                                          updateSelection={(laureateId) => updateGodfatherMeetings(godfather.fkAccountId, laureateId, 3)} />
                    </div>
                </div>
            </div>
            <div className="row py-2 border-bottom bg-light">
                <div className="col-2 text-secondary text-small">
                    Lauréats<br/>présélectionnés
                </div>

                <div className="col-10">
                    <div className="row">
                        {preselections.map((preselection) => (
                            <div className='card shadow-sm mx-2 my-1' key={`${preselection.fkGodfatherAccountId}-${preselection.fkLaureateAccountId}`}>
                                <LaureateMeetingCard laureate={preselection} godfatherMeetings={godfatherMeetings}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GodfatherMeetings
