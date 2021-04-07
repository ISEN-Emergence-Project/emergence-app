import { Component, useState } from "react"
import Popup from"./Popup"

function ManageAccounts()

{
    const [user, displayUser] = useState([])

        return <div>
            <Popup user = {user} displayUser={displayUser}/>
            {user}
        </div>
}

export default ManageAccounts