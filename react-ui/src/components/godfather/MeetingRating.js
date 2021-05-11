/**
 * MEETINGS RATING COMPONENT <- GODFATHER MEETING CARD COMPONENT <- GODFATHER MEETINGS LIST PAGE
 * Radio buttons to rate a meeting
 */

import React, {useState} from "react";
import {Button, Form, FormCheck} from "react-bootstrap";

function MeetingRating ({ meeting, updateRating }) {
    const[note, setNote] = useState(null);

    const meetingUid = meeting.fkGodfatherAccountId +"-"+ meeting.fkLaureateAccountId;

    return (
        <>
            <Form className='py-2'>
                <FormCheck custom inline type='radio' id={`${meetingUid}-R1`} name={meetingUid} label='1'
                           onChange={(e) => setNote(1)} />
                <FormCheck custom inline type='radio' id={`${meetingUid}-R2`} name={meetingUid} label='2'
                           onChange={(e) => setNote(2)} />
                <FormCheck custom inline type='radio' id={`${meetingUid}-R3`} name={meetingUid} label='3'
                           onChange={(e) => setNote(3)} />
                <FormCheck custom inline type='radio' id={`${meetingUid}-R4`} name={meetingUid} label='4'
                           onChange={(e) => setNote(4)} />
            </Form>

            <div className='text-center'>
                {meeting.godfatherRating == null ? (
                    <Button className=" align-self-center col"  variant="btn btn-success"
                            onClick={() => updateRating(meeting.fkLaureateAccountId, note)}>Envoyer</Button>
                ) : (
                    <>
                        <Button className=" align-self-center col"  variant="btn btn-danger cursor-not-allowed" disabled>Envoyer</Button>
                        <p className='text-muted'>Réponse envoyée</p>
                    </>
                )}
            </div>
        </>
    )
}

export default MeetingRating;
