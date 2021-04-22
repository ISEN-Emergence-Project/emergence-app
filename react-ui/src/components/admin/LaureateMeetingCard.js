import React, {useEffect, useState} from "react";

function LaureateMeetingCard({ laureate, godfatherMeetings }) {
    const [ style, setStyle ] = useState('success');
    const [ timesSelected, setTimesSelected ] = useState(0);

    useEffect(() => {
        if (godfatherMeetings) {
            let timesSelected = 0;
            // Count number of selections
            godfatherMeetings.forEach((godfatherMeeting) => {
                if (godfatherMeeting.meetings) {
                    timesSelected = godfatherMeeting.meetings.filter((m) => m.laureateId === laureate.accountId).length;
                }
            })
            setTimesSelected(timesSelected);

            if (timesSelected === 4) {
                setStyle('success');
            }
            else if (timesSelected > 4) {
                setStyle('danger');
            }
            else if (timesSelected < 4) {
                setStyle('warning');
            }
        }
    }, [godfatherMeetings])


    return (
        <div className='card-body py-2 px-3'>
            {laureate.Laureate.Account.firstname} {laureate.Laureate.Account.lastname} <span className={`badge badge-${style}`}>{timesSelected}</span>
        </div>
    )
}

export default LaureateMeetingCard
