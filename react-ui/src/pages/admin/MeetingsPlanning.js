import React, {useEffect, useState} from "react";
import axios from "axios";

import GodfatherMeetings from "../../components/admin/GodfatherMeetings";

function MeetingsPlanning() {
    const [ godfathers, setGodfathers ] = useState([]);
    const [ godfatherMeetings, setGodfatherMeetings ] = useState([]);
    const [ godfatherPreselections, setGodfatherPreselections ] = useState([]);

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/accounts/godfathers')
            .then((res) => {
                setGodfathers(res.data);
            })
            .catch((err) => console.error(err));

        axios.get('//etn-test.herokuapp.com/api/preselections')
            .then((res) => {
                res.data.forEach((preselection) => {
                    // Format godfather preselections
                    const index = godfatherPreselections.findIndex((m) => m.godfatherId === preselection.fkGodfatherAccountId);

                    if (index > -1) {
                        // Add a meeting to godfather meetings
                        godfatherPreselections[index].meetings.push({
                            laureateId: preselection.fkLaureateAccountId,
                            duplicated: false
                        })
                    } else {
                        // Create godfather meetings
                        godfatherPreselections.push({
                            godfatherId: preselection.fkGodfatherAccountId,
                            meetings: [{
                                laureateId: preselection.fkLaureateAccountId,
                                duplicated: false
                            }]
                        })
                    }
                })

                setGodfatherPreselections(godfatherPreselections);
                console.log('Preselections: ', godfatherPreselections)
            })
            .catch((err) => console.error(err));
    }, [])

    function updateGodfatherMeetings(godfatherId, laureateId, pos) {
        console.log('UpdateGodfatherMeetings : ', godfatherId, laureateId, pos);

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

            const updatedMeeting = {
                godfatherId: godfatherId,
                meetings: [...meetingsFiltered, {
                    laureateId: laureateId,
                    pos: pos
                }]
            }

            tempGodfatherMeetings = [...godfatherMeetingsFiltered, updatedMeeting]
        } else {
            // Create godfather meetings
            const newMeeting = {
                godfatherId: godfatherId,
                meetings: [{
                    laureateId: laureateId,
                    pos: pos
                }]
            }
            tempGodfatherMeetings = [...tempGodfatherMeetings, newMeeting]
            console.log('new: ', tempGodfatherMeetings)
        }
        setGodfatherMeetings(tempGodfatherMeetings);
    }

    return (
        <div className="container py-4">
            <div className="row py-2 border-bottom">
                <div className="col-2">
                    Parrains
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col border-left">20h</div>
                        <div className="col border-left">20h20</div>
                        <div className="col border-left">20h40</div>
                        <div className="col border-left">21h</div>
                    </div>
                </div>
            </div>
            {godfathers.map((godfather) => (
                <div className='' key={godfather.fkAccountId}>
                    <GodfatherMeetings godfather={godfather} godfatherPreselections={godfatherPreselections} godfatherMeetings={godfatherMeetings} updateGodfatherMeetings={updateGodfatherMeetings} />
                </div>
            ))}
        </div>
    )
}

export default MeetingsPlanning
