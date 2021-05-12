/**
 * LAUREATE DROPDOWN ITEM <- LAUREATE DROPDOWN <- GODFATHER MEETINGS PLANNING <- ADMIN MEETINGS PLANNING
 * Item for the laureate dropdown with laureate's name
 */

import React, {useEffect, useState} from "react"
import DropdownItem from "react-bootstrap/DropdownItem";

function LaureateDropdownItem ({ laureate, godfatherMeetings }) {
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
            //console.log(laureate.Laureate.Account.firstname+' '+laureate.Laureate.Account.lastname+' times:'+timesSelected)
            //console.log(godfatherMeetings)
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
    }, [godfatherMeetings, laureate.accountId])

    return (
        <DropdownItem eventKey={laureate.Laureate.fkAccountId}>
            {laureate.Laureate.Account.firstname} {laureate.Laureate.Account.lastname} <span className={`badge badge-${style}`}>{timesSelected}</span>
        </DropdownItem>
    )
}

export default LaureateDropdownItem
