import React, {useState} from "react"
import {useEffect} from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Button, Modal} from "react-bootstrap";
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
                    <ul className='row row-cols-1 row-cols-md-2 row-cols-xl-2 list-unstyled list'>
                        {accounts.map((account) => {
                            return (
                                <div className='col col-md-6 py-2' key={account.accountId}>
                                    <AccountCard account={account} />
                                </div>
                            )
                        })}
                    </ul>

                    <div className='container'>
                        <AddAccount/>
                        {accounts.map(account => (
                                <li key={account.accountId}>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <div className="">

                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </li>
                            )
                        )}
                    </div>
                </div>

            )}
        </>
    );
}
