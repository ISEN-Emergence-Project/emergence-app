import React, {useEffect, useState} from "react";
import { Button, Modal} from 'react-bootstrap';
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
    }

    return(
        <div className='container'>
            <form className="row py-4" onSubmit={handleSubmit}>
                {laureates.map(({ accountId, firstname, lastname }) => {
                    return (
                        <Test accountId={accountId} firstname={firstname} lastname={lastname} />
                    )
                })}
                <div className="col text-center py-4">
                    <button className='btn btn-primary btn-block' type='submit'>Valider</button>
                </div>
            </form>
        </div>
    );
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