import React, {Component, useState} from "react"
import {useEffect} from "react"

export function APITest(){          // permet de faire un test en appelant l'API
{
    const[person,setPerson] = useState("")
   
    

        useEffect(() => {
            const options = {
                method: "GET",
                header:
                {
                    'content-type': 'application/json',
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTc5NzQ3ODQsImV4cCI6MTYxODA2MTE4NH0.3RAWQIOfRQLXAFrRkggutvqHJUdElCNQadDrsa_aDu4'
                }
            }
            
            fetch("https://etn-test.herokuapp.com/api/accounts",{options})
            .then(res => {
                console.log(res)
                
            })
            
        },[]);

             
            return(
                <div>
                    {<div> {person} </div>}  
                </div>
            )

    }
}