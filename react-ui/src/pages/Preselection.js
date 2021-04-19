import React, {useEffect, useState} from "react";
import axios from "axios";
import LaureateItem from "../components/preselection/LaureateItem";
import {Redirect} from "react-router-dom";

export function Preselection() {
    const [ laureates, setLaureates ] = useState([]);
    const [ selectedLaureates, setSelectedLaureates ] = useState([]);
    const [ user, setUser ] = useState({});
    const [ redirectTo, setRedirectTo ] = useState();

    useEffect(() => {
        // Get user
        const savedToken = sessionStorage.getItem('accessToken');

        axios.get('//etn-test.herokuapp.com/api/accounts/'.concat(savedToken))
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => console.log(err));

        // Get laureates
        axios.get("//etn-test.herokuapp.com/api/accounts/laureates")
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
                .post("//etn-test.herokuapp.com/api/preselections", {
                    fkGodfatherAccountId: user.accountId,
                    fkLaureateAccountId: selectedLaureate.accountId
                })
                .then((res) => {
                    console.log(res);
                    setRedirectTo('/Home')
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
                        {laureates.map(({ accountId, firstname, lastname }) => {
                            return (
                                <div className='col col-md-6 py-2' key={accountId}>
                                    <LaureateItem accountId={accountId} firstname={firstname} lastname={lastname} updateSelectedLaureates={updateSelectedLaureates} />
                                </div>
                            )
                        })}
                    </ul>

                    <div className="container-fluid fixed-bottom bg-light shadow border-top">
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
                            <div className='d-flex flex-nowrap align-items-center ml-auto py-2 '>
                                {(selectedLaureates.length !== 4) ? (
                                    <button className='btn btn-danger' disabled data-toggle="tooltip" data-placement="top" title="Sélectionnez 4 laureats">Valider</button>
                                ) : (
                                    <button className='btn btn-success' type='submit'>Valider</button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
