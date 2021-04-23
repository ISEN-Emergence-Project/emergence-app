import React, {useEffect, useState} from "react";
import axios from "axios";
import LaureateMeetingResultCard from "./LaureateMeetingResultCard";


function GodfatherMeetingsResults({ godfather, selectedMeetings, updateMeetings }) {
    const [ showDetails, setShowDetails ] = useState(false);
    const [ meetings, setMeetings ] = useState([]);
    const [ selectedLaureate, setSelectedLaureate ] = useState();

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/meetings/godfather/'+ godfather.fkAccountId)
            .then((res) => {
                setMeetings(res.data);
            })
            .catch((err) => console.error(err));
    }, [])

    function handleSelect(godfatherId, laureateId) {
        updateMeetings(godfatherId, laureateId);
        // Update locally
        setSelectedLaureate(laureateId);
    }

    return (
        <>
            <div className="row py-3 border-bottom">
                <div className="col-2">
                    <div className="d-flex flex-row flex-nowrap align-items-center">
                        <button className='btn btn-sm mr-2 py-1 px-1' onClick={() => setShowDetails(!showDetails)}><span className='h3'>&rsaquo;</span></button>
                        <p className='m-0 align-middle'>
                            {godfather.Account.firstname} {godfather.Account.lastname}
                        </p>
                    </div>
                </div>

                <div className="col-10">
                    <div className="row">
                        {meetings.map((meeting) => {
                            const meetingId = meeting.fkGodfatherAccountId +'-'+ meeting.fkLaureateAccountId;
                            return (
                                <div className="col-3 cursor-pointer" key={`${meetingId}`}
                                     onClick={() => handleSelect(meeting.fkGodfatherAccountId, meeting.fkLaureateAccountId)}>
                                    <LaureateMeetingResultCard meeting={meeting} selectedLaureate={selectedLaureate} selectedMeetings={selectedMeetings} showDetails={showDetails} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GodfatherMeetingsResults
