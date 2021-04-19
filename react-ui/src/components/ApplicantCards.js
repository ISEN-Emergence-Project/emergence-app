import { Button, Modal} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';





export function ApplicantCard({Name,Firstname,Age,Studies,IdPers,Role}) {
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
      fetch("https://etn-test.herokuapp.com/api/questions",{options})
      .then(res => {
          res.json()
          .then(res => {
              return setQuestion(res)
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
      fetch("https://etn-test.herokuapp.com/api/answers",{options})
      .then(res => {
          res.json()
          .then(res => {
              return setAnswer(res)
          })
      })
      
      .catch(error => console.error("There was an error",error)) 
     
  },[]);
  
    return (
      <div class="">
        
        <div onClick={handleShow} class="p-5 border rounded border-secondary m-1 bg-light ">
          <h3 class="text-capitalize font-weight-bold">{Name + " " + Firstname}</h3>
          <h5>{Role}</h5>
          <div class="p-2">{Age}</div>
          <h5>{Studies}</h5>
          <hr />
        </div>
  
        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
                <Modal.Title> Informations du profil </Modal.Title>
            </Modal.Header>
            <Modal.Body className="container">
                {question.map(ques=>  <div key={ques.questionId}><h5 class="font-weight-bold mb-3" >{ques.question} :</h5> {answer.map(ans=> IdPers==ans.fkAccountId ?
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
    );
  }
  
 
