import React, {useEffect, useState} from "react";
import axios from "axios";
import MeetingCard from "../../components/admin/MeetingCard";
import LaureateDropdown from "../../components/admin/LaureateDropdown";
import LaureateMeetingCard from "../../components/admin/LaureateMeetingCard";
import MeetingListGodfather from "../../components/admin/MeetingListGodfather";

function MeetingsList() {
    const [ meetings, setMeetings ] = useState([]);
    const [ godfathers, setGodfathers ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const [ meetingBegin, setMeetingBegin ] = useState('20:00');
    const [ meetingEnd, setMeetingEnd ] = useState('21:00');

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/meetings/')
            .then((res) => {
                setMeetings(res.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));

        axios.get('//etn-test.herokuapp.com/api/accounts/godfathers')
            .then((res) => {
                setGodfathers(res.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    },[]);

    return(
        <>
            {loading? (
                <div className="d-flex justify-content-center  mt-4">
                    <div className="spinner-border text-success" role="status"/>
                    <span className="visually-hidden ms-5"> Chargement </span>
                </div>
            ) : (
                <div className="container py-4">
                    <div className='py-4 mb-2'>
                        <h1>Liste des Speed Meetings</h1>
                        <hr/>
                    </div>

                    <div className="row py-2 border-bottom bg-light">
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
                            <MeetingListGodfather godfather={godfather} />
                        </div>
                    ))}

                    <div className="py-4 my-4"/>
                </div>
            )}
        </>
    );
}

export default MeetingsList
