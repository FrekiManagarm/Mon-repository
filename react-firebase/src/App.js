import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('Case');
    this.unsubscribe = null;
    this.state = {
      Case: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const Case = [];
    querySnapshot.forEach((doc) => {
      const { RGB, alim, couleur, façade, format, nom, ventilateur } = doc.data();
      Case.push({
        key: doc.id,
        doc, 
        RGB,
        alim,
        couleur,
        façade,
        format,
        nom,
        ventilateur
      });
    });
    this.setState({
      Case
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              CASE LIST
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="./components/Create.js">Add Board</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>RGB</th>
                  <th>Alim inclus</th>
                  <th>Couleur</th>
                  <th>Façade Latérale</th>
                  <th>Format</th>
                  <th>Ventilateur</th>
                  <th>key</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Case.map(Case =>
                  <tr>
                    <td><Link to={`./components/Show.js/${Case.key}`}>{Case.nom}</Link></td>
                    <td>{Case.RGB}</td>
                    <td>{Case.alim}</td>
                    <td>{Case.couleur}</td>
                    <td>{Case.façade}</td>
                    <td>{Case.format}</td>
                    <td>{Case.ventilateur}</td>
                    <td>{Case.key}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;