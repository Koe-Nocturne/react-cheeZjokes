import React from 'react';
import './Joke.css'

class Joke extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleDownVote = this.handleDownVote.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
  }

  handleDownVote() {
    this.props.handleDownVote(this.props.id)
  };

  handleUpVote() {
    this.props.handleUpVote(this.props.id)
  }

  render() {
    return (
      <div className="card mx-5" style={{backgroundColor: "white"}}>
        <p className="card-body">{this.props.joke.joke}
        </p>
        <span>
          <button onClick={this.handleUpVote} className="button">
            <i className="fas fa-thumbs-up"></i>
          </button>
          <button onClick={this.handleDownVote} className="button">
            <i className="fas fa-thumbs-down"></i>
          </button></span>
        Score: {this.props.joke.score}
      </div>
    );
  }
};

export default Joke;