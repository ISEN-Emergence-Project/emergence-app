import React, {Component} from "react"
import { fetchApi } from '../services/api';

export class APITest extends Component                 // permet de faire un test en appelant l'API
{
    state =
        {
            loading: true,
            person:""
        }
   
    

        async componentDidMount()
        {
            fetchApi('get', '//etn-test.herokuapp.com/api', '', {})
                .then((res) => console.log(res))
        }

        render()
        {
             
            return(
                <div>
                    {!this.state.person? "":<div>{this.state.person.name.first} </div>}  
                </div>
            )
        }

    }
