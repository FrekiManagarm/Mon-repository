import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Case: {},
      key: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('Case').doc(this.props.match.params);
    console.log(this.props.params.id);
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
              <dt>Nom</dt>
              <dd>{this.state.Case.nom}</dd>
              <dt>RGB:</dt>
              <dd>{this.state.Case.RGB}</dd>
              <dt>Alim inclus</dt>
              <dd>{this.state.Case.alim}</dd>
              <dt>Couleur</dt>
              <dd>{this.state.Case.couleur}</dd>
              <dt>Façade Latérale</dt>
              <dd>{this.state.Case.façade}</dd>
              <dt>Format</dt>
              <dd>{this.state.Case.format}</dd>
              
              <dt>Ventilateur</dt>
              <dd>{this.state.Case.ventilateur}</dd>
            </dl>
            <button><Link to={`./Edit.js/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;</button>
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;