import Footer from "./FormPage/Footer";
import { Component } from 'react';
import Field from"./FormPage/Field"        // On appelle le composant "Field" qui contient un champ pour une question


class ApplicantForm extends Component 
{
  constructor(props)    // On instancie les "variables"
  {
    super(props)
    this.state=
      {
        children:"",
        nom:"",
        prenom:"",
        email:"",
        passion:"",
        don:"",
        personnalite:"",
        sujet:"",
        attirance:"",
        admiration:"",
        metier:"",
        chouette_entreprise:"",
        accompagnement_mot:"",
        attente_parrain:"",
        reves:"",

      }
  }

  handleChange(event)
  {
    const name = event.target.name
    this.setState(
      {
        [name]: event.target.value        // les valeurs des libellés sont adaptés selon la variable name
      })
  }

  render()
  {
    return <div>
            <div  className="card text-center bg-light mt-5">
                <h1> EMERGENCE - Présentation Individuelle (2020) </h1>  
                
                <p> Pas de bonne ou de mauvaise réponses </p>
                <p> Spontanéïté, Créativité et Sérieux car cela va nous servir pour parler de vous </p>
                <p className="text-danger"> * Obligatoire</p>
            </div>

      <div className="container mt-5">
        <Field name="nom" value={this.state.nom} onChange= {this.handleChange.bind(this)}>  Nom </Field>   
      </div>

      <div className="container mt-5">
        <Field name="prenom" value={this.state.prenom} onChange= {this.handleChange.bind(this)}> Prénom </Field>
      </div>

      <div className="container mt-5">
        <Field name="email" value={this.state.email} onChange= {this.handleChange.bind(this)}> Adresse mail </Field>
      </div>

      <div className="container mt-5">
        <Field name="passion" value={this.state.passion} onChange= {this.handleChange.bind(this)}> Qu'est-ce qui vous passionne ? </Field>
      </div>

      <div className="container mt-5">
        <Field name="don" value={this.state.don} onChange= {this.handleChange.bind(this)}> Quel est votre don, votre force ou particularité ? </Field>
      </div>

      <div className="container mt-5">
        <Field name="personnalite" value={this.state.personnalite} onChange= {this.handleChange.bind(this)}> Que dit-on de vous ? </Field>
      </div>

      <div className="container mt-5">
        <Field name="sujet" value={this.state.sujet} onChange= {this.handleChange.bind(this)}> Un ou plusieurs sujets qui vous tiennent à coeur ? </Field>
      </div>

      <div className="container mt-5">
        <Field name="attirance" value={this.state.attirance} onChange= {this.handleChange.bind(this)}> Qu'est-ce qui vous attire chez les autres ? </Field>
      </div>

      <div className="container mt-5">
        <Field name="admiration" value={this.state.admiration} onChange= {this.handleChange.bind(this)}> Une personne ou personnalité que vous admirez le plus ? Et pourquoi ? </Field>
      </div>

      <div className="container mt-5">
        <Field name="metier" value={this.state.metier} onChange= {this.handleChange.bind(this)}> Avez-vous une idée de ce que vous souhaitez faire professionnellement parlant ? (Secteur d’activité et/ou métier et/ou L'entreprise dans laquelle vous aimeriez travailler…) </Field>
      </div>

      <div className="container mt-5">
        <Field name="chouette_entreprise" value={this.state.chouette_entreprise} onChange= {this.handleChange.bind(this)}> Une « chouette » entreprise pour vous, c’est quoi ? </Field>
      </div>

      <div className="container mt-5">
        <Field name="accompagnement_mot" value={this.state.accompagnement_mot} onChange= {this.handleChange.bind(this)}> Quels mots vous viennent à l’esprit quand vous pensez à votre accompagnement par le programme Emergence ? </Field>
      </div>

      <div className="container mt-5">
        <Field name="attente_parrain" value={this.state.attente_parrain} onChange= {this.handleChange.bind(this)}> Ce que vous attendrez de votre parrain/marraine Emergence ? </Field>
      </div>

      <div className="container mt-5">
        <Field name="reves" value={this.state.reves} onChange= {this.handleChange.bind(this)}> Vos plus grands espoirs même les plus fous ?  </Field>
      </div>

      <div className="container d-grid gap-2 col-3 mx-auto btn-sm mt-5 mb-3">
        <button  className="btn btn-primary" type="submit" value="Envoyer vos réponses"> Envoyer vos réponses <i class="ms-4 fs-4 bi-arrow-right-circle-fill"></i> </button>
      </div>
      
      <div className="text-center mt-3">
        <Footer/>
      </div>
      
    </div>

  }


}
 


export default ApplicantForm