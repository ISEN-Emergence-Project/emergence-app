import React, {useEffect, useState} from "react"
import DropdownItem from "react-bootstrap/DropdownItem";

function LaureateDropdownItem ({ laureate, godfatherMeetings }) {
    const [ style, setStyle ] = useState('success');
    const [ timesSelected, setTimesSelected ] = useState(0);

    useEffect(() => {
        if (godfatherMeetings) {
            const timesSelected = godfatherMeetings.filter((m, index) => index === laureate.accountId).length;
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
        <DropdownItem eventKey={laureate.Laureate.fkAccountId}>
            {laureate.Laureate.Account.firstname} {laureate.Laureate.Account.lastname} <span className={`badge badge-${style}`}>{timesSelected}</span>
        </DropdownItem>
    )
}

export default LaureateDropdownItem
