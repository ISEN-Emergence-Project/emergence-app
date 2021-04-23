import React, {useEffect, useState} from "react";
import axios from "axios";
import {Modal} from "react-bootstrap";

function AccountCard({ account }) {
    const [ showProfile, setShowProfile ] = useState(false);
    const [ answers, setAnswers ] = useState([]);

    const roleLabel = {
        admin: 'Administrateur',
        godfather: 'Parrain',
        laureate: 'Lauréat'
    }


    function openProfile () {
        if (answers.length < 1) {
            // Get all questions and answers
            axios.get(process.env.REACT_APP_API_HOST +"/api/answers/account/"+ account.accountId +"/form/latest")
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
                    <div className="d-flex">
                        <h5 className='mb-1'>{account.firstname} {account.lastname}</h5>

                        <h6 className="ml-auto">
                            <span className='px-2 badge badge- badge-light'>{roleLabel[account.role]}</span>
                        </h6>
                    </div>
                    <p className='m-0'>{account.email}</p>
                </div>
            </div>

            <Modal show={showProfile} onHide={() => setShowProfile(false)}>
                <div className="modal-header">
                    <h5 className="modal-title">{account.firstname} {account.firstname}</h5>

                    <button type="button" className="close" onClick={() => setShowProfile(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">{account.email}
                    <hr></hr>
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
                    <button className="btn btn-outline-danger btn-sm ml-2" onClick={() => setShowProfile(false)}>Fermer</button>
                </div>
            </Modal>
        </>
    );
}

export default AccountCard
