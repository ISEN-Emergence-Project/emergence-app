import React, {useEffect, useState} from "react"
import {Dropdown} from "react-bootstrap"

import LaureateDropdownItem from "./LaureateDropdownItem";

function LaureateDropdown ({ godfather, pos, preselections, godfatherPreselections, godfatherMeetings, updateSelection }) {
    const [ selectedLaureate, setSelectedLaureate ] = useState({});
    const [ color, setColor ] = useState('outline-success');

    useEffect(() => {
        if (isDuplicated(godfather.godfatherId, selectedLaureate.accountId, pos)) {
            setColor('danger');
        } else {
            setColor('outline-success');
        }
    }, [])

    function handleSelect(e) {
        const selectedLaureate = preselections.filter((p) => p.fkLaureateAccountId === Number.parseInt(e))[0];
        const laureateAccount = selectedLaureate.Laureate.Account;

        setSelectedLaureate(laureateAccount);
        // Update selection globally
        updateSelection(laureateAccount.fkLaureateAccountId);
    }

    function isDuplicated(godfatherId, laureateId, pos) {
        let duplicated = false;

        if (godfatherMeetings[godfatherId]) {
            // Check duplicate for same godfather
            godfatherMeetings[godfatherId]
                .filter((gM, index) => index !== pos)
                .forEach((meeting) => {
                    if (meeting.laureateId === laureateId) {
                        duplicated = true;
                    }
                })
        }

        // Check duplicate for same meeting hour
        godfatherMeetings.forEach((meetings) => {
            if (meetings && meetings[pos] && meetings[pos].laureateId === laureateId) {
                duplicated = true;
            }
        })
        return duplicated;
    }

    return (
        <div className='col'>
            <Dropdown onSelect={handleSelect}>
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
