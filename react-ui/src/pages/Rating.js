import React, { Component } from "react";
import {RadioButton} from"../components//RadioButton"

export class Rating extends Component
{
    constructor()
    {
        super()
        this.state =
        {
            clicked:false
        }
    }

    handleClick()
    {
        this.setState(
            {
                clicked:true
            })
    }

    render()
    {
        return <div>
            <div className="p-5">
                <div className="card-header text-center">
                    <h2 className="text-center">Time to vote !!</h2>
                    <br></br>
                    <p>Suite aux échange avec vos potentiels parrain, nous vous demandons de mettre une note sur vos rencontre afin que nous puissons faire les meilleurs duo possibles.</p> 
                    <p>Merci de remplir ce rapide formulaire :) </p>
                </div>

            <br></br>

            <div className="container d-flex flex-column bd-highlight mb-3 ms-5">
                <div className="p-2 bd-highlight d-flex flex-row bd-highlight mb-3">Rencontre 1 :
                <RadioButton value="1" name="flexRadioDefault1"/>
                <RadioButton value="2" name="flexRadioDefault1"/>
                <RadioButton value="3" name="flexRadioDefault1"/>
                <RadioButton value="4" name="flexRadioDefault1"/>
                </div>

                <div className="p-2 bd-highlight d-flex flex-row bd-highlight mb-3">Rencontre 2 :
                <RadioButton value="1" name="flexRadioDefault2"/>
                <RadioButton value="2" name="flexRadioDefault2"/>
                <RadioButton value="3" name="flexRadioDefault2"/>
                <RadioButton value="4" name="flexRadioDefault2"/>
                </div>

                <div className="p-2 bd-highlight d-flex flex-row bd-highlight mb-3">Rencontre 3 :
                <RadioButton value="1" name="flexRadioDefault3"/>
                <RadioButton value="2"name="flexRadioDefault3"/>
                <RadioButton value="3"name="flexRadioDefault3"/>
                <RadioButton value="4"name="flexRadioDefault3"/>
                </div>

                <div className="p-2 bd-highlight d-flex flex-row bd-highlight mb-3">Rencontre 4 :
                <RadioButton value="1"name="flexRadioDefault4"/>
                <RadioButton value="2"name="flexRadioDefault4"/>
                <RadioButton value="3"name="flexRadioDefault4"/>
                <RadioButton value="4"name="flexRadioDefault4"/>
                </div>
            </div>

            <div className="d-flex flex-row-reverse bd-highlight">
                <button className="btn btn-success">  Envoyer <i className=" ms-2 bi-arrow-right-circle-fill"></i></button>
            </div>

        </div>
    </div>
    }
}
