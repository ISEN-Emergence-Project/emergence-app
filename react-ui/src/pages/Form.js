import React, { Component, useEffect,useState } from 'react';
import{HeaderHook} from "../components/HeaderHook"
import {QuestionField} from "../components/QuestionField"

export function Form() 
{
    return <div>
        <HeaderHook />
       

      <div>
          <QuestionField/>
          
      </div>
     
        <button> Save information</button>
      </div>

}
