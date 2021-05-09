import React, {useEffect, useState} from "react";
import axios from "axios";
import GodfatherMeetingsResults from "../../components/admin/GodfatherMeetingsResults";
import {Redirect} from "react-router-dom";

function ChooseMatches() {
    const [ godfathers, setGodfathers ] = useState([]);
    const [ selectedMeetings, setSelectedMeetings ] = useState([]);
    const [ meetingsValid, setMeetingsValid ] = useState(false);
    const [ redirectTo, setRedirectTo ] = useState();

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
                .then(() => {
                    setRedirectTo('/')
                })
                .catch((err) => console.error(err));
        })
    }

    function updateMeetings(godfatherId, laureateId) {
        const existingMeeting = selectedMeetings.find((m) => m.godfatherId === godfatherId);

        let tempSelectedMeetings;
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

                <div className="row py-2 border-bottom bg-light">
                    <div className="col-2">
                        Speed Meeting
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col border-left">1</div>
                            <div className="col border-left">2</div>
                            <div className="col border-left">3</div>
                            <div className="col border-left">4</div>
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
                        <p className='m-0 mr-3 text-muted text-small'/>
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
