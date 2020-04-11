import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection("Case");
    this.state = {
        RGB: "",
        alim_inclus: "",
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
        RGB: "",
        alim: "",
        couleur: '',
        façade: '',
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
    const { RGB, alim, couleur, façade, format, nom, ventilateur } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Ajouter un composant
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" class="btn btn-primary">Liste des composants</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="RGB">RGB</label>
                <input type="Boolean" className="form-control" name="RGB" onChange={this.onChange} placeholder="RGB">{RGB}</input>
              </div>
              <div className="form-group">
                <label for="alim">Alim inclus</label>
                <input type="Boolean" className="form-control" name="alim" onChange={this.onChange} placeholder="alim" cols="50" rows="2">{alim}</input>
              </div>
              <div className="form-group">
                <label for="couleur">Couleur</label>
                <input type="text" className="form-control" name="couleur" onChange={this.onChange} placeholder="couleur" cols="50" rows="2">{couleur}</input>
              </div>
              <div className="form-group">
                <label for="façade">Façade Latérale</label>
                <input type="text" className="form-control" name="façade" onChange={this.onChange} placeholder="façade" cols="50" rows="2">{façade}</input>
              </div>
              <div className="form-group">
                <label for="format">Format</label>
                <input type="text" className="form-control" name="format" onChange={this.onChange} placeholder="format" cols="50" rows="2">{format}</input>
              </div>
              <div className="form-group">
                <label for="nom">Nom:</label>
                <input type="text" className="form-control" name="nom" onChange={this.onChange} placeholder="nom" cols="50" rows="2">{nom}</input>
              </div>
              <div className="form-group">
                <label for="ventilateur">Ventilateur:</label>
                <input type="text" className="form-control" name="ventilateur" onChange={this.onChange} placeholder="ventilateur" cols="50" rows="2">{ventilateur}</input>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;