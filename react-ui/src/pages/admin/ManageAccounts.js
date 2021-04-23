import React, {useState} from "react"
import {useEffect} from "react"
import axios from "axios";

// Import components
import {ApplicantCard} from "../../components/admin/ApplicantCards"
import {AddAccount} from "../../components/admin/AddAccount"
import AccountCard from "../../components/admin/AccountCard";

export function ManageAccounts() {
    const [ accounts, setAccounts ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        axios.get('//etn-test.herokuapp.com/api/accounts/')
            .then((res) => {
                setAccounts(res.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    },[]);

    return(
        <>
            {loading? (
                <div className="d-flex justify-content-center  mt-4">
                    <div className="spinner-border text-success" role="status"/>
                    <span className="visually-hidden ms-5"> Chargement </span>
                </div>
            ) : (
                <div className='container py-4'>
                    <div className="py-4">
                        <h1>Liste des comptes</h1>
                        <hr/>
                    </div>

                    <div className="py-2">
                        <h3>Administrateurs</h3>
                        <ul className='row row-cols-1 row-cols-md-2 row-cols-xl-2 list-unstyled list'>
                            {accounts.filter((a => a.role === 'admin')).map((account) => {
                                return (
                                    <div className='col col-md-6 py-2' key={account.accountId}>
                                        <AccountCard account={account} />
                                    </div>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="py-2">
                        <h3>Lauréats</h3>
                        <ul className='row row-cols-1 row-cols-md-2 row-cols-xl-2 list-unstyled list'>
                            {accounts.filter((a => a.role === 'laureate')).map((account) => {
                                return (
                                    <div className='col col-md-6 py-2' key={account.accountId}>
                                        <AccountCard account={account} />
                                    </div>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="py-2">
                        <h3>Parrains</h3>
                        <ul className='row row-cols-1 row-cols-md-2 row-cols-xl-2 list-unstyled list'>
                            {accounts.filter((a => a.role === 'godfather')).map((account) => {
                                return (
                                    <div className='col col-md-6 py-2' key={account.accountId}>
                                        <AccountCard account={account} />
                                    </div>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="py-4"/>

                    <div className="container-fluid fixed-bottom bg-light shadow border-top">
                        <div className="d-flex flex-nowrap flex-column flex-sm-row px-4">
                            <div className="flex-row flex-wrap">
                            </div>
                            <div className='d-flex flex-nowrap align-items-center ml-auto py-3'>
                                <AddAccount/>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}
