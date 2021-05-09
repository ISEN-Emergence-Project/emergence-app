import React, {useEffect, useState} from "react";
import axios from "axios";

function FinalMatch({ match }) {
    const [ godfather, setGodfather ] = useState({});
    const [ laureate, setLaureate ] = useState({});
    const [ meeting, setMeeting ] = useState({});

    const matchScore = (meeting.godfatherRating + meeting.laureateRating) / 2;

    let badgeStyle = 'danger';
    // Set style according to matchScore
    if (matchScore >= 3) {
        badgeStyle = 'success';
    }
    else if (matchScore >= 2) {
        badgeStyle = 'warning';
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +"/api/accounts/"+ match.fkGodfatherAccountId)
            .then((res) => {
                setGodfather(res.data);
            })
            .catch((err) => console.error(err));

        axios.get(process.env.REACT_APP_API_HOST +"/api/accounts/"+ match.fkLaureateAccountId)
            .then((res) => {
                setLaureate(res.data);
            })
            .catch((err) => console.error(err));

        axios.get(process.env.REACT_APP_API_HOST +"/api/meetings/godfather/"+ match.fkGodfatherAccountId +"/laureate/"+ match.fkLaureateAccountId)
            .then((res) => {
                setMeeting(res.data);
            })
            .catch((err) => console.error(err));
    }, [match.fkGodfatherAccountId, match.fkLaureateAccountId])

    return (
        <>
            <div className='col-3'>
                <div className="card shadow-sm">
                    <div className="card-body py-2 px-3">{godfather.firstname} {godfather.lastname}</div>
                </div>
            </div>

            <div className="col-1 p-0">
                <h2 className='m-0 text-center'><span className={`badge badge-${badgeStyle}`}>{matchScore}</span></h2>
            </div>

            <div className='col-3'>
                <div className="card shadow-sm">
                    <div className="card-body py-2 px-3">{laureate.firstname} {laureate.lastname}</div>
                </div>
            </div>
        </>
    )
}

export default FinalMatch;
