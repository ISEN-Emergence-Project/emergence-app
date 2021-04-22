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
        console.log(godfatherMeetings);

        const duplicated = false;//checkDuplicated(godfatherId, laureateId, pos);

        let tempGodfatherMeetings = [...godfatherMeetings];
        // Create godfather array if not exists
        if (!tempGodfatherMeetings[godfatherId]) {
            tempGodfatherMeetings[godfatherId] = [];
        }
        // Create or replace godfatherMeeting
        tempGodfatherMeetings[godfatherId][pos] = {
            laureateId: laureateId,
            duplicated: duplicated
        }
        setGodfatherMeetings(tempGodfatherMeetings);
    }

    function checkDuplicated(godfatherId, laureateId, pos) {
        let duplicated = false;

        console.log(godfatherMeetings)
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
        console.log(godfatherMeetings)
        // Check duplicate for same meeting hour
        godfatherMeetings.forEach((meetings) => {
            if (meetings && meetings[pos] && meetings[pos].laureateId === laureateId) {
                duplicated = true;
            }
        })
        return duplicated;
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
