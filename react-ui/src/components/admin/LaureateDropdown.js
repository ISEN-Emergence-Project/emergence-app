/**
 * LAUREATE DROPDOWN <- GODFATHER MEETINGS PLANNING <- ADMIN MEETINGS PLANNING
 * Allow to choose a laureate to meet at a specific slotTime (position)
 */

import React, {useEffect, useState} from "react"
import {Dropdown} from "react-bootstrap"

import LaureateDropdownItem from "./LaureateDropdownItem";

function LaureateDropdown ({ godfather, pos, preselections, godfatherPreselections, godfatherMeetings, updateGodfatherMeetings }) {
    const [ selectedLaureate, setSelectedLaureate ] = useState({});
    const [ color, setColor ] = useState('light');

    useEffect(() => {
        if (selectedLaureate.accountId !== undefined) {
            if (isDuplicated(godfather.fkAccountId, selectedLaureate.accountId, pos)) {
                setColor('danger');
            } else {
                setColor('outline-success');
            }
        }

        function isDuplicated(godfatherId, laureateId, pos) {

            let duplicatedMeetings = godfatherMeetings
                .filter((godfatherMeeting) => {
                    // Check for duplicate in row meetings
                    const findDuplicate = godfatherMeeting.meetings.filter((m) => m.laureateId === laureateId && m.pos !== pos);
                    // For this godfather
                    return (godfatherMeeting.godfatherId === godfatherId) && !!findDuplicate.length
                })

            if (duplicatedMeetings.length) return true;


            duplicatedMeetings = godfatherMeetings
                .filter((godfatherMeeting) => {
                    // Check for duplicates in column meetings
                    const findDuplicate = godfatherMeeting.meetings.filter((m) => m.laureateId === laureateId && m.pos === pos);
                    // For the others godfathers
                    return (godfatherMeeting.godfatherId !== godfatherId) && !!findDuplicate.length;
                })

            return !!duplicatedMeetings.length;
        }
    }, [godfather.fkAccountId, godfatherMeetings, pos, selectedLaureate.accountId])

    function handleSelect(e) {
        const selectedLaureate = preselections.filter((p) => p.fkLaureateAccountId === Number.parseInt(e))[0];
        const laureateAccount = selectedLaureate.Laureate.Account;

        setSelectedLaureate(laureateAccount);
        // Update selection globally
        updateGodfatherMeetings(godfather.fkAccountId, laureateAccount.accountId, pos);
    }

    return (
        <div className='col-3'>
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
