import React, { useState,useEffect } from 'react';
import axios from "axios";

import { FormHeader } from '../../components/FormHeader';
import {ApplicantField} from "../../components/admin/ApplicantField"

export function ApplicantForm() {
    const [ form, setForm ] = useState({});
    const [ questions, setQuestions ] = useState([]);
    const [ clicked, setClicked ] = useState(false);

    const handleClick = () => setClicked(true)

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


    return (
        <>
            <FormHeader form={form} />

            <div className='container py-4'>
                {questions.map(question => (
                    <div className="mt-4" key={question.questionId}>
                        <ApplicantField id = {question.questionId} questionLabel = {question.question} send={clicked}/>
                    </div>
                ))}

                <div className='my-4 py-4'>
                    <button className='btn btn-success' onClick={handleClick}>Envoyer vos réponses</button>
                </div>
            </div>
        </>
    )

}

