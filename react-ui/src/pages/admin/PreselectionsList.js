import React, { useState } from "react";
import axios from "axios"

export function PreselectionsList({account}) {

    const [preselection,setPreselection]=useState([])
    const [aacount,setAccount]=useState([])
    

    axios.get("https://etn-test.herokuapp.com/api/preselections")
            .then(res => {
            
            setPreselection(res.data)

    })
    .catch(error => console.error("There was an error",error)) 

    axios.get("https://etn-test.herokuapp.com/api/accounts")
            .then(res => {
            
            setAccount(res.data)

    })
    .catch(error => console.error("There was an error",error)) 


    return (
        
    
    <div className="container">
            
        <h1 className="p-5">Liste des choix des parrains </h1>
        <div className=' d-flex flex-wrap'>
            {aacount.map( acc=> acc.role=="godfather"?
            <div className="card m-2">
                
                <h3 className="card-header">{acc.firstname} {acc.lastname}</h3>
                <div className="p-4 ">
                {preselection.map(pres=> acc.accountId==pres.fkGodfatherAccountId?
                    <div className="">
                        <div className="">
                        {aacount.map(acc=> acc.accountId==pres.fkLaureateAccountId?
                            <div className="p-1">{acc.firstname} {acc.lastname}</div>
                        :false)}
                        </div>
                    </div>
                :false)}
                </div>
                
            </div>

            :false)}
        </div> 

    
        

         
    </div>
    )
        
}
