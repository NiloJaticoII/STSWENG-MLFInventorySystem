// JavaScript source code
import React, { Component } from 'react';

class ArtistCardsList extends Component {
    render() {
        return (
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 p-2 mx-1 w-100">
                <ArtistCard />
            </div>
        );
    }
}

function ArtistCard(props) {
    return (
        <div className="col mb-2 px-2" id="{{artistID}}-card">
            <div className="card mx-0">
                <div className="card-body">
                    <h5>artistName</h5>
                    <p className="card-text"><b>PHP income </b> </p>
                    <a href="#" className="stretched-link" onclick="showArtistModal({{artistID}}, '{{artistName}}')" style={{ size: "0px"}}></a>
                </div>
            </div>
        </div>
    );
}

export default ArtistCardsList;
