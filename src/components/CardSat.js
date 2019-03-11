/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';
import satData from '../data/sat.json';

export class CardSat extends PureComponent {
    render() {
        return (
            <div>
                {satData.map((satDetail, index) => {
                    return <div className="card">
                        <h2>{satDetail.satName.toUpperCase()}</h2>
                        <div className="cardImg" >
                            <img src={satDetail.satImg} alt={satDetail.satAlt} />
                        </div>
                        <div>
                            <p>Altitude : <span>{satDetail.alt}</span> km</p>
                            <p>Longitude : <span>{satDetail.long}</span> km</p>
                            <p>Latitude : <span>{satDetail.lat}</span> km</p>
                        </div>
                        <button onClick={this.closePopup}>close me</button>
                    </div>
                })}
            </div>
        )
    }

    closePopup = () => {
        
        ('.card').animate({
            'opacity':0
        },600);
        ('.card').animate({
            'top':-1200
        }, {
            duration: 2300,
            queue: false
        });
    }
}
