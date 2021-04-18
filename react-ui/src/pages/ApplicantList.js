import React, { Component } from "react";
import {useEffect,useState} from "react"
import {ApplicantCard} from"../components/ApplicantCards"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export function ApplicantList()
{

    const[person,setPerson] = useState([])
    const[answer,setAnswer] = useState([])
    const[loading, setLoading] = useState(true)
    
    useEffect(() => {
        const options = {
            method: "GET",
            header:
            {
                'content-type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
            }
        }
        fetch("https://etn-test.herokuapp.com/api/accounts",{options})
        .then(res => {
            res.json()
            .then(res => {
                console.log(res)
                return setPerson(res)
            })
            setLoading(false)
        })
        
        .catch(error => console.error("There was an error",error)) 
       
    },[]);


    useEffect(() => {
        const options = {
            method: "GET",
            header:
            {
                'content-type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
            }
        }
        fetch("https://etn-test.herokuapp.com/api/answers",{options})
        .then(res => {
            res.json()
            .then(res => {
                console.log(res)
                return setAnswer(res)
            })
            setLoading(false)
        })
        
        .catch(error => console.error("There was an error",error)) 
       
    },[]);
    
        return (
            <Container class="d-flex flex-row">
              

                        {person.map(pers => pers.role=="laureate" ?<div key={pers.accountId}>
                            { <ApplicantCard Name = {pers.lastname}
                                            Firstname={pers.firstname}
                                            Age={answer.map(ans=> pers.accountId==ans.fkAccountId ?(ans.fkQuestionId==18 ?<li key={ans.answerId}>{ans.answer}</li>:false) : false)}
                                            Studies={answer.map(ans=> pers.accountId==ans.fkAccountId ?(ans.fkQuestionId==25 ?<li key={ans.answerId}>{ans.answer}</li>:false) : false)}
                                            Role={pers.role}
                                            IdPers={pers.accountId}
                                            //envoyer l'id pour la recuperer en fk
                                            /> 
                            }
                        </div>
                        :false)}
                    
            
             
            </Container>
        )
    
    
}
