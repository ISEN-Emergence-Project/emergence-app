import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

import {FormQuestionField} from "../../components/admin/FormQuestionField"
import {FormAddQuestion} from "../../components/admin/FormAddQuestion";
import {FormHeader} from "../../components/FormHeader";

export function AdminForm() {
    const [ form, setForm ] = useState({});
    const [ questions, setQuestions ] = useState([]);
    const [ editHeader, setEditHeader ] = useState(false);

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/questions/form/latest')
            .then((res) => setQuestions(res.data))
            .catch((err) => console.log(err));

        axios.get('//etn-test.herokuapp.com/api/forms/latest')
            .then((res) => {
                setForm(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    function updateQuestion(id, question) {
        const questionIndex = questions.indexOf((q) => q.questionId === id);
        questions[questionIndex] = question;
        setQuestions(questions);
    }

    function handleHeaderSave() {
        // Update local form
        form.title = document.querySelector('#editTitle').value;
        form.description = document.querySelector('#editDesc').value;
        setForm(form);

        axios.put("https://etn-test.herokuapp.com/api/forms/"+ form.formId,{
            title: form.title,
            description: form.description
        })
            .then((res) => {
                setEditHeader(false);
            })
            .catch(error => console.error("There was an error",error))
    }
    
    return (
        <>
            <FormHeader form={form} />

            <div className="container text-center py-3">
                <Button className="btn btn-success col col-sm-4 col-md-2 mx-auto" onClick={() => setEditHeader(true)}>Modifier</Button>
            </div>

            {questions.map(question => (
                <div className="container py-3" key={question.questionId}>
                    <FormQuestionField question={question} updateQuestion={updateQuestion} />
                </div>
            ))}

            <div className='container'>
                <FormAddQuestion/>
            </div>

            <Modal size="lg" show={editHeader}>
                <Modal.Header>
                    <Modal.Title>Modifier l'en-tête</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="editTitle"> Titre </label>
                    <input className="form-control mt-3" defaultValue={form.title} required type="text" id="editTitle"/>

                    <label className="mt-3" htmlFor="editDesc"> Description </label>
                    <textarea className="form-control mt-3" defaultValue={form.description} required id="editDesc"/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="btn btn-success btn-sm" onClick={handleHeaderSave}>Enregister</Button>
                    <Button variant="btn btn-danger btn-sm" onClick={() => setEditHeader(false)}>
                        <i className="me-2 bi-x-square-fill"/> Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
