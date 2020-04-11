import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        key: "",
        RGB: "",
        alim_inclus: "",
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
          alim: Case.alim,
          couleur: Case.couleur,
          façade: Case.façade,
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

    const { RGB, alim, couleur, façade, format, nom, ventilateur } = this.state;

    const updateRef = firebase.firestore().collection('Case').doc(this.state.key);
    updateRef.set({
      RGB,
      alim,
      couleur,
      façade,
      format,
      nom,
      ventilateur
    }).then((docRef) => {
      this.setState({
        key: "",
        RGB: "",
        alim: "",
        couleur: "",
        façade: "",
        format: "",
        nom: "",
        ventilateur: ""
      });
      this.props.history.push("./Show.js/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Case List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="RGB">RGB:</label>
                <input type="Boolean" className="form-control" name="RGB" onChange={this.onChange} placeholder="RGB"/>
              </div>
              <div className="form-group">
                <label for="alim">Alim inclus:</label>
                <input type="Boolean" className="form-control" name="alim" onChange={this.onChange} placeholder="alim"/>
              </div>
              <div className="form-group">
                <label for="façade_latérale">Façade Latérale:</label>
                <input type="text" className="form-control" name="couleur" onChange={this.onChange} placeholder="façade_latérale"/>
              </div>
              <div className="form-group">
                <label for="couleur">Couleur:</label>
                <input type="text" className="form-control" name="couleur" onChange={this.onChange} placeholder="couleur"/>
              </div>
              <div className="form-group">
                <label for="format">Format:</label>
                <input type="text" className="form-control" name="format" onChange={this.onChange} placeholder="format"/>
              </div>
              <div className="form-group">
                <label for="nom">Nom:</label>
                <input type="text" className="form-control" name="nom" onChange={this.onChange} placeholder="nom" cols="50" rows="2"/>
              </div>
              <div className="form-group">
                <label for="ventilateur">Ventilateur:</label>
                <input type="text" className="form-control" name="ventilateur" onChange={this.onChange} placeholder="ventilateur" cols="50" rows="2"/>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;