import React from 'react';
import { Route } from 'react-router-dom';
import NoteDetail from './note_detail'
import $ from 'jquery';

const divStyle = {
  backgroundColor: '#bbd8e9',

};

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      selected: null
    };
  }

  componentDidMount() {
    fetch('/api/notes')
      .then(response => response.json())
      .then(data => this.setState({ notes: data, selected: data[0] }));
  }

  updateMeDelete() {
    fetch('/api/notes')
      .then(response => response.json())
      .then(data => this.setState({ notes: data, selected: data[0] }));
  }

  updateMe() {
    fetch('/api/notes')
      .then(response => response.json())
      .then(data => {this.setState({ notes: data})});
  }

  render() {
    const { notes } = this.state
    return notes.length ? this.renderList() : (
      <div>
      <a onClick={this.newNote.bind(this)} className='btn'>New Note</a>
      <span>Loading notes...</span>
      </div>
    )
  }

  showNote(id){
    var note = this.state.notes.find(function(element) {
      return element.id == id;
    });
    this.setState({ selected: note });
  }

  checkNote(){
    const { notes, selected } = this.state;
    if(notes == undefined)
      return;
    var note = notes.find(function(element) {
      return element.id == selected.id;
    });
    debugger;

    if(note == undefined){this.setState({ selected: notes[0] });}

  }
  postData(url, data) {
    return fetch(url, {
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then(response => response.json())
    .then(data => this.setState({ notes: data, selected: data[(data.length-1)] }));
  }

  newNote(){
    this.postData("/api/notes/", {title: 'new note'})
  }

  renderList(){
    const { notes, selected } = this.state;
    return(
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2" style={divStyle}>
            <a onClick={this.newNote.bind(this)} className='btn'>New Note</a>
              <ul className="nav nav-list">
                {notes.map(note => (
                  <li>
                    <a onClick={() => this.showNote(note.id)} >{note.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-10">
              <NoteDetail note={selected} onUpdate={this.updateMe.bind(this)} onDelete={this.updateMeDelete.bind(this)}/>
            </div>
          </div>
        </div>
    );
  }
}

export default List;
