import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';


class NoteDetail extends React.Component {

  constructor(props) {
        super(props);
        this.state = {  id: props.note.id,
                        title: props.note.title,
                        description: props.note.description,
                        tags: props.note.tags
                      };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);

  }

  updateState(e) {
    this.setState({
         description: e.target.value
        }, () => this.APICallFunction());
  }

  APICallFunction(){
    var url = "/api/notes/"+this.state.id.$oid;
    this.postData(url, this.state)
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
      method: 'PUT',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then(response => response.json()) // parses response to JSON
  }

  handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        }, () => this.APICallFunction());
  }

  handleAddition(tag) {
      const { tags } = this.state;
      tags.push(tag);
      this.setState({
       tags: tags,
      }, () => this.APICallFunction());
  }

  handleDrag(tag, currPos, newPos) {
      const tags = [...this.state.tags];
      const newTags = tags.slice();
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);
      this.setState({ tags: newTags }, () => this.APICallFunction());
  }

  handleChange(event) {
    this.setState({description: event.target.value});
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value}, () => this.APICallFunction());
  }


  render(){
    if (this.props.note.id != this.state.id){
        this.setState({title: this.props.note.title, tags: this.props.note.tags, description: this.props.note.description, id : this.props.note.id}); //update data from parent if they are different
      }
    const { title, description, tags } = this.state;
    return(
      <div>
        <input type='text' value={title} onChange={this.handleChangeTitle.bind(this)} />
        <textarea rows="10" cols="130" value={description} onChange={this.handleChange.bind(this)} onBlur={this.updateState.bind(this)}></textarea>
         <ReactTags tags={tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag} />
      </div>

    );
  }
}

export default NoteDetail;
