import React, {useEffect, useState} from "react";
import axios from "axios";

import LaureateDropdown from "./LaureateDropdown";
import LaureateMeetingCard from "./LaureateMeetingCard";

function GodfatherMeetings({ godfather, godfatherPreselections, godfatherMeetings, updateGodfatherMeetings }) {
    const [ preselections, setPreselections ] = useState([]);
    const [ show, setShow ] = useState(false);

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
                    <div className="d-flex flex-row flex-nowrap align-items-center">
                        <button className='btn btn-sm mr-2 py-1 px-1' onClick={() => setShow(!show)}><span className='h3'>&rsaquo;</span></button>
                        <p className='m-0 align-middle'>
                            {godfather.Account.firstname} {godfather.Account.lastname}
                        </p>
                    </div>
                </div>

                <div className="col-10">
                    <div className="row">
                        <LaureateDropdown godfather={godfather}
                                          preselections={preselections}
                                          godfatherPreselections={godfatherPreselections}
                                          godfatherMeetings={godfatherMeetings}
                                          pos={0}
                                          updateGodfatherMeetings={updateGodfatherMeetings} />
                        <LaureateDropdown godfather={godfather}
                                          preselections={preselections}
                                          godfatherPreselections={godfatherPreselections}
                                          godfatherMeetings={godfatherMeetings}
                                          pos={1}
                                          updateGodfatherMeetings={updateGodfatherMeetings} />
                        <LaureateDropdown godfather={godfather}
                                          preselections={preselections}
                                          godfatherPreselections={godfatherPreselections}
                                          godfatherMeetings={godfatherMeetings}
                                          pos={2}
                                          updateGodfatherMeetings={updateGodfatherMeetings} />
                        <LaureateDropdown godfather={godfather}
                                          preselections={preselections}
                                          godfatherPreselections={godfatherPreselections}
                                          godfatherMeetings={godfatherMeetings}
                                          pos={3}
                                          updateGodfatherMeetings={updateGodfatherMeetings} />
                    </div>
                </div>
            </div>
            <div className={`row py-2 border-bottom bg-light ${show ? null : 'd-none'}`}>
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
