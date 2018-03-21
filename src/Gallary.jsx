import React, { Component } from "react";
import './App.css'

class Gallary extends Component {

	constructor(props) {
		super(props);

		this.state = {
			previewUrl: '',
			audio: null,
			playing: false
		};
	}


	playAudio(previewUrl) {
		if (previewUrl) {
			const audio = new Audio(previewUrl);
			if (this.state.playing) {
				if (this.state.previewUrl === previewUrl) {
					this.state.audio.pause();
					this.setState({
						playing: false
					});
				} else {
					this.state.audio.pause();
					audio.play();
					this.setState({
						playing: true,
						previewUrl,
						audio
					});
				}
			} else {
				audio.play();
				this.setState({
					playing: true,
					audio,
					previewUrl
				});
			}
		} else {
			alert("Track Does not exist");
		}
		
	}

	render() {

		const  { tracks } = this.props;

		return (
			<div className="gallary">

				{
					tracks.map((track, k) => {
						const trackImg = track.album.images[0].url;

						return (
							<div 
								key={k}
								onClick={() => this.playAudio(track.preview_url)}
								className="track">
								<img alt="track"
									src={trackImg}
									className="track-img" />

								<div className="track-name"> {track.name} </div>
							</div>
						)
					})

				}
			</div>
		)
	}

}

export default Gallary;