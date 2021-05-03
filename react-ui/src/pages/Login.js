import React, {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";

export function Login({ setToken }) {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ status, setStatus ] = useState();
    const [ alert, setAlert ] = useState(null);
    const [ redirectTo, setRedirectTo ] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus();

        // Try login user
        axios.post(process.env.REACT_APP_API_HOST +"/api/login", { email, password })
            .then((res) => {
                setStatus(res.status);
                setRedirectTo('/');
                setToken(res.data.accessToken);
            })
            .catch((err) => {
                console.log(err);
                if (err.response) {
                    setStatus(err.response.status);
                }
            })
    }

    useEffect(() => {
        if (status === 403) {
            setAlert(<div className='alert alert-danger' role='alert'>Email ou mot de passe incorrect</div>);
        }
        else if (status == 200) {
            setAlert(<div className='alert alert-primary' role='alert'>Connexion réussie. Redirection...</div>);
        }
        else if (Number.isInteger(status)) {
            setAlert(<div className='alert alert-warning' role='alert'>Erreur lors de la connexion. [{status}]</div>);
        }
        else {
            setAlert();
        }
    }, [status])

    if (redirectTo) {
        return <Redirect to={redirectTo} />
    } else {
        return (
            <div className='position-relative'>
                <div className='container'>
                    <div className="row justify-content-center py-4">
                        <div className='col-8'>
                            <h1 className="h1 text-center">Bienvenue sur le Speed meeting du programme Emergence</h1>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className="col-5 text-center">

                            { alert }

                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email" className="grey-text mt-3">Email</label>
                                <input type="email" id="email" className="form-control"
                                       onChange={({target}) => setEmail(target.value)}/>
                                <br/>
                                <label htmlFor="password" className="grey-text">Mot de passe</label>
                                <input type="password" id="password" className="form-control"
                                       onChange={({target}) => setPassword(target.value)}/>
                                <div className="text-center mt-4">
                                    <button className='btn btn-primary' type="submit">Connexion</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="toast-container position-absolute top-0 end-0 p-3">
                    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <img src="..." className="rounded me-2" alt="..."/>
                            <strong className="me-auto">Bootstrap</strong>
                            <small className="text-muted">just now</small>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"
                                    aria-label="Close"></button>
                        </div>
                        <div className="toast-body">
                            See? Just like this.
                        </div>
                    </div>

                    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <img src="..." className="rounded me-2" alt="..."/>
                            <strong className="me-auto">Bootstrap</strong>
                            <small className="text-muted">2 seconds ago</small>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"
                                    aria-label="Close"></button>
                        </div>
                        <div className="toast-body">
                            Heads up, toasts will stack automatically
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
