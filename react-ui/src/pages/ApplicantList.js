import React from "react";
import {useEffect,useState} from "react"
import {ApplicantCard} from"../components/admin/ApplicantCards"

export function ApplicantList()
{

    const[person,setPerson] = useState([])
    const[answer,setAnswer] = useState([])
    
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
                return setPerson(res)
            })
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
                return setAnswer(res)
            })
        })
        
        .catch(error => console.error("There was an error",error)) 
       
    },[]);
    
        return (
            <div class="d-flex  flex-wrap justify-content-center p-2">

                {person.map(pers => pers.role=="laureate" ?<div key={pers.accountId}>
                            { <ApplicantCard Name = {pers.lastname}
                                            Firstname={pers.firstname}
                                            Age={answer.map(ans=> pers.accountId==ans.fkAccountId ?(ans.fkQuestionId==18 ?<div key={ans.answerId}>{ans.answer}</div>:false) : false)}
                                            Studies={answer.map(ans=> pers.accountId==ans.fkAccountId ?(ans.fkQuestionId==25 ?<div key={ans.answerId}>{ans.answer}</div>:false) : false)}
                                            Role={pers.role}
                                            IdPers={pers.accountId}
                                            
                                            /> 
                            }
                        </div>
                        :false)}
            </div>
        )  
}
