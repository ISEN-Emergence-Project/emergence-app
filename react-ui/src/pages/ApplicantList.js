import React, { Component } from "react";

import {ApplicantCard} from"../components/ApplicantCard"


export default class ApplicantList extends Component
{

    render()
    {
        return <div>
            <div>
                <ApplicantCard Name="Hello" Firstname="everyone" Age="21" Studies="ISEN"/>     {/* On affiche les différents profils */}
                <ApplicantCard Name="bonjour" Firstname="" Age="21" Studies="ISEN"/>
            </div>
            
        </div>
    }
    
}
