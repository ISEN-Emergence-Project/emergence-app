import React, { Component, useState } from "react"
import {Popup} from"../components/Popup"

export function ManageAccounts()

{
    const [user, displayUser] = useState([])

        return <div>
            <Popup user = {user} displayUser={displayUser}/>
            {user}
        </div>
}
