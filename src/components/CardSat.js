// /********** Imports **********/
// import React, { PureComponent } from 'react';
// import * as THREE from 'three';
// import satData from '../data/sat.json';

// export class CardSat extends PureComponent {

//     constructor(props) {
//         super(props)
//         this.state = { open: true }
//         this.openModal = this.openModal.bind(this)
//         this.closeModal = this.closeModal.bind(this)
    
//       }
//       openModal (){
//         this.setState({ open: false })
//       }
//       closeModal () {
//         this.setState({ open: true })
//       }



//     render() {
//         return (
//             <div>
//                 {satData.map((satDetail, index) => {
//                     return <div key={index} className="card">
//                         <h2>{satDetail.satName.toUpperCase()}</h2>
//                         <div className="cardImg" >
//                             <img src={satDetail.satImg} alt={satDetail.satAlt} />
//                         </div>
//                         <div>
//                             <p>Altitude : <span>{satDetail.alt}</span> km</p>
//                             <p>Longitude : <span>{satDetail.long}</span> km</p>
//                             <p>Latitude : <span>{satDetail.lat}</span> km</p>
//                         </div>
//                         <button onClick={this.closeModal}>Fermer</button>
//                     </div>
//                 })}
//             </div>
//         )
//     }
// }