import React from "react"
import {LaureateDropDownButton} from"../components/LaureateDropDownButton"


export function PrettyPlanning()                // faire un composant pour le dropdown bouton et Pretty planning fait le rendu en appelant les composants
{
    
    return <div >
        <div className="container d-flex flex-direction-row justify-content-between">
            <p className="mt-5 btn btn-primary "> <strong>Godfather</strong></p>
            <LaureateDropDownButton name = "Bibo huinej"/>
            <LaureateDropDownButton name = "OK letsgo"/>
            <LaureateDropDownButton name = "hello everyone"/>
            <LaureateDropDownButton name = "everyone what'sup"/>
        </div>

        <div className="container d-flex flex-direction-row justify-content-between">
            <p className="mt-5 btn btn-primary "> <strong>Godfather</strong></p>
            <LaureateDropDownButton name = "Bibo huinej"/>
            <LaureateDropDownButton name = "OK letsgo"/>
            <LaureateDropDownButton name = "hello everyone"/>
            <LaureateDropDownButton name = "everyone what'sup"/>
        </div>


        <div className="container d-flex flex-direction-row justify-content-between">
            <p className="mt-5 btn btn-primary "> <strong>Godfather</strong></p>
            <LaureateDropDownButton name = "Bibo huinej"/>
            <LaureateDropDownButton name = "OK letsgo"/>
            <LaureateDropDownButton name = "hello everyone"/>
            <LaureateDropDownButton name = "everyone what'sup"/>
        </div>
    </div>
}