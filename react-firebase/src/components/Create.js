import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection("Case");
    this.state = {
        RGB: Boolean,
        alim_inclus: Boolean,
        couleur: "",
        façade_latérale: "",
        format: "",
        nom: "",
        ventilateur: ""
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { RGB, alim_inclus, couleur, façade_latérale, format, nom, ventilateur } = this.state;

    this.ref.add({
      RGB,
      alim_inclus,
      couleur,
      façade_latérale,
      format,
      nom,
      ventilateur
    }).then((docRef) => {
      this.setState({
        RGB: Boolean,
        alim_inclus: Boolean,
        couleur: '',
        façade_latérale: '',
        format: '',
        nom: '',
        ventilateur: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { RGB, alim_inclus, couleur, façade_latérale, format, nom, ventilateur } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Ajouter un composant
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Liste des composants</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">RGB</label>
                <input type="text" class="form-control" name="Case" value={RGB} onChange={this.onChange} placeholder="RGB" />
              </div>
              <div class="form-group">
                <label for="alim_inclus">Alim inclus</label>
                <select type="text" class="form-control" name="alim_inclus" onChange={this.onChange} placeholder="alim_inclus" cols="80" rows="3">{alim_inclus}
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
              </div>
              <div class="form-group">
                <label for="couleur">Couleur</label>
                <input type="text" class="form-control" name="couleur" value={couleur} onChange={this.onChange} placeholder="couleur">{couleur}</input>
              </div>
              <div class="form-group">
                <label for="façade_latérale">Façade Latérale</label>
                <select class="form-control" name="façade_latérale" onChange={this.onChange} placeholder="façade_latérale" cols="80" rows="3">{façade_latérale}
                    <option value="Plexiglass">Plexiglass</option>
                    <option value="Verre trempé">Verre trempé</option>
                </select>
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;