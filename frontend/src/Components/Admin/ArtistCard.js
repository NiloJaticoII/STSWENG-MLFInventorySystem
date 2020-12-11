import React, {Component} from 'react';

class ArtistCard extends Component {
    /*
    */
    render(){
        return(
            <div>
                <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 p-2 mx-1 w-100">
                        
                        <div class="col mb-2 px-2"  id="{{artistID}}-card">
                            <div class="card mx-0">
                                <div class="card-body">
                                    <h5>Artist Name</h5>
                                    <p class="card-text"><b> Income PHP </b> </p>
                                    <a href="#" class="stretched-link" onclick="showArtistModal({{artistID}}, '{{artistName}}')" style="size: 0px;"></a>
                                </div>
                            </div>
                        </div>
                </div>
                
                <div class="modal fade" id="artistModal" tabindex="-1" role="dialog" aria-labelledby="artist sales" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="artistModalTitle"></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table class="table table-bordered">
                                    <thead class="thead bg-secondary text-light">
                                        <tr>
                                            <th scope="col">Item/Bundle</th>
                                            <th scope="col">Stocks</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity sold</th>
                                        </tr>
                                    </thead>
                                    <tbody id="artistSales" >
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArtistCard;