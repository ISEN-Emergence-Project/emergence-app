import React, {useEffect, useState} from "react";
import axios from "axios";

function LaureateMeetingResultCard({ meeting, selectedLaureate, selectedMeetings, showDetails }) {
    const [ laureate, setLaureate ] = useState({});
    const [ selectedStyle, setSelectedStyle ] = useState('');

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
        axios.get(process.env.REACT_APP_API_HOST +'/api/accounts/'+ meeting.fkLaureateAccountId)
            .then((res) => {
                setLaureate(res.data);
            })
            .catch((err) => console.error(err));
    }, [])


    useEffect(() => {
        if (selectedLaureate === meeting.fkLaureateAccountId) {
            if (isDuplicated(meeting.fkGodfatherAccountId, meeting.fkLaureateAccountId)) {
                setSelectedStyle('border-danger border-lg');
            } else {
                setSelectedStyle('border-success border-lg');
            }
        } else {
            setSelectedStyle('');
        }
    }, [selectedMeetings])

    function isDuplicated(godfatherId, laureateId) {
        // Find meeting with other godfather and same laureate
        return selectedMeetings.find((meeting) => meeting.godfatherId !== godfatherId && meeting.laureateId === laureateId);
    }
    let i;

    return (
        <>
            <div className={`card mx-2 ${selectedStyle} shadow-sm`}>
                <div className="py-2 px-3">
                    {laureate.firstname} {laureate.lastname} <span className={`badge badge-${badgeStyle}`}>{matchScore}</span>
                </div>

                <div className={`container py-2 bg-light ${showDetails ? null : 'd-none'}`}>
                    <div className="row">
                        <div className="col">
                            <p className="text-muted text-xs m-0">Parrain</p>
                            {[...Array(meeting.godfatherRating)].map((e, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc107" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                            ))}
                        </div>
                        <div className="col">
                            <p className="text-muted text-xs m-0">Lauréat</p>
                            {[...Array(meeting.laureateRating)].map((e, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc107" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LaureateMeetingResultCard
