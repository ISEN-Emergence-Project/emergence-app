import {Header} from '../components/Header';
import {Footer} from "../components/Footer";
import React, { Component } from 'react';
import {Field} from"../components/Field"
import {useEffect} from "react"


export function Form() 
{
  
  // handleChange(event)
  // {
  //   const name = event.target.name
  //   this.setState(
  //     {
  //       [name]: event.target.value        // les valeurs des libellés sont adaptés selon la variable name
  //     })
  // }


  // handleClickEdit()
  // {
  //   const enteredQuestion = prompt('Modifier la question') // permet de lancer une pop-up sans style
  //   this.setState(
  //     {
  //       children:enteredQuestion,                   // quand on clique sur le bouton on passe un bool à true
  //       clickedEdit:true
        
  //     })
  // }

  // handleClickDelete()
  // {
  //     this.setState(
  //       {
  //         clickedDelete:true
  //       })
  // }

  // handleClickAdd()
  // {
  //   const question = prompt('Ajouter le titre de votre question')
  //   this.setState(
  //     {
  //       question:question,
  //       clickedAdd:true
  //     })
  // }

      useEffect(() => {
        const options = {
            method: "GET",
            header:
            {
                'content-type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
            }
        }
        fetch("https://etn-test.herokuapp.com/api/form/questions",{options})
        .then(res => {
            console.log(res.json())
            // .then(res => setPerson(res))
            
        })
        
        .catch(error => console.error("There was an error",error)) 
      
    },[]);

    return <div>
      <div>
        <Header/>
      </div>

      

      <div className="container d-grid gap-2 col-3 mx-auto btn-sm mt-5 mb-3">
        <button  className="btn btn-primary" type="submit" value="Envoyer vos réponses"> Envoyer vos réponses <i class="ms-4 fs-4 bi-arrow-right-circle-fill"></i> </button>
      </div>
      
      <div className="text-center mt-3">
        <Footer/>
      </div>
      
    </div>

  


}
