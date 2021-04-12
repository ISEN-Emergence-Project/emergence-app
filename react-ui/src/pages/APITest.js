import React, {Component} from "react"
import { connectApi, fetchApi } from '../services/api';

export class APITest extends Component                 // permet de faire un test en appelant l'API
{
    state = {
        loading: true,
        person:""
    }

    async componentDidMount()
    {
        connectApi('emergence', 'test');

        /*fetchApi('get', '/api', '')
            .then((res) => console.log(res))
            .catch((err) => console.log(err));*/
    }

    render() {
        return(
            <div>
                <div>Hello</div>
            </div>
        )
    }

}
