import React, {useEffect, useState} from "react";
import axios from "axios";
import { createToast } from "../services/toast";

export function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError();

        // Try login user
        axios.post("//etn-test.herokuapp.com/api/login", { email, password })
            .then((res) => {
                // Get user infos
                axios.get("//etn-test.herokuapp.com/api/accounts/" + res.data.accountId)
                    .then((res) => {
                        setUser(res.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
                if (err.response) {
                    setError(err.response.status);
                }
            })
    }

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
                        <form onSubmit={handleSubmit}>
                            { (error === 403) ? (
                                <div className='alert alert-danger' role='alert'>Email ou mot de passe incorrect</div>
                            ) : null }
                            { (error && error !== 403) ? (
                                <div className='alert alert-warning' role='alert'>Erreur lors de la connexion. [{error}]</div>
                            ) : null }
                            <label htmlFor="email" className="grey-text mt-3">Email</label>
                            <input type="email" id="email" name="email" className="form-control"
                                   onChange={({ target }) => setEmail(target.value)}/>
                            <br />
                            <label htmlFor="password" className="grey-text">Mot de passe</label>
                            <input type="password" id="password" name="password" className="form-control"
                                   onChange={({ target }) => setPassword(target.value)}/>
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
                        <img src="..." className="rounded me-2" alt="..." />
                        <strong className="me-auto">Bootstrap</strong>
                        <small className="text-muted">just now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        See? Just like this.
                    </div>
                </div>

                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <img src="..." className="rounded me-2" alt="..." />
                        <strong className="me-auto">Bootstrap</strong>
                        <small className="text-muted">2 seconds ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        Heads up, toasts will stack automatically
                    </div>
                </div>
            </div>
        </div>
    );
}

