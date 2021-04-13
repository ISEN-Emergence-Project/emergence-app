import React, {Component, useState} from "react"
import {useEffect} from "react"
import {AccountCard} from "../components/AccountCard"

export function APITest(){          // permet de faire un test en appelant l'API
{
    const[person,setPerson] = useState([])
    const[loading, setLoading] = useState(true)
    const [clicked,setClick] = useState(false)
   
  

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
                .then(res => setPerson(res))
                setLoading(false)
                
            })
            
            .catch(error => console.error("There was an error",error))// person[0]/ person[1] ... ->contourne le for
           
        },[]);

             
        return(
            <div>
                <div className="container d-flex justify-content-center mt-5">
                    <button className="btn btn-success"> Ajouter</button>
                </div>
                {

                    loading? <div className="d-flex justify-content-center  mt-4">
                        <div className="spinner-border text-success" role="status"/>
                        <span class="visually-hidden ms-5"> Chargement </span>
                    </div> :

                    <div>
                        {person.map(pers => <li key={pers.accountId}>{<AccountCard username = {pers.firstname +" "+ pers.lastname} email = {pers.email} promo = {pers.laureatePromo} userType = {pers.role}/>}</li>)}
                    </div>

                }
            </div>
        );
    }
}
