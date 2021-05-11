/**
 * MEETING CARD COMPONENT <- LAUREATE MEETINGS LIST PAGE
 * Show informations about a meeting
 */

import React, {useEffect, useState} from "react";
import axios from "axios";

import MeetingRating from "./MeetingRating";

function MeetingCard({ account, meeting, updateMeetings }) {
    const [ godfather, setGodfather] = useState({});

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +"/api/accounts/"+ meeting.fkGodfatherAccountId)
            .then((res) => {
                setGodfather(res.data);
            })
            .catch((err) => console.error(err));
    }, [meeting.fkGodfatherAccountId]);


    function updateRating (godfatherId, laureateRating) {
        axios.put(process.env.REACT_APP_API_HOST +"/api/meetings/godfather/"+ godfatherId +"/laureate/"+ account.accountId,{
            laureateRating: laureateRating
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
                <h3 className='mb-4'>{godfather.firstname} {godfather.lastname}</h3>
                <hr/>
                <MeetingRating meeting={meeting} updateRating={updateRating} />
            </div>
        </div>
    )
}

export default MeetingCard;
