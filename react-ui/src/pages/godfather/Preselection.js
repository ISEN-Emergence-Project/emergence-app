import React, {useEffect, useState} from "react";
import { Button, Modal} from 'react-bootstrap';
import axios from "axios";
import LaureateItem from "../../components/preselection/LaureateItem";
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
                        {laureates.map((laureate) => {
                            return (
                                <div className='col col-md-6 py-2' key={laureate.accountId}>
                                    <LaureateItem laureate={laureate} updateSelectedLaureates={updateSelectedLaureates} />
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
                                <p className='m-0 mr-3 text-secondary text-small'>Sélectionnez 4 lauréats</p>
                                {(selectedLaureates.length !== 4) ? (
                                    <button className='btn btn-danger cursor-not-allowed my-2' disabled data-toggle="tooltip" data-placement="top" title="Sélectionnez 4 laureats">Valider</button>
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

function Test(props){
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[answer,setAnswer] = useState([])

    const[question,setQuestion] = useState([])


    useEffect(() => {
        const options = {
            method: "GET",
            header:
            {
                'content-type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
            }
        }
        fetch("https://etn-test.herokuapp.com/api/answers",{options})
        .then(res => {
            res.json()
            .then(res => {
                return setAnswer(res)
            })
            
        })
        
        .catch(error => console.error("There was an error",error)) 
       
    },[]);

    useEffect(() => {
        const options = {
            method: "GET",
            header:
            {
                'content-type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
            }
        }
        fetch("https://etn-test.herokuapp.com/api/questions",{options})
        .then(res => {
            res.json()
            .then(res => {
                return setQuestion(res)
            })
        })
        
        .catch(error => console.error("There was an error",error)) 
       
    },[]);
    return(
        <div className='col-6 py-2'>
        <div  key={props.accountId} >
            <div className="card">
                <div className="card-body">
                    <div className="column d-flex flex-row">
                        <div onClick={handleShow}>
                        <div className="col">
                            <h5>{props.firstname} {props.lastname}</h5>
                            
                        </div>
                        <div className="col">{answer.map(ans=> props.accountId==ans.fkAccountId ?(ans.fkQuestionId==18 ?<div key={ans.answerId}>{ans.answer}</div>:false) : false)}</div>
                        <div className="col">{answer.map(ans=> props.accountId==ans.fkAccountId ?(ans.fkQuestionId==25 ?<div key={ans.answerId}>{ans.answer}</div>:false) : false)}</div>
                        </div>   
                        <div className="col text-right align-self-center">
                            <input type='checkbox' name={props.accountId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                    <Modal.Title> Informations du profil </Modal.Title>
            </Modal.Header>
            <Modal.Body className="container">
            {question.map(ques=>  <div key={ques.questionId}><h5 class="font-weight-bold mb-3" >{ques.question} :</h5> {answer.map(ans=> props.accountId==ans.fkAccountId ?
            (ans.fkQuestionId==ques.questionId ?
            <div class ="font-weight-normal" key={ans.answerId}><div class="bg-light border t p-2 mb-2">{ans.answer}</div></div>:false) 
            : false)}</div>)}
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )

}
