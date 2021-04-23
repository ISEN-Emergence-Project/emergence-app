import React, {useEffect, useState} from "react";
import MeetingCard from "./MeetingCard";
import axios from "axios";

function MeetingListGodfather({ godfather }) {
    const [ meetings, setMeetings ] = useState([]);

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/meetings/godfather/'+ godfather.fkAccountId)
            .then((res) => {
                setMeetings(res.data);
            })
            .catch((err) => console.error(err));
    }, [])

    return (
        <div className="row py-3 border-bottom">
            <div className="col-2">
                <div className="d-flex flex-row flex-nowrap align-items-center">
                    <p className='m-0 align-middle'>
                        {godfather.Account.firstname} {godfather.Account.lastname}
                    </p>
                </div>
            </div>

            <div className="col-10">
                <div className="row">
                    {meetings.map((meeting) => (
                        <div className="col-3" key={`${meeting.fkGodfatherAccountId}-${meeting.fkLaureateAccountId}`}>
                            <MeetingCard meeting={meeting} godfather={godfather}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MeetingListGodfather
