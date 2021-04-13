import React, {Component} from "react"

export class APITest extends Component                 // permet de faire un test en appelant l'API
{
    state =
        {
            loading: true,
            person:""
        }
   
    

        async componentDidMount()
        {
            const url = "https://api.randomuser.me/"
            const response = await fetch(url)
            const data = await response.json()
            this.setState({person: data.results[0]})
            console.log(this.state.person)
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
