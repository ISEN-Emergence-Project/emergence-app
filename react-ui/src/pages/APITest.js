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
        await connectApi('emergence', 'test');

        await fetchApi('get', '/api/accounts', '')
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
