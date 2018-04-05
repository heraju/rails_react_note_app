import React from 'react';
import { Route } from 'react-router-dom';
import Note from './note'


class List extends React.Component {
  render(){
    let notes = [];
      for(let i= 0 ;i< 20; i++){
        notes.push({
          id: i,
          title: 'Note '+i,
          description: 'blansjnsjhn nchhdsn hndsjhn nsajhndhjnads nsajknjdsknsa  kjls xksd ns sn sa kj sksjndjksnkas',
          tags: ['Javascript','ReactJS','HTML5','CSS3']
        })
      }
    return(
      <div className="container-fluid">
          <div className="row">
            <div className="card-list-wrapper col-md-3">
              <ul>
                {notes.map(note => (
                  <li key={note.id}>
                    <Note {...note} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default List;
