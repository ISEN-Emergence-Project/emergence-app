import React, {useEffect, useState} from "react";
import axios from "axios";
import {Modal} from "react-bootstrap";

function AccountCard({ account }) {
    const [ showProfile, setShowProfile ] = useState(false);
    const [ answers, setAnswers ] = useState([]);

    function openProfile () {
        if (answers.length < 1) {
            // Get all questions and answers
            axios.get("//etn-test.herokuapp.com/api/answers/account/"+ account.accountId +"/form/latest")
                .then((res) => {
                    setAnswers(res.data);
                    setShowProfile(true);
                })
                .catch(error => console.error("There was an error",error))
        } else {
            setShowProfile(true);
        }
    }

    return (
        <>
            <div className="card d-flex flex-row flex-nowrap align-items-center">
                <div className="card-body cursor-pointer py-3" onClick={openProfile}>
                    <h5 className='mb-1'>{account.firstname} {account.lastname}</h5>
                    {account.studies}
                </div>
            </div>

            <Modal show={showProfile} onHide={() => setShowProfile(false)}>
                <div className="modal-header">
                    <h5 className="modal-title">{account.firstname} {account.firstname}</h5>

                    <button type="button" className="close" onClick={() => setShowProfile(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {answers.map(({fkAccountId, fkQuestionId, answer, Question : {question, description}}) => {
                        return (
                            <div className='py-2' key={fkQuestionId}>
                                <b>{question}</b><br/>
                                {answer}
                            </div>
                        )
                    })}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary btn-sm">Modifier</button>
                    <button className="btn btn-outline-danger btn-sm ml-2">Supprimer</button>
                </div>
            </Modal>
        </>
    );
}

export default AccountCard
