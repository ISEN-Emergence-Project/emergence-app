import { Button, Modal} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert'




export function ApplicantCard({Name,Firstname,Age,Studies,IdPers}) {
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
              console.log(res)
              return setQuestion(res)
          })
          setLoading(false)
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
              console.log(res)
              return setAnswer(res)
          })
          setLoading(false)
      })
      
      .catch(error => console.error("There was an error",error)) 
     
  },[]);
  
    return (
      <>
        
        <Alert variant="light" onClick={handleShow}>
          <Alert.Heading>{Name + " " + Firstname}</Alert.Heading>
          <p>
          {Age}
          </p>
          <p>
              {Studies}
          </p>
          <p>{IdPers}</p>
          <hr />
        </Alert>
  
        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
                <Modal.Title> Informations du profil </Modal.Title>
            </Modal.Header>
            <Modal.Body className="container">
                {question.map(ques=>  <div key={ques.questionId}><h5 class="font-weight-bold mb-3" >{ques.question} :</h5> {answer.map(ans=> IdPers==ans.fkAccountId ?
                (ans.fkQuestionId==ques.questionId ?
                <div class ="font-weight-normal" key={ans.answerId}><input readOnly={true} className="form-control mt-3 mb-3" type="text" defaultValue={ans.answer}/></div>:false) 
                : false)}</div>)}
                 
                
                
                
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 
