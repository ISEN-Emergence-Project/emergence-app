import React, { Component } from "react"

class Header extends Component
{
    constructor()
    {
        super()
        this.state=
        {
            headerClicked:false
        }
    }


    handleHeaderClick()
    {
        const title = prompt("Modifier le titre")                   // permet de modifier l'en-tête
        const subtitle = prompt("Modifier l'introduction")
        this.setState(
            {
                title:title,
                subtitle:subtitle,
                headerClicked:true
            })
    }

    
   
    render()
    {
        
        return <div>

        <div className="card text-center bg-light mt-5">
        {
            this.state.headerClicked? 
            <div>
                <h1> {this.state.title} </h1>
                <p> {this.state.subtitle} </p>
                <p className="text-danger"> * Obligatoire</p>
            </div>:
            
            <div>
                <h1> EMERGENCE - Présentation Individuelle (2020) </h1>  
                
                <p> Pas de bonne ou de mauvaise réponses </p>
                <p> Spontanéïté, Créativité et Sérieux car cela va nous servir pour parler de vous </p>
                <p className="text-danger"> * Obligatoire</p>
            </div>
        }
        </div>
        <button  className="btn btn-warning btn-sm" onClick={this.handleHeaderClick.bind(this)}><i className="me-2 bi-pencil-fill"></i> Modifier </button> {/* la balise <i> permet d'insérer des icônes */}
        </div>
    }
}

export default Header
