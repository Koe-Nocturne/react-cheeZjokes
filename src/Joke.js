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
    //separates joke from punchline
    let joke = this.props.joke.joke;
    let jokeText = "";
    let punchline = "";
    if(joke.includes(".") && (joke.indexOf(".") < joke.length-2)) {
      console.log(joke.length);
      jokeText = joke.slice(0, joke.indexOf(".")+1);
      punchline = joke.slice(joke.indexOf(".")+1);
    } else if (joke.includes("?")) {
      jokeText = joke.slice(0, joke.indexOf("?")+1);
      punchline = joke.slice(joke.indexOf("?")+1);
    } else {
      jokeText = joke;
    }

    return (
      <div className="card mx-5" style={{backgroundColor: "white"}}>
        <p className="card-body">{jokeText} <br></br> {punchline}
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