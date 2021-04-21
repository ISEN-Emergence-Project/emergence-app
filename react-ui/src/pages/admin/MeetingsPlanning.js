import React, {useEffect, useState} from "react";
import axios from "axios";

import GodfatherMeetings from "../../components/admin/GodfatherMeetings";

function MeetingsPlanning() {
    const [ godfathers, setGodfathers ] = useState([]);

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/accounts/godfathers')
            .then((res) => {
                setGodfathers(res.data);
            })
            .catch((err) => console.error(err));
    }, [])

    return (
        <div className="container py-4">
            <div className="row py-2 border-bottom">
                <div className="col-2">
                    Parrains
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col border-left">20h</div>
                        <div className="col border-left">20h20</div>
                        <div className="col border-left">20h40</div>
                        <div className="col border-left">21h</div>
                    </div>
                </div>
                <div className="col-2">

                </div>
            </div>
            {godfathers.map((godfather) => (
                <div className='py-2' key={godfather.fkAccountId}>
                    <GodfatherMeetings godfather={godfather} />
                </div>
            ))}
        </div>
    )
}

export default MeetingsPlanning
