import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Case: {},
      key: '',
      RGB: Boolean,
      alim_inclus: Boolean,
      couleur: '',
      façade_latérale: '',
      format: '',
      nom: '',
      ventilateur: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('Case').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          Case: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('Case').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Case List</Link></h4>
            <h3 class="panel-title">
              {this.state.Case.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>RGB:</dt>
              <dd>{this.state.Case.RGB}</dd>
              <dt>Alim inclus</dt>
              <dd>{this.state.Case.alim_inclus}</dd>
              <dt>Couleur</dt>
              <dd>{this.state.Case.couleur}</dd>
              <dt>Façade Latérale</dt>
              <dd>{this.state.Case.façade_latérale}</dd>
              <dt>Format</dt>
              <dd>{this.state.Case.format}</dd>
              <dt>Nom</dt>
              <dd>{this.state.Case.nom}</dd>
              <dt>Ventilateur</dt>
              <dd>{this.state.Case.ventilateur}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;