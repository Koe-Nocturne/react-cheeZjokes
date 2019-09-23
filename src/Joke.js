import React from 'react';

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
      <div className="card">
        <p className="card-body">{this.props.joke.joke}
          <button onClick={this.handleUpVote}> <i className="fas fa-thumbs-up"></i></button>
          <button onClick={this.handleDownVote}><i className="fas fa-thumbs-down"></i></button>
        </p>
        Score: {this.props.joke.score}
      </div>
    )
  }

};

export default Joke;