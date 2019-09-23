import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import "./JokesList.css"

axios.defaults.headers.get['Accept'] = 'application/json'
const URL = "https://icanhazdadjoke.com/"

class JokesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    }
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  };

  upVote(id) {
    this.setState(state => {
       let jokes = state.jokes.map(joke => {
        if (joke.id === id) {
          let score = joke.score + 1;
          return { ...joke, score };
        }
        return { ...joke };
      });
      return {jokes}
    });
  };

  downVote(id) {
    this.setState(state => {
      let jokes = state.jokes.map(joke => {
       if (joke.id === id) {
         let score = joke.score - 1;
         return { ...joke, score };
       }
       return { ...joke };
     });
     return {jokes}
   });
  }

  async componentDidMount() {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let jokesFill2 = arr.map(() => (axios.get(URL)));
    let responseArray = await Promise.all(jokesFill2);

    let jokesWithScore = responseArray.map(joke => ({ ...joke.data, score: 0 }))

    this.setState({ jokes: [...jokesWithScore] });
  }


  render() {
    let jokes = this.state.jokes.map(joke => (<Joke joke={joke} key={joke.id} id={joke.id} handleUpVote={this.upVote} handleDownVote={this.downVote} />))
    // jokes.unshift(<i className="far fa-grin-beam fa-3x fa-spin"></i>)
    let loadOrJoke = this.state.jokes.length > 0 ? jokes : <i className="far fa-grin-beam fa-8x fa-spin"></i>
    return (
      <div>
        <h1>J<i className="far fa-grin-beam fa-spin"></i>kes List</h1>
        {loadOrJoke}
      </div>
    )
  };
}

export default JokesList;