/**
 * MATCHES LIST PAGE
 * Show a list of the final matches
 */

import React, { useState } from "react";
import axios from "axios"
import FinalMatch from "../../components/admin/FinalMatch";

function MatchesList() {
    const [matches,setMatches]=useState([])
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +"/api/matches")
            .then(res => {

                setMatches(res.data)

            })
            .catch(error => console.error("There was an error",error))
    }, [])

    return (
        
        <div className='container py-4 '>
            <div className='py-4 mb-2'>
                <h1>Binômes finaux :</h1>
                <hr/>
            </div>
            {matches.map((match) => (
                <>
                    <div key={`${match.fkGodfatherAccountId}-${match.fkLaureateAccountId}`} className="d-flex justify-content-center py-2">
                        <FinalMatch match={match} />
                    </div>
                </>
            ))}
        </div>
    )
}

export default MatchesList
