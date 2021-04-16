import React, {useEffect, useState} from "react";
import axios from "axios";

export function Preselection() {
    const [ laureates, setLaureates ] = useState([]);

    useEffect(() => {
        axios.get("//etn-test.herokuapp.com/api/accounts/laureates")
            .then((res) => setLaureates(res.data))
            .catch((err) => console.log(err));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(e);
    }

    return(
        <div className='container'>
            <form className="row py-4" onSubmit={handleSubmit}>
                {laureates.map(({ accountId, firstname, lastname }) => {
                    return (
                        <div className='col-6 py-2' key={accountId}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            {firstname} {lastname}
                                        </div>
                                        <div className="col text-right">
                                            <input type='checkbox' name={accountId} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="col text-center py-4">
                    <button className='btn btn-primary btn-block' type='submit'>Valider</button>
                </div>
            </form>
        </div>
    );
}
