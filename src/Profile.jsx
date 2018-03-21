import React, { Component } from "react";
import './App.css'

class Profile extends Component {
  
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let artist = { name: '', followers: {total: ''}, images: [{url: ''}], genres: []};

    if (this.props.artist != null) {
      artist = this.props.artist;
    }

    return (
      <div className="profile">
        <img
          alt="Profile image"
          className="profile-img"
          src={artist.images[0].url}
        />

        <div className="profile-info"> 
          <div className="profile-name">{artist.name} </div>
          <div className="profile-followers">
            Followers : {artist.followers.total} 
          </div>
          <div className="profile-genres">
            {
              artist.genres.map((item, k) => {
                let genre = (k === artist.genres.length - 1) 
                              ? `& ${item}` 
                              : `${item}, `;
                return (
                  <span key={k}> {genre} </span>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;