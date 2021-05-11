/**
 * GODFATHER FINAL MATCH PAGE
 * Show his laureate match to the godfather
 */

import axios from "axios";
import React, {useEffect, useState} from "react";


function Matches({account}) {
    const [result,setResult] = useState([])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +"/api/matches")
            .then(res => {
                console.log(res.data)
                setResult(res.data)
            })
            .catch(error => console.error("There was an error",error))
    },[])

    return (
       <div className="container">
           <div className="card m-5 p-5 justify-content-center align-self-center">
                {result.map((res) => res.fkGodfatherAccountId === account.accountId ? (
                    <div><Test aaccountId={res.fkLaureateAccountId}/></div>
                ) : false)}
            {/* find the laureate he is associate to */}
            </div>
        </div>
    )
}

function Test(accountId){  //display the name of the laureate and his email address
    const [account,setAccount] = useState([]);

    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_HOST +"/api/accounts")                         
            .then((res) => {
                console.log(res.data)
                setAccount(res.data)
            })
            .catch(error => console.error("There was an error",error))
    },[])

    return(
        <div>
            <h1 className="p-5">Votre filleul(e) a été choisi : </h1>
            <div className="">
                {account.map(acc=>acc.accountId===accountId.aaccountId?
                <div className="d-flex flex-row">
                    <h2 className="col">{console.log(acc)}{acc.firstname+" "+ acc.lastname}</h2>
                    <div className="col">
                       
                        <h3>{acc.email}</h3>
                    </div>
                </div>
                :<div>{console.log(acc)}</div>)}
            </div> 
        </div> 
    )
}

export default Matches
