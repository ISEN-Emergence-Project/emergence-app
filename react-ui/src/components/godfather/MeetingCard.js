/**
 * MEETING CARD COMPONENT <- GODFATHER MEETINGS LIST PAGE
 * Show informations about a meeting
 */

import React, {useEffect, useState} from "react";
import axios from "axios";

import MeetingRating from "./MeetingRating";

function MeetingCard({ account, meeting, updateMeetings }) {
    const [ laureate, setLaureate] = useState({});

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +"/api/accounts/"+ meeting.fkLaureateAccountId)
            .then((res) => {
                setLaureate(res.data);
            })
            .catch((err) => console.error(err));
    }, [meeting.fkLaureateAccountId]);


    function updateRating (laureateId, godfatherRating) {
        axios.put(process.env.REACT_APP_API_HOST +"/api/meetings/godfather/"+ account.accountId +"/laureate/"+ laureateId,{
            godfatherRating: godfatherRating
        })
            .then(res => {
                updateMeetings(res.data);
            })
            .catch(error => console.error("There was an error",error))
    }

    return (
        <div className="card m-2">
            <div className="card-header">

                Speed meeting {meeting.timeSlot}
            </div>
            <div className="card-body">
                <h3 className='mb-4'>{laureate.firstname} {laureate.lastname}</h3>
                <hr/>
                <MeetingRating meeting={meeting} updateRating={updateRating} />
            </div>
        </div>
    )
}

export default MeetingCard;
