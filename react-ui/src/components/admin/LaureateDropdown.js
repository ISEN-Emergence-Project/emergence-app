import React, {useEffect, useState} from "react"
import {Dropdown} from "react-bootstrap"

import LaureateDropdownItem from "./LaureateDropdownItem";

function LaureateDropdown ({ godfather, pos, preselections, godfatherPreselections, godfatherMeetings, updateGodfatherMeetings }) {
    const [ selectedLaureate, setSelectedLaureate ] = useState({});
    const [ color, setColor ] = useState('outline-success');

    useEffect(() => {
        if (selectedLaureate.accountId !== undefined) {
            if (isDuplicated(godfather.fkAccountId, selectedLaureate.accountId, pos)) {
                setColor('danger');
            } else {
                setColor('outline-success');
            }
        }
    }, [godfatherMeetings])

    function handleSelect(e) {
        const selectedLaureate = preselections.filter((p) => p.fkLaureateAccountId === Number.parseInt(e))[0];
        const laureateAccount = selectedLaureate.Laureate.Account;

        setSelectedLaureate(laureateAccount);
        // Update selection globally
        updateGodfatherMeetings(godfather.fkAccountId, laureateAccount.accountId, pos);
    }

    function isDuplicated(godfatherId, laureateId, pos) {
        console.log('isDuplicated: ', godfatherId, laureateId, pos, godfatherMeetings);
        let duplicated = false;

        // Check for duplicate in godfather lines (except same position
        let duplicatedMeetings = godfatherMeetings
            .filter((godfatherMeeting) => {
                const findDuplicate = godfatherMeeting.meetings.filter((m) => m.laureateId === laureateId && m.pos !== pos);

                return (godfatherMeeting.godfatherId === godfatherId) && !!findDuplicate.length
            })

        if (duplicatedMeetings.length) duplicated = true;

        console.log('duplicatedMeeting row:', duplicatedMeetings)

        // Check for duplicates in column (same position for other godfathers)
        duplicatedMeetings = godfatherMeetings
            .filter((godfatherMeeting) => {
                const findDuplicate = godfatherMeeting.meetings.filter((m) => m.laureateId === laureateId && m.pos === pos);

                return (godfatherMeeting.godfatherId !== godfatherId) && !!findDuplicate.length;
            })

        if (duplicatedMeetings.length) duplicated = true;

        console.log('duplicatedMeeting column:', duplicatedMeetings)

        console.log('> duplicated: '+duplicated)

        return duplicated;
    }

    return (
        <div className='col'>
            <Dropdown onSelect={handleSelect} className='shadow-sm'>
                <Dropdown.Toggle className="btn container-fluid py-2" variant={color}>
                    {selectedLaureate.accountId ? selectedLaureate.firstname +' '+ selectedLaureate.lastname : 'Choisir'}&nbsp;
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {preselections.map((preselection) => (
                        <div className='' key={`${preselection.fkGodfatherAccountId}-${preselection.fkLaureateAccountId}`}>
                            <LaureateDropdownItem laureate={preselection} godfatherMeetings={godfatherMeetings} />
                        </div>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default LaureateDropdown
