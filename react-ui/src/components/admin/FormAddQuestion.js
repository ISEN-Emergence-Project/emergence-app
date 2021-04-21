import  React, {useState} from "react"
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';

export function FormAddQuestion({ form, updateQuestions }) {
    const [ show, setShow ] = useState(false);
    const [ question, setQuestion ] = useState("")
    const [ description, setDescription ] = useState("")

    function handleAddQuestion() {
        axios.post("https://etn-test.herokuapp.com/api/questions",{
            question: question,
            description: description,
            fkFormId: form.formId
        })
            .then((res) => {
                // Update local questions
                updateQuestions(res.data.questionId, res.data);

                setShow(false);
            })
            .catch((err) => console.error(err));
    }

    return (
        <>
            <div className='text-center'>
                <button className='btn btn-success col col-sm-4 col-md-2' onClick={() => setShow(true)}>Ajouter une question</button>
            </div>

            <Modal size="lg" show={show}>
                <Modal.Header>
                    <Modal.Title>Ajouter une question</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="pb-2">
                        <label className='m-0' htmlFor="question"> Question </label>
                        <input className="form-control mt-1" required onChange={(event) => setQuestion(event.target.value)} type="text" id="question"/>
                    </div>

                    <div className="py-3">
                        <label className='m-0' htmlFor="description"> Description </label>
                        <textarea className="form-control mt-1" required onChange={(event) => setDescription(event.target.value)}  id="description"/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="btn btn-success btn-sm" onClick={handleAddQuestion}>Enregister</Button>
                    <Button variant="btn btn-danger btn-sm" onClick={() =>  setShow(false)}>
                        <i class="me-2 bi-x-square-fill"></i> Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}