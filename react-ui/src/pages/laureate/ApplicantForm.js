/**
 * APPLICANT FORM PAGE
 * Form with questions that laureates answer
 */

import React, { useState,useEffect } from 'react';
import axios from "axios";
import {Star} from '../../components/commons/Star'
import { FormHeader } from '../../components/commons/FormHeader';
import {FormField} from "../../components/laureate/FormField"

export function ApplicantForm({ account }) {
    const [ form, setForm ] = useState({});
    const [ questions, setQuestions ] = useState([]);
    const [ alert, setAlert ] = useState(false);
    const [ formAnswered, setFormAnswered ] = useState(false);

    const [studies,setStudies] = useState("")

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +'/api/questions/form/latest')
            .then((res) => setQuestions(res.data))
            .catch((err) => console.log(err));

        axios.get(process.env.REACT_APP_API_HOST +'/api/forms/latest')
            .then((res) => {
                setForm(res.data);
            })
            .catch((err) => console.log(err));

        axios.get(process.env.REACT_APP_API_HOST +'/api/answers/account/'+ account.accountId +'/form/latest')
            .then((res) => {
                console.log(res.data)
                if(res.data.length > 0)
                setFormAnswered(true);
            })
            .catch(() => {
                setFormAnswered(false);
            });
    }, [account.accountId]);

    function addAnswer(questionId, answer) {
        const index = questions.findIndex((q) => q.questionId === questionId);

        if (index > -1) {
            // Update questions locally
            questions[index].answer = answer;
            setQuestions(questions);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        let answersValid = true;
        // Check valid answers (not empty)
        questions.forEach((question) => {
            if (!question.answer || !question.answer.trim()) {
                answersValid = false;
            }
        })

        if (!studies) {
            answersValid = false
        }

        if (answersValid) {
            let answersSaved = false;
            // Save answers in database
            questions.forEach((question) => {
                axios.post(process.env.REACT_APP_API_HOST +'/api/answers/', {
                    fkAccountId: account.accountId,
                    fkQuestionId: question.questionId,
                    answer: question.answer
                })
                    .then()
                    .catch((err) => {
                        console.error(err);
                        answersSaved = false;
                    });
            })

            axios.put(process.env.REACT_APP_API_HOST +"/api/accounts/" + account.accountId,{studies:studies})

            // Check that answers were saved
            if (answersSaved) {
                setAlert(<div className='alert alert-success' role='alert'>Vos réponses ont bien été enregistrées</div>);
            } else {
                setAlert(<div className='alert alert-danger' role='alert'>Une erreur a eu lieu lors de l'enregistrement des réponses</div>);
            }
        }
        else {
            setAlert(<div className='alert alert-danger' role='alert'>Vous devez répondre à toutes les questions.</div>)
        }
        window.scroll(0, 0);
    }

    if (formAnswered) {
        return (
            <div className="container py-4">
                <div className='alert alert-warning my-4' role='alert'>Vous avez déjà répondu à ce formulaire. Patientez jusqu'aux Speed Meetings !</div>
                <a className='btn btn-primary' href="/">Retour à l'accueil</a>
            </div>
        )
    } else {
        return (
            <>
                <FormHeader form={form} />

                <form action='#' onSubmit={handleSubmit}>
                    <div className='container py-4'>
                        { alert }

                        <div className="mt-4">
                            <div className='py-2'>
                                <label className='m-0' htmlFor="studies">
                                    Quelles sont vos études ? <Star/>
                                </label>
                                <input type="text" placeholder="Votre réponse" id={"studies"} onChange={(e) => setStudies(e.target.value)} className="form-control"/>
                            </div>
                        </div>

                        {questions.map(question => (
                            <div className="mt-4" key={question.questionId}>
                                <FormField question={question} addAnswer={addAnswer} />
                            </div>
                        ))}

                        <div className='my-4 py-4'>
                            <button className='btn btn-success' type='submit'>Envoyer vos réponses</button>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

