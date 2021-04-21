import  React, { useState } from "react"
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';

import {Star} from "./Star"

export function QuestionField({ question, updateQuestion }) {
    const [ showEdit, setShowEdit ] = useState(false);
    const [ questionLabel, setQuestionLabel ] = useState(question.question);

    function handleSave() {
        // Update local question label
        question.question = questionLabel
        updateQuestion(question.questionId, question);

        axios.put('//etn-test.herokuapp.com/api/questions/'+ question.questionId, {
            question: questionLabel
        })
            .then((res) => {
                setShowEdit(false);
            })
            .catch((err) => console.error(err));
    }

    return (
        <>
            <label className='m-0' htmlFor={question.questionId}>
                {question.question} <Star/>
            </label>

            <input type="text" required placeholder="Votre réponse" id={question.questionId} className="form-control mb-2"/>
            <button className='btn btn-primary' onClick={() => setShowEdit(true)}>Modifier</button>

            <Modal size="lg" show={showEdit}>
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
                        <i class="me-2 bi-x-square-fill"/> Fermer
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}
