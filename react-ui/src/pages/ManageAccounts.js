import React, {useState} from "react"
import {useEffect} from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {ApplicantCard} from "../components/admin/ApplicantCards"
import {AddAccount} from "../components/admin/AddAccount"

export function ManageAccounts(){          // permet de faire un test en appelant l'API
{
    const[person,setPerson] = useState([])
    const[loading, setLoading] = useState(true)
   
  

        useEffect(() => {
            const options = {
                method: "GET",
                header:
                {
                    'content-type': 'application/json',
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
                }
            }
            fetch("https://etn-test.herokuapp.com/api/accounts",{options})
            .then(res => {
                res.json()
                .then(res => {
                    return setPerson(res)
                }) 
                setLoading(false)
              
            })
            
            .catch(error => console.error("There was an error",error)) 
           
        },[]);

             
        return(
            <div>
                {

                    loading? <div className="d-flex justify-content-center  mt-4">
                        <div className="spinner-border text-success" role="status"/>
                        <span class="visually-hidden ms-5"> Chargement </span>
                    </div> :

                    <div><AddAccount/>
                        {person.map(pers => <li key={pers.accountId}>
                            { <Container>
                                    <Row>
                                        <Col><ApplicantCard Name={pers.firstname} Firstname={pers.lastname} Age={pers.email} Studies={pers.laureatePromo} Role={pers.role}/></Col>  
                                        </Row>
                                        </Container>
                            }
                        </li>
                        )} 
                    </div>
                }
                </div>
        );
    }
}
