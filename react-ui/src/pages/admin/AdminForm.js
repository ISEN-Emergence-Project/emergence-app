/**
 * ADMIN FORM PAGE
 * Allow admin to edit the applicant form
 */

import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {Star} from "../../components/commons/Star"

import {FormQuestionField} from "../../components/admin/FormQuestionField"
import {FormAddQuestion} from "../../components/admin/FormAddQuestion";
import {FormHeader} from "../../components/commons/FormHeader";

export function AdminForm({ account }) {
    const [ form, setForm ] = useState({});
    const [ questions, setQuestions ] = useState([]);
    const [ editHeader, setEditHeader ] = useState(false); // display a popup to change the header // true if the admin click on the modify button of the header 

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +'/api/questions/form/latest')
            .then((res) => setQuestions(res.data))
            .catch((err) => console.log(err));

        axios.get(process.env.REACT_APP_API_HOST +'/api/forms/latest')
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

        axios.put(process.env.REACT_APP_API_HOST +"/api/forms/"+ form.formId,{
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
                    {/* button to modify the header */}
                </div> 

                <div className="py-3">
                    <label className='m-0' htmlFor='studies'>
                        Quelle sont vos études ? <Star/>
                        {/* default question */}
                    </label>
                    <input type="text" required placeholder="Votre réponse" id='studies' className="form-control mb-2"/>
                </div>

                {questions.map(question => (
                    <div className="py-3" key={question.questionId}>
                        <FormQuestionField question={question} updateQuestions={updateQuestions} />
                        {/* for each questions, call the FormQuestionField component that contain the question, an input field and 2 buttons to delete and modify the question */}
                    </div>
                ))}

                <div className="py-4">
                    <FormAddQuestion form={form} updateQuestions={updateQuestions} />
                    {/* call the FormAddQuestion component that contain a button to add a question in the form */}
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
                    <Button variant="btn btn-success btn-sm" onClick={handleHeaderSave /*save in database and update the form*/}>Enregister</Button>
                    <Button variant="btn btn-danger btn-sm" onClick={() => setEditHeader(false)/*Close the popup window*/}>
                        <i className="me-2 bi-x-square-fill"/> Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
