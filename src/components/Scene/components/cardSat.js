import React, { PureComponent } from 'react'
import * as THREE from 'three'
import mock from '../../mock/mock.json'

export class CardSat extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { open: true, isCardOpen: false, selectedSatData: {} }
  }

  render() {
    const { isCardOpen, selectedSatData } = this.state
    return (
      <div>
        {isCardOpen ? (
          <div className="card">
            <h2>{selectedSatData.satName.toUpperCase()}</h2>
            <div className="cardImg">
              <img src={selectedSatData.satImg} alt={selectedSatData.satAlt} />
            </div>
            <div>
              <p>
                {'Altitude :'}
                <span>{selectedSatData.alt}</span>
                {'km'}
              </p>
              <p>
                {'Longitude :'}
                <span>{selectedSatData.long}</span>
                {'° W'}
              </p>
              <p>
                {'Latitude :'}
                <span>{selectedSatData.lat}</span>
                {'° S'}
              </p>
            </div>
            <button type="button" onClick={() => this.showCard()}>
              Fermer
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}