import React, {useEffect, useState} from "react";
import axios from "axios";

import GodfatherMeetingsPlanning from "../../components/admin/GodfatherMeetingsPlanning";
import {Redirect} from "react-router-dom";

function MeetingsPlanning() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const [ godfathers, setGodfathers ] = useState([]);
    const [ godfatherMeetings, setGodfatherMeetings ] = useState([]);
    const [ godfatherPreselections, setGodfatherPreselections ] = useState([]);
    const [ meetingsValid, setMeetingsValid ] = useState(false);
    const [ redirectTo, setRedirectTo ] = useState();

    const [ meetingDate, setMeetingDate ] = useState(date);
    const [ meetingBegin, setMeetingBegin ] = useState('20:00');
    const [ meetingEnd, setMeetingEnd ] = useState('21:00');

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/accounts/godfathers')
            .then((res) => {
                setGodfathers(res.data);
            })
            .catch((err) => console.error(err));

        axios.get('//etn-test.herokuapp.com/api/preselections')
            .then((res) => {
                let tempGodfatherPreselections = []

                res.data.forEach((preselection) => {
                    // Format godfather preselections
                    const existingPreselection = godfatherPreselections.find((p) => p.godfatherId === preselection.fkGodfatherAccountId);

                    if (existingPreselection) {
                        const filteredPreselections = godfatherPreselections.filter((p) => p.godfatherId !== preselection.fkGodfatherAccountId);
                        // Add a meeting to godfather meetings
                        tempGodfatherPreselections = [...filteredPreselections, {
                            godfatherId: preselection.fkGodfatherAccountId,
                            meetings: [...existingPreselection.meetings, {
                                laureateId: preselection.fkLaureateAccountId
                            }]
                        }];
                    } else {
                        // Create godfather meetings
                        tempGodfatherPreselections = [...tempGodfatherPreselections, {
                            godfatherId: preselection.fkGodfatherAccountId,
                            meetings: [{
                                laureateId: preselection.fkLaureateAccountId
                            }]
                        }];
                    }
                })
                setGodfatherPreselections(tempGodfatherPreselections);
            })
            .catch((err) => console.error(err));
    }, [])

    function handleSubmit() {
        if (isMeetingsValid()) {
            godfatherMeetings.forEach((godfatherMeeting) => {
                godfatherMeeting.meetings.forEach((meeting) => {
                    axios.post('//etn-test.herokuapp.com/api/meetings', {
                        fkGodfatherAccountId: godfatherMeeting.godfatherId,
                        fkLaureateAccountId: meeting.laureateId,
                        beginning: meetingDate,
                        ending: meetingDate
                    })
                        .then((res) => {
                            setRedirectTo('/');
                        })
                        .catch((err) => console.error(err));
                })
            })
        }
    }

    function updateGodfatherMeetings(godfatherId, laureateId, pos) {
        let tempGodfatherMeetings = godfatherMeetings

        // Find meeting in list
        const existingGodfatherMeeting = tempGodfatherMeetings.find((m) => m.godfatherId === godfatherId);

        if (existingGodfatherMeeting) {
            // Get other godfatherMeetings
            const godfatherMeetingsFiltered = godfatherMeetings.filter((m) => m.godfatherId !== godfatherId);

            let meetingsFiltered = [];
            // Get existing meetings for godfather
            if (existingGodfatherMeeting.meetings) {
                meetingsFiltered = existingGodfatherMeeting.meetings.filter((m) => m.pos !== pos);
            }
            // Update godfather meeting
            const updatedMeeting = {
                godfatherId: godfatherId,
                meetings: [...meetingsFiltered, {
                    laureateId: laureateId,
                    pos: pos
                }]
            }
            tempGodfatherMeetings = [...godfatherMeetingsFiltered, updatedMeeting]
        }
        else {
            // Create godfather meetings
            const newMeeting = {
                godfatherId: godfatherId,
                meetings: [{
                    laureateId: laureateId,
                    pos: pos
                }]
            }
            tempGodfatherMeetings = [...tempGodfatherMeetings, newMeeting]
        }
        setGodfatherMeetings(tempGodfatherMeetings);

        isMeetingsValid();
    }

    function isMeetingsValid() {
        let isValid = true;

        godfatherMeetings.forEach((godfatherMeeting) => {
            if (godfatherMeeting.meetings.length !== 4) isValid = false;
        })

        // Check if number of godfathers and number of godfatherMeeting object match
        if (godfathers.length !== godfatherMeetings.length) isValid = false;

        setMeetingsValid(isValid);
    }

    if (redirectTo) {
        return <Redirect to={redirectTo} />
    }

    return (
        <>
            <div className="container py-4">
                <div className='py-4 mb-2'>
                    <h1>Planning des Speed Meetings</h1>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <div>
                            <label className='m-0 mr-3 mt-4 mb-1' htmlFor="meetingDate"><span>Date du Speed Meeting :</span></label>
                            <input className='form-control' type="date" name="meetingDate" onChange={(e) => setMeetingDate(e.target.value)} />
                        </div>
                        <div>
                            <label className='m-0 mr-3 mt-4 mb-1' htmlFor="meetingDate"><span>Heure de début :</span></label>
                            <input className='form-control' type="time" name="meetingDate" onInput={(e) => setMeetingBegin(e.target.value)} />
                        </div>
                        <div>
                            <label className='m-0 mr-3 mt-4 mb-1' htmlFor="meetingDate"><span>Heure de fin :</span></label>
                            <input className='form-control' type="time" name="meetingDate" onChange={(e) => setMeetingEnd(e.target.value)} />
                        </div>
                    </div>
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
                        <GodfatherMeetingsPlanning godfather={godfather} godfatherPreselections={godfatherPreselections} godfatherMeetings={godfatherMeetings} updateGodfatherMeetings={updateGodfatherMeetings} />
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

export default MeetingsPlanning
