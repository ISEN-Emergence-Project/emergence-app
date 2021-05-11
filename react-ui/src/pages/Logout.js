/**
 * LOGOUT PAGE
 * Logout user and redirect him to login page
 */

import React, {useEffect} from "react";
import {Redirect} from 'react-router-dom';

export function Logout({ setToken }) {
    useEffect(() => {
        setToken("");
    });

    return <Redirect to="/login" />
}
