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
    .then(this.componentDidMount) // parses response to JSON
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
              <NoteDetail note={selected} />
            </div>
          </div>
        </div>
    );
  }
}

export default List;
