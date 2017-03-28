import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css'
import '../App.css';

class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    const { playing, playingUrl } = this.state
    if(!playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      })
    } else if(playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false
        })
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        })
      }
    }

  render() {
    const { tracks } = this.props;
    const { playingUrl } = this.state;
    return (
      <div className="track-list">
        {
          tracks.map((track, key) => {
            return (
              <div
                key={key}
                className="track"
                onClick={() => this.playAudio(track.preview_url)}
              >
                <div className="play-pause">
                    {
                      playingUrl === track.preview_url
                        ? <span><i className="fa fa-pause" aria-hidden="true"></i></span>
                        : <span><i className="fa fa-play" aria-hidden="true"></i></span>
                    }
                  <p className="track-text">{track.name}</p>
                </div>
              </div>
            )
          }
        )}
      </div>
    )
  }
}

export default Tracks;
