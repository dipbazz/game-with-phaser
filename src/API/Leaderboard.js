let endpoint = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/";
let game_id = "d7o1vpDf6V1JR3ECBtgN"

export default class Leaderboard {
  constructor() {
    this.endpoint = endpoint;
    this.game_id = game_id;
  }

  getScores () {
    const url = `${this.endpoint}games/${this.game_id}/scores/`;
    let response = fetch(
      url,
      { method: 'GET'}
    ).then(response => response.json())
    .then(data => data.result)

    return response;
  }

  setScore(data) {
    const url = `${this.endpoint}games/${this.game_id}/scores/`;
    console.log(data);
    let response = fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    ).then(response => response.json())

    return response;
  }
}
