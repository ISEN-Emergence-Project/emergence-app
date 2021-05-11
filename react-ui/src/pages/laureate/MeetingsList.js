import React, {useEffect, useState} from "react";
import axios from "axios";

import MeetingCard from "../../components/laureate/MeetingCard";

function MeetingsList({ account }){
    const[meetings,setMeetings] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +"/api/meetings/laureate/"+ account.accountId)
            .then((res) => {
                setMeetings(res.data)
            })
            
        })
        
        .catch(error => console.error("There was an error",error)) 
       
    },[]);

    },[account.accountId]);

    function updateMeetings(meeting) {
        const filteredMeetings = meetings.filter((m) => m.fkGodfatherAccountId !== meeting.fkGodfatherAccountId)

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

