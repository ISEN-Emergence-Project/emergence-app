import { Component } from "react";
import React from 'react';
import ApplicantCard from"./ApplicantCard"





class ApplicantList extends Component
{

    render()
    {
        return <div>
            <div>
                <ApplicantCard Name="Hello" Firstname="everyone" Age="21" Studies="ISEN"/>
                <ApplicantCard Name="bonjour" Firstname="" Age="21" Studies="ISEN"/>
            </div>
            
        </div>
    }
    
}

export default ApplicantList