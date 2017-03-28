import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import Search from './components/Search';
import Artist from './components/Artist';
import Tracks from './components/Tracks';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      artist: null,
      tracks: []
    };

    this.search = this.search.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    let FETCH_URL = `${BASE_URL}q=${this.state.searchTerm}&type=artist&limit=1`;

    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({ artist });

    FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US`;
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const { tracks } = json;
      this.setState({ tracks });
      console.log(tracks);
    })
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchTerm });
    this.search();
    event.preventDefault();
  }


  render() {
    const { searchTerm, artist, tracks } = this.state;
    return (
      <div className="App">
        <div className="left">
          <Title />
            <Search
              placeholder="Search for an artist"
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
            >
              Search
            </Search>
        </div>
        <div className="right">
          {
          artist !== null
          ?
            <div>
              <Artist
                artist={artist}
              />
              <Tracks
                tracks={tracks}
              />
            </div>
          : <div></div>
          }
        </div>
      </div>
    );
  }
}

export default App;
