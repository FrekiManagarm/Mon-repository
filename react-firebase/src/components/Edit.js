import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        key: "",
        RGB: Boolean,
        alim_inclus: Boolean,
        couleur: "",
        façade_latérale: "",
        format: "",
        nom: "",
        ventilateur: ""
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('Case').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const Case = doc.data();
        this.setState({
          key: doc.id,
          RGB: Case.RGB,
          alim_inclus: Case.alim_inclus,
          couleur: Case.couleur,
          façade_latérale: Case.façade_latérale,
          format: Case.format,
          nom: Case.nom,
          ventilateur: Case.ventilateur
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({Case:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      RGB,
      alim_inclus,
      couleur,
      façade_latérale,
      format,
      nom,
      ventilateur
    }).then((docRef) => {
      this.setState({
        key: "",
        RGB: Boolean,
        alim_inclus: Boolean,
        couleur: "",
        façade_latérale: "",
        format: "",
        nom: "",
        ventilateur: ""
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Case List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="RGB">RGB:</label>
                <select type="Boolean" class="form-control" name="RGB" value={this.state.RGB} onChange={this.onChange} placeholder="RGB">
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select> 
              </div>
              <div class="form-group">
                <label for="alim_inclus">Alim inclus:</label>
                <select type="Boolean" class="form-control" name="alim_inclus" value={this.state.alim_inclus} onChange={this.onChange} placeholder="alim_inclus">
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
              <div class="form-group">
                <label for="façade_latérale">Façade Latérale:</label>
                <select type="text" class="form-control" name="couleur" value={this.state.façade_latérale} onChange={this.onChange} placeholder="façade_latérale">
                  <option value="Plexiglass">Plexiglass</option>
                  <option value="Verre Trempé">Verre Trempé</option>
                  <option value="Null">Null</option>
                </select>
              </div>
              <div class="form-group">
                <label for="couleur">Couleur:</label>
                <select type="text" class="form-control" name="couleur" value={this.state.couleur} onChange={this.onChange} placeholder="couleur">
                  <option value="Noir, Transparent">Noir, Transparent</option>
                  <option value="Noir, Blanc, Transparent">Noir, Blanc, Transparent</option>
                  <option value="Blanc, Transparent">Blanc, Transparent</option>
                  <option value="Rouge, Blanc, Transparent">Rouge, Blanc, Transparent</option>
                  <option value="Noir">Noir</option>
                  <option value="Blanc">Blanc</option>
                </select>
              </div>
              <div class="form-group">
                <label for="format">Format:</label>
                <select type="text" class="form-control" name="format" value={this.state.format} onChange={this.onChange} placeholder="format">
                  <option value="Grand-Tour">Grand-Tour</option>
                  <option value="Moyen-Tour">Moyen-Tour</option>
                  <option value="Mini-Tour">Mini-Tour</option>
                </select>
              </div>
              <div class="form-group">
                <label for="nom">Nom:</label>
                <input type="text" class="form-control" name="nom" value={this.state.nom} onChange={this.onChange} placeholder="nom" cols="50" rows="2"/>
              </div>
              <div class="form-group">
                <label for="ventilateur">Ventilateur:</label>
                <select type="text" class="form-control" name="ventilateur" value={this.state.ventilateur} onChange={this.onChange} placeholder="ventilateur">
                  <option value=""></option>
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

export default Edit;