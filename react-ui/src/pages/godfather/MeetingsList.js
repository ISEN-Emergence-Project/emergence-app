/**
 * GODFATHER MEETINGS LIST
 * Show his meetings to the godfather
 */

import React, {useEffect, useState} from "react";
import axios from "axios";

import MeetingCard from "../../components/godfather/MeetingCard";

function MeetingsList({ account }){
    const[meetings,setMeetings] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +"/api/meetings/godfather/"+ account.accountId)
            .then((res) => {
                setMeetings(res.data)
            })
            .catch((err) => console.error(err));

    }, [account.accountId]);

    function updateMeetings(meeting) {
        const filteredMeetings = meetings.filter((m) => m.fkLaureateAccountId !== meeting.fkLaureateAccountId)

        setMeetings([...filteredMeetings, meeting]);
    }

    return (
        <div className="container">
            <div className="py-5">
                <h1>Vos speed meetings</h1>
                <hr/>
            </div>

            <div className="row pb-5">
                {meetings.map((meeting) => (
                    <div className='col col-md-3 col-lg-4' key={`${meeting.fkGodfatherAccountId}-${meeting.fkLaureateAccountId}`}>
                        <MeetingCard account={account} meeting={meeting} updateMeetings={updateMeetings} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MeetingsList;
