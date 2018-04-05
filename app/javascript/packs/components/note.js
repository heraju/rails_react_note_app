import React from 'react';
import { Route } from 'react-router-dom';



class Note extends React.Component {
  render(){
    let title = this.props.title;
    let description = this.props.description;
    let tags = this.props.tags;
    return(
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        {tags.map(tag => (
          <li>{tag}</li>
        ))}
      </div>
    );
  }
}

export default Note;
