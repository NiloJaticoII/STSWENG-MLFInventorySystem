// JavaScript source code
import React, { Component } from 'react';
class ArtistCardsList extends Component {
    constructor(){
        super();
        this.state ={
            artist: []
        }
    }
    
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.artist !== prevProps.artist) {
          this.setState({artist: this.props.artist})
        }
      }

    render() {
        const artistCards = this.state.artist.map(artist => <ArtistCard   key={artist.artistID}
                                                                          artistName={artist.artistName}
                                                                          income={artist.income} />)
        return (
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 p-2 mx-1 w-100">
                {artistCards}
            </div>
        );
    }
}

function ArtistCard(props) {
    return (
        <div className="col mb-2 px-2" id="{{artistID}}-card">
            <div className="card mx-0">
                <div className="card-body">
                    <h5>{props.artistName}</h5>
                    <p className="card-text"><b>PHP {props.income} </b> </p>
                    <a href="#" className="stretched-link" onClick={console.log("hello")/*"showArtistModal({{artistID}}, '{{artistName}}')"*/} style={{ size: "0px"}}></a>
                </div>
            </div>
        </div>
    );
}

export default ArtistCardsList;
