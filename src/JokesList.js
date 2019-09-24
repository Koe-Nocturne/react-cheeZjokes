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
        return joke;
      });
      return { jokes }
    });
  };

  downVote(id) {
    this.setState(state => {
      let jokes = state.jokes.map(joke => {
        if (joke.id === id) {
          let score = joke.score - 1;
          return { ...joke, score };
        }
        return joke;
      });
      return { jokes }
    });
  }

  async componentDidMount() {
    //array.from or fill ({length: 10})
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let jokesFill2 = arr.map(() => (axios.get(URL)));
    let responseArray = await Promise.all(jokesFill2);

    //current logic does not account for the replacement to possibly
    //be a duplicate, options could include a while loop in the else statement
    //while(id.includes(response.data.id){
    // let response = await axios.get(URL);
    //})
    let id = [];
    for (let i = 0; i < responseArray.length; i++) {
      if (!id.includes(responseArray[i].data.id)) {
        id.push(responseArray[i].data.id);
      } else {
        let response = await axios.get(URL);
        responseArray.splice(i, 1);
        responseArray.unshift(response);
      }
    }

    let jokesWithScore = responseArray.map(joke => ({ ...joke.data, score: 0 }))

    this.setState({ jokes: [...jokesWithScore] });
  }

  render() {
    let jokes = this.state.jokes.map(joke => (
      <Joke
        joke={joke}
        key={joke.id}
        id={joke.id}
        handleUpVote={this.upVote}
        handleDownVote={this.downVote}
      />));
    let loadOrJoke = this.state.jokes.length > 0 ? jokes : <i className="far fa-grin-beam fa-8x fa-spin"></i>
    return (
      <div>
        <h1>DAD J<i className="far fa-grin-beam fa-spin"></i>KES!</h1>
        <div className="jokes-list">
          {loadOrJoke}
        </div>
      </div>
    )
  };
}

export default JokesList;