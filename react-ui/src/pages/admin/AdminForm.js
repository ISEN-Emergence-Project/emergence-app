import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

import {FormQuestionField} from "../../components/admin/FormQuestionField"
import {FormAddQuestion} from "../../components/admin/FormAddQuestion";
import {FormHeader} from "../../components/commons/FormHeader";

export function AdminForm({ account }) {
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

    function updateQuestions(id, newQuestion) {
        const index = questions.findIndex((q) => q.questionId === id);

        if (newQuestion === null && index > -1) {
            // Remove question from list
            setQuestions([...questions.filter((q) => q.questionId !== id)]);
        }
        else if (index > -1) {
            // Update question from list
            questions[index] = newQuestion;
            setQuestions(questions);
        }
        else {
            // Add question to list
            setQuestions([...questions, newQuestion]);
        }
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

            <div className="container py-4">
                <div className="container text-center pb-3">
                    <Button className="btn btn-success col col-sm-4 col-md-2" onClick={() => setEditHeader(true)}>Modifier</Button>
                </div>

                <div className="py-3">
                    <label className='m-0' htmlFor='studies'>
                        Quelle sont vos études ? <Star/>
                    </label>
                    <input type="text" required placeholder="Votre réponse" id='studies' className="form-control mb-2"/>
                </div>

                {questions.map(question => (
                    <div className="py-3" key={question.questionId}>
                        <FormQuestionField question={question} updateQuestions={updateQuestions} />
                    </div>
                ))}

                <div className="py-4">
                    <FormAddQuestion form={form} updateQuestions={updateQuestions} />
                </div>
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
