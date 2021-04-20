import { useState } from "react";
import  React from "react"
import {useEffect} from "react"

export function ApplicantHeader()         
{
    const [header,setHeader] = useState([])

    useEffect(() => {
        const options = {
            method: "GET",
            header:
            {
                'content-type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
            }
        }
        fetch("https://etn-test.herokuapp.com/api/forms/latest",{options})
        .then(res => {
            res.json()
             .then(res => setHeader(res))
             
         })
         
         .catch(error => console.error("There was an error",error)) 
       
     },[]);


    return (
        <>
            <img className='form-header-img' src={header.bannerUrl} />

            <div className="card text-center bg-light py-4">
               <h1> {header.title} </h1>

               <p>{header.description}</p>
                <p className="text-danger m-0"> * Obligatoire</p>
            </div>
        </>
    )
}
