import React, { Component } from "react"

export class Footer extends Component
{
    render()
    {
        return (
            <div className="nav justify-content-center mb-4 mt-3">
                <a className="nav-link active" href="/about"> A propos </a>
                <a className="nav-link active" href="/more"> En savoir plus </a>
            </div>
        );
    }
}
