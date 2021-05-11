/**
 * CHOOSE MATCHES PAGE
 * Show the meetings results and ratings,
 * allow admin to choose the final matches
 */

import React, {useEffect, useState} from "react";
import axios from "axios";
import GodfatherMeetingsResults from "../../components/admin/GodfatherMeetingsResults";
import {Redirect} from "react-router-dom";

function ChooseMatches() {
    const [ godfathers, setGodfathers ] = useState([]);
    const [ meetings, setMeetings ] = useState([]);
    const [ selectedMeetings, setSelectedMeetings ] = useState([]);
    const [ meetingsValid, setMeetingsValid ] = useState(false);
    const [ redirectTo, setRedirectTo ] = useState();

    const [ meetingBegin, setMeetingBegin ] = useState('20:00');
    const [ meetingEnd, setMeetingEnd ] = useState('21:00');

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +'/api/accounts/godfathers')
            .then((res) => {
                setGodfathers(res.data);
            })
            .catch((err) => console.error(err));
    }, [])

    function handleSubmit() {
        selectedMeetings.forEach((match) => {
            axios.post(process.env.REACT_APP_API_HOST +'/api/matches', {
                fkGodfatherAccountId: match.godfatherId,
                fkLaureateAccountId: match.laureateId
            })
                .then((res) => {
                    setRedirectTo('/')
                })
                .catch((err) => console.error(err));
        })
    }

    function updateMeetings(godfatherId, laureateId) {
        const existingMeeting = selectedMeetings.find((m) => m.godfatherId === godfatherId);

        let tempSelectedMeetings = selectedMeetings;
        // Check if meeting associated with godfather already exists
        if (existingMeeting) {
            const filteredMeetings = selectedMeetings.filter((m) => m.godfatherId !== godfatherId);

            tempSelectedMeetings = [...filteredMeetings, {
                godfatherId: godfatherId,
                laureateId: laureateId
            }]
        } else {
            tempSelectedMeetings = [...selectedMeetings, {
                godfatherId: godfatherId,
                laureateId: laureateId
            }]
        }
        setSelectedMeetings(tempSelectedMeetings);

        isMeetingsValid();
    }

    function isMeetingsValid() {
        let isValid = true;

        selectedMeetings.forEach((selectedMeeting) => {
            if (selectedMeeting.meetings.length !== 4) isValid = false;
        })

        // Check if number of godfathers and number of selectedMeetings object match
        if (godfathers.length !== selectedMeetings.length) isValid = false;

        setMeetingsValid(isValid);
    }

    if (redirectTo) {
        return <Redirect to={redirectTo} />
    }

    return (
        <>
            <div className="container py-4">
                <div className='py-4 mb-2'>
                    <h1>Résultats des Speed Meetings</h1>
                    <hr/>
                </div>

                <div className="row py-2 my-4 border-bottom bg-light">
                    <div className="col-2">
                        Parrains
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col border-left">{meetingBegin.replace(':', 'h')}</div>
                            <div className="col border-left">{}</div>
                            <div className="col border-left">20h40</div>
                            <div className="col border-left">{meetingEnd.replace(':', 'h')}</div>
                        </div>
                    </div>
                </div>

                {godfathers.map((godfather) => (
                    <div className='' key={godfather.fkAccountId}>
                        <GodfatherMeetingsResults godfather={godfather} selectedMeetings={selectedMeetings} updateMeetings={updateMeetings} />
                    </div>
                ))}

                <div className="py-4 my-4"/>
            </div>

            <div className="container-fluid fixed-bottom bg-light shadow border-top">
                <div className="d-flex flex-nowrap flex-column flex-sm-row px-4">
                    <div className="flex-row flex-wrap">
                    </div>
                    <div className='d-flex flex-nowrap align-items-center ml-auto py-2 '>
                        <p className='m-0 mr-3 text-secondary text-small'></p>
                        {meetingsValid ? (
                            <button className='btn btn-success my-2' onClick={handleSubmit}>Valider</button>
                        ) : (
                            <button className='btn btn-danger cursor-not-allowed my-2' disabled data-toggle="tooltip" data-placement="top" title="">Valider</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChooseMatches
