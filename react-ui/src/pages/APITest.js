import React, {Component} from "react"
import { fetchApi } from '../services/api';

export class APITest extends Component                 // permet de faire un test en appelant l'API
{
    state = {
        loading: true,
        person:""
    }

    async componentDidMount()
    {
        fetchApi('get', 'https://etn-test.herokuapp.com/api', '', {})
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    render() {
        return(
            <div>
                <div>Hello</div>
            </div>
        )
    }

}
