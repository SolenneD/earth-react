/********** Imports **********/
import React, { PureComponent } from 'react';
import * as THREE from 'three';

export function CardSat() {
    
    return (
        <div className="card">
            <h2>ISS</h2>
            <img src="textures/iss.jpg" alt="ISS" />
            <div>
                <p>Altitude : <span>408.05526028199</span> km</p>
                <p>Longitude : <span>118.07900427317</span> km</p>
                <p>Latitude : <span>50.11496269845</span> km</p>
            </div>
            {/* <button onClick={this.closePopup}>close me</button> */}
        </div>
    )
}
