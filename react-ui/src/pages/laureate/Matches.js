import axios from "axios";
import React, {useEffect, useState} from "react";


function Matches({account}) {

    const[result,setResult] = useState([])
    

    useEffect(()=>{
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
                {result.map(res=>res.fkLaureateAccountId==account.accountId?<div><Test aaccountId={res.fkGodfatherAccountId}/></div>:false)}
            </div>
    
        </div>
    )
}

function Test(aaccountId){
    const[aacount,setAccount]=useState([])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_HOST +"/api/accounts")                         
    .then(res => {
        
    console.log(res.data)
    setAccount(res.data)

    })
        .catch(error => console.error("There was an error",error))

    
},[])

    return(
        <div>
            <h1 className="p-5">Votre parrain/marraine a été choisi : </h1>
            <div className="">
                {aacount.map(acc=>acc.accountId==aaccountId.aaccountId?
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
