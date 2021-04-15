import React, { Component, useEffect } from 'react';
import {Header} from '../components/Header';
import {Footer} from "../components/Footer";
import {Field} from"../components/Field"


export function Form() 
{

  const[form,setForm] = useState([])
  
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
        fetch("https://etn-test.herokuapp.com/api/forms/latest/questions",{options})
        .then(res => {
           res.json()
            .then(res => setForm(res))
            
        })
        
        .catch(error => console.error("There was an error",error)) 
      
    },[]);

    return <div>
        <HeaderHook/>

      <div>

          {form.map(f => <div className="container mt-3" key={f.questionId}>
                              {<Field children = {f.question}/>}
                          </div>
                          )}
                      </div>


      </div>

      

  


}
