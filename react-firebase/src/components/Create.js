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
                <label for="RGB">RGB</label>
                <select type="Boolean" class="form-control" name="RGB" value={RGB} onChange={this.onChange} placeholder="RGB">{RGB}
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
              <div class="form-group">
                <label for="alim_inclus">Alim inclus</label>
                <select type="Boolean" class="form-control" name="alim_inclus" onChange={this.onChange} placeholder="alim_inclus" cols="50" rows="2">{alim_inclus}
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
              </div>
              <div class="form-group">
                <label for="couleur">Couleur</label>
                <select type="text" class="form-control" name="couleur" value={couleur} onChange={this.onChange} placeholder="couleur" cols="50" rows="2">{couleur}
                  <option value="Noir, Transparent">Noir, Transparent</option>
                  <option value="Noir, Blanc, Transparent">Noir, Blanc, Transparent</option>
                  <option value="Blanc, Transparent">Blanc, Transparent</option>
                  <option value="Rouge, Blanc, Transparent">Rouge, Blanc, Transparent</option>
                  <option value="Noir">Noir</option>
                  <option value="Blanc">Blanc</option>
                </select>
              </div>
              <div class="form-group">
                <label for="façade_latérale">Façade Latérale</label>
                <select type="text" class="form-control" name="façade_latérale" onChange={this.onChange} placeholder="façade_latérale" cols="50" rows="2">{façade_latérale}
                    <option value="Plexiglass">Plexiglass</option>
                    <option value="Verre trempé">Verre trempé</option>
                    <option value="Null">Null</option>
                </select>
              </div>
              <div class="form-group">
                <label for="format">Format</label>
                <select type="text" class="form-control" name="format" onChange={this.onChange} placeholder="format" cols="50" rows="2">{format}
                  <option value="Grand-Tour">Grand-Tour</option>
                  <option value="Moyen-Tour">Moyen-Tour</option>
                  <option value="Mini-Tour">Mini-Tour</option>
                </select>
              </div>
              <div class="form-group">
                <label for="nom">Nom:</label>
                <input type="text" class="form-control" name="nom" onChange={this.onChange} placeholder="nom" cols="50" rows="2">{nom}</input>
              </div>
              <div class="form-group">
                <label for="ventilateur">Ventilateur:</label>
                <select type="text" class="form-control" name="ventilateur" onChange={this.onChange} placeholder="ventilateur" cols="50" rows="2">{ventilateur}
                  <option value="x2 normal">x2 normal</option>
                  <option value="x3 RGB">x3 RGB</option>
                  <option value="x3 normal">x3 normal</option>
                  <option value="x2 RGB">x2 RGB</option>
                  <option value="x4 normal">x4 normal</option>
                  <option value="x4 RGB">x4 RGB</option>
                  <option value="x1 RGB">x1 RGB</option>
                  <option value="x1 normal">x1 normal</option>
                </select>
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