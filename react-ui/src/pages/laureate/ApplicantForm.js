import React, { useState,useEffect } from 'react';
import axios from "axios";

import { FormHeader } from '../../components/commons/FormHeader';
import {FormField} from "../../components/laureate/FormField"

export function ApplicantForm({ account }) {
    const [ form, setForm ] = useState({});
    const [ questions, setQuestions ] = useState([]);
    const [ alert, setAlert ] = useState(false);
    const [ formAnswered, setFormAnswered ] = useState(false);

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/questions/form/latest')
            .then((res) => setQuestions(res.data))
            .catch((err) => console.log(err));

        axios.get('//etn-test.herokuapp.com/api/forms/latest')
            .then((res) => {
                setForm(res.data);
            })
            .catch((err) => console.log(err));

        axios.get('//etn-test.herokuapp.com/api/answers/account/'+ account.accountId +'/form/latest')
            .then((res) => {
                setFormAnswered(true);
            })
            .catch((err) => {
                setFormAnswered(false);
            });
    }, []);

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

        if (answersValid) {
            let answersSaved = false;
            // Save answers in database
            questions.forEach((question) => {
                axios.post('//etn-test.herokuapp.com/api/answers/', {
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

