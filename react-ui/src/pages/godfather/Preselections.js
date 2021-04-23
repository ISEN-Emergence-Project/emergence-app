import React, {useEffect, useState} from "react";
import { Button, Modal} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import axios from "axios";

import LaureateCard from "../../components/godfather/LaureateCard";

export function Preselections({ account }) {
    const [ laureates, setLaureates ] = useState([]);
    const [ selectedLaureates, setSelectedLaureates ] = useState([]);
    const [ redirectTo, setRedirectTo ] = useState();

    useEffect(() => {
        // Get laureates
        axios.get(process.env.REACT_APP_API_HOST +"/api/accounts/laureates")
            .then((res) => setLaureates(res.data))
            .catch((err) => console.log(err));
    }, [])

    function updateSelectedLaureates(accountId, firstname, lastname) {
        const currentLaureateSelected = selectedLaureates.find((laureate) => laureate.accountId === accountId);

        if (currentLaureateSelected) {
            // Remove laureate from selected list
            setSelectedLaureates(selectedLaureates.filter((laureate) => laureate.accountId !== accountId));
        } else {
            setSelectedLaureates([...selectedLaureates, {accountId, firstname, lastname}]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        selectedLaureates.forEach((selectedLaureate) => {
            axios
                .post(process.env.REACT_APP_API_HOST +"/api/preselections", {
                    fkGodfatherAccountId: account.accountId,
                    fkLaureateAccountId: selectedLaureate.accountId
                })
                .then((res) => {
                    console.log(res);
                    setRedirectTo('/')
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    if (redirectTo) {
        return <Redirect to={redirectTo} />
    } else {
        return(
            <div className='container'>
                <form className="py-4" onSubmit={handleSubmit}>
                    <ul className='row row-cols-1 row-cols-md-2 row-cols-xl-2 list-unstyled list'>
                        {laureates.map((laureate) => {
                            return (
                                <div className='col col-md-6 py-2' key={laureate.accountId}>
                                    <LaureateCard laureate={laureate} updateSelectedLaureates={updateSelectedLaureates} />
                                </div>
                            )
                        })}
                    </ul>

                    <div className="container-fluid fixed-bottom bg-light shadow border-top px-4">
                        <div className="d-flex flex-nowrap flex-column flex-sm-row">
                            <div className="flex-row flex-wrap">
                                <ul className="row list-unstyled list py-2 m-0">
                                    {selectedLaureates.map(({ accountId, firstname, lastname }) => {
                                        return (
                                            <div className='px-2 py-1' key={accountId}>
                                                <div className="card">
                                                    <div className="card-body p-2">
                                                        {firstname} {lastname}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='d-flex flex-nowrap align-items-center ml-auto py-2'>
                                <p className='m-0 mr-3 text-secondary text-small'>Sélectionnez 6 lauréats</p>
                                {(selectedLaureates.length !== 6) ? (
                                    <button className='btn btn-danger cursor-not-allowed my-2' disabled data-toggle="tooltip" data-placement="top" title="Sélectionnez 6 laureats">Valider</button>
                                ) : (
                                    <button className='btn btn-success my-2' type='submit'>Valider</button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
