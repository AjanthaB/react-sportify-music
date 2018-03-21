import React, { Component } from 'react';
import './App.css';

import { FormGroup, FormControl, 
  InputGroup, Glyphicon
} from 'react-bootstrap';
import Profile from './Profile';
import Gallary from './Gallary';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      artist: null,
      tracks: []
    };
  }


  search() {
    
    const BASE_URL = "https://api.spotify.com/v1/search";
    const SEARCH = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    const ALBUMS = 'https://api.spotify.com/v1/artists';
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer BQDbqVuRhRWeWRlQWFbYGGmvtrzOu9dwgW7NlZJf_10BZCK7iARW9QUQHdJhvBTdnqhgTIeoEce4zO0lxLwVOOdlW_XagBwdbLZe_h9pW7b3Eq3Y1KhEyTa5rAOJa3lep3KXRtgD68Wo4enNyPwGbZd5yPo64Ns14BNBWxsLFx8Nj60"
    };
  

    fetch(SEARCH, {
      method: 'GET',
      headers: headers
    })
      .then(res => res.json())
      .then(res => {
        const artist = res.artists.items[0];
        this.setState({artist});
        
        const FETCH_URL = `${ALBUMS}/${artist.id}/top-tracks?country=NL`;
        fetch(FETCH_URL, {
          method: 'GET',
          headers: headers
        })
          .then(res => res.json())
          .then(json => {
            const { tracks } = json;
            this.setState({tracks});
            console.log(tracks);
          })
      }).catch(err => {
        console.log("Error: ", err);
      })
  }

  render() {
    return (
      <div className="App">

        <div>
          <h1>IronNode Music Player</h1>
        </div>
      
        <div>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                className="Search-input"
                placeholder="Search For an Artist"
                onChange={event => this.setState({query: event.target.value})}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.search();
                  }
                }}/>
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>

            </InputGroup>
          </FormGroup>

        </div>
          {
            this.state.artist != null 
              ? <div>
                  <Profile artist={this.state.artist} />
                  <Gallary tracks={this.state.tracks} />
                </div>
              : <div></div>
          }
      </div>
    );
  }
}

export default App;
