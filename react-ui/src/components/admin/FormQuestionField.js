import  React, { useState } from "react"
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';

import {Star} from "../Star"

export function FormQuestionField({ question, updateQuestions }) {
    const [ showEdit, setShowEdit ] = useState(false);
    const [ questionLabel, setQuestionLabel ] = useState(question.question);

    function handleSave() {
        axios.put('//etn-test.herokuapp.com/api/questions/'+ question.questionId, {
            question: questionLabel
        })
            .then((res) => {
                // Update local questions
                question.question = questionLabel
                updateQuestions(question.questionId, question);

                setShowEdit(false);
            })
            .catch((err) => console.error(err));
    }

    function handleDelete() {
        axios.delete('//etn-test.herokuapp.com/api/questions/'+ question.questionId)
            .then((res) => {
                // Update local questions
                updateQuestions(question.questionId, null);
                console.log('deleted')
            })
            .catch((err) => console.error(err));
    }

    return (
        <>
            <label className='m-0' htmlFor={question.questionId}>
                {question.question} <Star/>
            </label>
            <input type="text" required placeholder="Votre réponse" id={question.questionId} className="form-control mb-2"/>
            <button className='btn btn-primary btn-sm' onClick={() => setShowEdit(true)}>Modifier</button>
            <button className='btn btn-outline-danger btn-sm ml-2' onClick={handleDelete}>Supprimer</button>

            <Modal size="lg" show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header>
                    <Modal.Title>Modifier la question</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label htmlFor="editQuestion">Question</label>
                    <input  className="form-control mt-3" defaultValue={question.question} required type="text" id="editQuestion"
                            onChange={(e) => setQuestionLabel(e.target.value)} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="btn btn-success btn-sm" onClick={handleSave}>Enregister</Button>

                    <Button variant="btn btn-danger btn-sm" onClick={() => setShowEdit(false)}>
                        <i className="me-2 bi-x-square-fill"/> Fermer
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}
