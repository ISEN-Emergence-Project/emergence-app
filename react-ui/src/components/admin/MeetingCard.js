/**
 * MEETING CARD <- MEETING LIST GODFATHER <- ADMIN MEETINGS LIST PAGE
 * Show laureate's information
 */

import React, {useEffect, useState} from "react";
import axios from "axios";

function MeetingCard({ meeting }) {
    const [ laureate, setLaureate ] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +'/api/accounts/'+ meeting.fkLaureateAccountId)
            .then((res) => {
                setLaureate(res.data);
            })
            .catch((err) => console.error(err));
    }, [meeting.fkLaureateAccountId])

    return (
        <div className='card mx-2 shadow-sm'>
            <div className="card-body py-2 px-3">
                {laureate.firstname} {laureate.lastname}
            </div>
        </div>
    )
}

export default MeetingCard
